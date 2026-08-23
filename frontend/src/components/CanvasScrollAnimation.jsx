import { useEffect, useRef } from 'react';

/**
 * CanvasScrollAnimation — Optimized for production CDN delivery.
 *
 * Key perf decisions:
 * - No easing: jumps directly to the target frame on each scroll tick.
 *   Easing felt smooth locally but caused lag on CDN because the canvas
 *   kept animating toward a frame that hadn't loaded yet.
 * - rAF-throttled scroll handler: scroll fires up to 1000×/sec on some
 *   browsers; we gate it to one draw per animation frame.
 * - Aggressive priority queue: on every scroll the ±30 nearest frames
 *   are front-loaded into the queue so the user always sees the right
 *   frame within a frame or two.
 * - Higher concurrency (16): Vercel CDN supports many parallel requests;
 *   more concurrency = faster initial fill.
 * - DPR capped at 1.5: a 2× canvas on a 4K screen doubles memory and
 *   draw time for no visible benefit on compressed JPEGs.
 * - OffscreenCanvas decode: createImageBitmap decodes on a worker thread,
 *   never blocking the main thread.
 * - willChange: 'transform' on the canvas element promotes it to its own
 *   compositor layer so repaints don't trigger layout.
 */

const CONCURRENCY = 16;   // parallel fetches
const DPR_CAP = 1.5;      // cap device pixel ratio

export default function CanvasScrollAnimation({
  frameCount = 250,
  framePrefix = '/frames/ezgif-frame-',
  scrollRangeVh = 550,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // alpha:false = no compositing, desynchronized = don't wait for vsync
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    // ── State ──────────────────────────────────────────────────────
    const bitmaps   = new Array(frameCount).fill(null);
    const loadState = new Array(frameCount).fill('idle'); // idle | loading | done
    let currentRenderedFrame = -1;
    let canvasW = 0, canvasH = 0;

    // rAF-based scroll gating
    let pendingScroll = false;
    let targetFrame   = 0;
    let rafId         = null;

    // ── Canvas resize ──────────────────────────────────────────────
    let resizeTimer = null;
    const applyResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvasW = Math.round(w * dpr);
      canvasH = Math.round(h * dpr);
      canvas.width  = canvasW;
      canvas.height = canvasH;
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      ctx.imageSmoothingEnabled  = true;
      ctx.imageSmoothingQuality  = 'medium';
      if (currentRenderedFrame >= 0) drawFrame(currentRenderedFrame);
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyResize, 120);
    };

    // ── Draw a frame (cover-fit, nearest-neighbour fallback) ────────
    const drawFrame = (idx) => {
      // Walk outward to find the nearest loaded frame
      if (bitmaps[idx]) {
        _blit(bitmaps[idx]);
        currentRenderedFrame = idx;
        return;
      }
      for (let off = 1; off < frameCount; off++) {
        const lo = idx - off, hi = idx + off;
        if (lo >= 0        && bitmaps[lo]) { _blit(bitmaps[lo]); currentRenderedFrame = lo; return; }
        if (hi < frameCount && bitmaps[hi]) { _blit(bitmaps[hi]); currentRenderedFrame = hi; return; }
      }
    };

    const _blit = (bmp) => {
      const scale = Math.max(canvasW / bmp.width, canvasH / bmp.height);
      const rw = bmp.width  * scale;
      const rh = bmp.height * scale;
      ctx.drawImage(bmp, (canvasW - rw) / 2, (canvasH - rh) / 2, rw, rh);
    };

    // ── rAF tick — only runs when there's a pending scroll event ───
    const tick = () => {
      rafId = null;
      if (!pendingScroll) return;
      pendingScroll = false;

      // Jump directly to target — no easing, no lag
      drawFrame(targetFrame);

      // Re-prioritize the load queue around the new position
      prioritize(targetFrame);
    };

    // ── Scroll handler — compute target frame, schedule one rAF ───
    const onScroll = () => {
      const rangePx = (scrollRangeVh / 100) * window.innerHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / rangePx));
      targetFrame = Math.min(frameCount - 1, Math.max(0, Math.round(progress * (frameCount - 1))));
      pendingScroll = true;
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    // ── Priority loader ────────────────────────────────────────────
    let activeLoads = 0;
    const queue = [];

    const loadOne = (idx) => {
      if (loadState[idx] !== 'idle') return;
      loadState[idx] = 'loading';
      activeLoads++;
      const num = String(idx + 1).padStart(3, '0');
      fetch(`${framePrefix}${num}.jpg`, { priority: 'auto' })
        .then(r => r.blob())
        .then(blob => createImageBitmap(blob, {
          premultiplyAlpha: 'none',
          colorSpaceConversion: 'none',
        }))
        .then(bmp => {
          bitmaps[idx]   = bmp;
          loadState[idx] = 'done';
          activeLoads--;
          // If this is the frame the user is currently on, draw it
          if (idx === targetFrame && idx !== currentRenderedFrame) {
            drawFrame(idx);
          }
          drainQueue();
        })
        .catch(() => {
          loadState[idx] = 'idle'; // allow retry
          activeLoads--;
          drainQueue();
        });
    };

    const drainQueue = () => {
      while (activeLoads < CONCURRENCY && queue.length > 0) {
        loadOne(queue.shift());
      }
    };

    /** Push indices to the front (urgent) or back of the queue */
    const enqueue = (indices, urgent = false) => {
      for (const i of indices) {
        if (i >= 0 && i < frameCount && loadState[i] === 'idle') {
          if (urgent) queue.unshift(i);
          else        queue.push(i);
        }
      }
      drainQueue();
    };

    /** Front-load ±30 frames around `center`, then fill the rest */
    const prioritize = (center) => {
      const near = [];
      for (let r = 1; r <= 30; r++) {
        if (center + r < frameCount) near.push(center + r);
        if (center - r >= 0)         near.push(center - r);
      }
      enqueue(near, true /* urgent */);
    };

    /** Background fill: all remaining frames in order */
    const fillAll = () => {
      const rest = [];
      for (let i = 1; i < frameCount; i++) rest.push(i);
      enqueue(rest, false);
    };

    // ── Bootstrap: load frame 0 synchronously, then fill ──────────
    const boot = () => {
      loadState[0] = 'loading';
      activeLoads++;
      const num = String(1).padStart(3, '0');
      fetch(`${framePrefix}${num}.jpg`)
        .then(r => r.blob())
        .then(blob => createImageBitmap(blob, {
          premultiplyAlpha: 'none',
          colorSpaceConversion: 'none',
        }))
        .then(bmp => {
          bitmaps[0]   = bmp;
          loadState[0] = 'done';
          activeLoads--;
          applyResize();    // set canvas size now that we know image dimensions
          drawFrame(0);
          fillAll();        // kick off background loading
        })
        .catch(() => {
          loadState[0] = 'idle';
          activeLoads--;
          fillAll();
        });
    };

    // ── Init ───────────────────────────────────────────────────────
    applyResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize,  { passive: true });
    boot();
    onScroll(); // compute initial frame immediately

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      if (rafId) cancelAnimationFrame(rafId);
      bitmaps.forEach(bmp => bmp?.close?.());
    };
  }, [frameCount, framePrefix, scrollRangeVh]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
        pointerEvents: 'none',
        zIndex: 0,
        // Promote to GPU compositor layer — repaints don't trigger layout
        willChange: 'transform',
        // Disable browser's image smoothing on the element itself
        imageRendering: 'auto',
      }}
    />
  );
}
