import { useEffect, useRef } from 'react';

const CONCURRENCY = 8;
const EASE = 0.12;
const STOP_THRESHOLD = 0.0002;

export default function CanvasScrollAnimation({
  frameCount = 250,
  framePrefix = '/frames/ezgif-frame-',
  scrollRangeVh = 550, // animation completes after this many vh of scroll
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    const bitmaps = new Array(frameCount).fill(null);
    const loadState = new Array(frameCount).fill('idle');

    let targetProgress = 0;
    let currentProgress = 0;
    let currentRenderedFrame = -1;
    let rafId = null;
    let isRunning = false;
    let resizeTimer = null;
    let canvasW = 0, canvasH = 0;

    // ── Resize ────────────────────────────────────────────────
    const applyResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvasW = Math.round(w * dpr);
      canvasH = Math.round(h * dpr);
      canvas.width = canvasW;
      canvas.height = canvasH;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
      if (currentRenderedFrame >= 0) drawBestFrame(currentRenderedFrame);
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyResize, 100);
    };

    // ── Draw Frame ────────────────────────────────────────────
    const drawBestFrame = (index) => {
      if (bitmaps[index]) {
        const bmp = bitmaps[index];
        const scale = Math.max(canvasW / bmp.width, canvasH / bmp.height);
        const rw = bmp.width * scale;
        const rh = bmp.height * scale;
        ctx.drawImage(bmp, (canvasW - rw) / 2, (canvasH - rh) / 2, rw, rh);
        currentRenderedFrame = index;
        return;
      }
      // Nearest neighbor fallback
      for (let off = 1; off < frameCount; off++) {
        const p = index - off, n = index + off;
        if (p >= 0 && bitmaps[p]) { drawBestFrame(p); return; }
        if (n < frameCount && bitmaps[n]) { drawBestFrame(n); return; }
      }
    };

    // ── RAF Loop ──────────────────────────────────────────────
    const animate = () => {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) < STOP_THRESHOLD) {
        currentProgress = targetProgress;
        isRunning = false;
      } else {
        currentProgress += diff * EASE;
      }

      const fi = Math.min(frameCount - 1, Math.max(0, Math.round(currentProgress * (frameCount - 1))));
      if (fi !== currentRenderedFrame) drawBestFrame(fi);
      if (isRunning) rafId = requestAnimationFrame(animate);
    };

    // ── Scroll Handling ───────────────────────────────────────
    const onScroll = () => {
      const rangePx = (scrollRangeVh / 100) * window.innerHeight;
      targetProgress = Math.max(0, Math.min(1, window.scrollY / rangePx));
      prioritizeNearFrames(Math.round(targetProgress * (frameCount - 1)));
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    // ── High-Performance Prioritized Loader ───────────────────
    let activeLoads = 0;
    const queue = [];

    const loadNext = () => {
      while (activeLoads < CONCURRENCY && queue.length > 0) {
        const idx = queue.shift();
        if (loadState[idx] !== 'idle') continue;
        loadState[idx] = 'loading';
        activeLoads++;
        const num = String(idx + 1).padStart(3, '0');
        fetch(`${framePrefix}${num}.jpg`)
          .then(r => r.blob())
          .then(blob => createImageBitmap(blob, { premultiplyAlpha: 'none' }))
          .then(bmp => {
            bitmaps[idx] = bmp;
            loadState[idx] = 'done';
            activeLoads--;
            const wanted = Math.round(currentProgress * (frameCount - 1));
            if (Math.abs(wanted - idx) <= 2 && idx !== currentRenderedFrame) {
              drawBestFrame(wanted);
            }
            loadNext();
          })
          .catch(() => {
            loadState[idx] = 'idle';
            activeLoads--;
            loadNext();
          });
      }
    };

    const enqueue = (arr, prepend = false) => {
      for (const i of arr) {
        if (i >= 0 && i < frameCount && loadState[i] === 'idle') {
          if (prepend) queue.unshift(i);
          else queue.push(i);
        }
      }
      loadNext();
    };

    const prioritizeNearFrames = (center) => {
      const near = [];
      for (let r = 1; r <= 15; r++) {
        if (center + r < frameCount) near.push(center + r);
        if (center - r >= 0) near.push(center - r);
      }
      enqueue(near, true);
    };

    const startSequentialLoad = () => {
      const order = [];
      for (let i = 1; i < frameCount; i++) order.push(i);
      enqueue(order);
    };

    const loadFirst = () => {
      fetch(`${framePrefix}001.jpg`)
        .then(r => r.blob())
        .then(blob => createImageBitmap(blob, { premultiplyAlpha: 'none' }))
        .then(bmp => {
          bitmaps[0] = bmp;
          loadState[0] = 'done';
          applyResize();
          drawBestFrame(0);
          startSequentialLoad();
        })
        .catch(() => startSequentialLoad());
    };

    applyResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    loadFirst();
    onScroll();

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
        willChange: 'contents',
      }}
    />
  );
}
