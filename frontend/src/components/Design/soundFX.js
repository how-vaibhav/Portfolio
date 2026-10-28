/**
 * Tactile Sound FX Generator using Web Audio API
 * Generates instant, soft, satisfying mechanical clicks, paper rustles, camera shutters, and cyber warps.
 * Zero external mp3 dependencies, 100% reliable, zero network latency.
 * Shared across both Design Mode and Dev Mode.
 *
 * Enhanced with bulletproof Auto-Resume & Re-Awaken Pipeline for fresh page reloads.
 */

class SoundController {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this._lastHover = 0;
    this._lastTick = 0;
    this._setupUserUnlock();
  }

  // Ensure AudioContext is initialized and actively resumed
  init() {
    if (typeof window === 'undefined') return;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch {}
  }

  // Proactive hardware unlock on user gestures (pointer, touch, keyboard, click)
  unlock() {
    if (typeof window === 'undefined') return;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state !== 'running') {
        this.ctx.resume().then(() => {
          try {
            // Play a 1-sample micro buffer to clear hardware gate on Chromium & Safari
            const buf = this.ctx.createBuffer(1, 1, this.ctx.sampleRate);
            const src = this.ctx.createBufferSource();
            src.buffer = buf;
            src.connect(this.ctx.destination);
            src.start(0);
          } catch {}
        }).catch(() => {});
      }
    } catch {}
  }

  _setupUserUnlock() {
    if (typeof window === 'undefined') return;
    const events = ['pointerdown', 'mousedown', 'touchstart', 'touchend', 'keydown', 'click', 'wheel'];
    const unlockHandler = () => {
      this.unlock();
      if (this.ctx && this.ctx.state === 'running') {
        events.forEach((e) => window.removeEventListener(e, unlockHandler, { capture: true }));
      }
    };
    events.forEach((e) => {
      window.addEventListener(e, unlockHandler, { capture: true, passive: true });
    });
  }

  // Self-healing execution wrapper: if AudioContext is suspended (e.g. immediately after reload),
  // it triggers resume and executes as soon as the audio pipeline awakens!
  _runWithAudio(callback) {
    if (!this.enabled || typeof window === 'undefined') return;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (!this.ctx) return;

      if (this.ctx.state === 'running') {
        callback(this.ctx, this.ctx.currentTime);
      } else {
        this.ctx.resume().then(() => {
          if (this.ctx && this.ctx.state === 'running') {
            callback(this.ctx, this.ctx.currentTime);
          }
        }).catch(() => {});
      }
    } catch {}
  }

  // Ultra-crisp mechanical haptic tick (Leica camera dial / Apple Taptic feel)
  playTick() {
    if (!this.enabled) return;
    const nowMs = Date.now();
    if (nowMs - this._lastTick < 16) return; // Prevent high-frequency flutter
    this._lastTick = nowMs;

    this._runWithAudio((ctx, now) => {
      // Stage 1: Micro mechanical impulse (noise transient)
      const bufferSize = Math.floor(ctx.sampleRate * 0.009);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.28));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(4200, now);
      filter.Q.setValueAtTime(3.2, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.085, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);

      // Stage 2: Warm body resonance (sine drop)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(390, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.032);

      oscGain.gain.setValueAtTime(0.08, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.042);
    });
  }

  // Soft tactile paper snap / switch engagement
  playSnap() {
    if (!this.enabled) return;
    this._runWithAudio((ctx, now) => {
      // Fast acoustic pop with rich harmonic decay
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(740, now);
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.065);

      gain.gain.setValueAtTime(0.11, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);

      // Secondary tactile spring bounce
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(290, now + 0.012);
      osc2.frequency.exponentialRampToValueAtTime(70, now + 0.052);

      gain2.gain.setValueAtTime(0.07, now + 0.012);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.058);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.012);
      osc2.stop(now + 0.062);
    });
  }

  // Multi-blade mechanical camera shutter & luxury paper sliding aperture sound
  playAperture() {
    if (!this.enabled) return;
    this._runWithAudio((ctx, now) => {
      // 1. Shutter blade release click (crisp metal transient)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1250, now);
      osc1.frequency.exponentialRampToValueAtTime(260, now + 0.048);
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.052);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.058);

      // 2. Secondary aperture blade snap (mechanical catch)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1750, now + 0.03);
      osc2.frequency.exponentialRampToValueAtTime(580, now + 0.085);
      gain2.gain.setValueAtTime(0.085, now + 0.03);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.095);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.03);
      osc2.stop(now + 0.1);

      // 3. Resonant luxury linen paper slide (frequency sweep)
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(320, now + 0.055);
      osc3.frequency.exponentialRampToValueAtTime(1150, now + 0.26);
      gain3.gain.setValueAtTime(0.09, now + 0.055);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      osc3.connect(gain3);
      gain3.connect(ctx.destination);
      osc3.start(now + 0.055);
      osc3.stop(now + 0.31);
    });
  }

  // Futuristic cyber warp & terminal engagement sound for entering Dev Mode
  playWarp() {
    if (!this.enabled) return;
    this._runWithAudio((ctx, now) => {
      // 1. Sub-bass tactile punch (55Hz)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(120, now);
      subOsc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
      subGain.gain.setValueAtTime(0.16, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.25);

      // 2. Ascending cyber synth warp sweep
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(180, now);
      osc1.frequency.exponentialRampToValueAtTime(1100, now + 0.22);
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.27);

      // 3. Dual harmonic confirmation ping (cyber lock)
      [1320, 1980].forEach((freq, idx) => {
        const pingOsc = ctx.createOscillator();
        const pingGain = ctx.createGain();
        pingOsc.type = 'sine';
        pingOsc.frequency.setValueAtTime(freq, now + 0.15 + idx * 0.04);
        pingOsc.frequency.exponentialRampToValueAtTime(freq * 1.45, now + 0.23 + idx * 0.04);
        pingGain.gain.setValueAtTime(0.075, now + 0.15 + idx * 0.04);
        pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3 + idx * 0.04);
        pingOsc.connect(pingGain);
        pingGain.connect(ctx.destination);
        pingOsc.start(now + 0.15 + idx * 0.04);
        pingOsc.stop(now + 0.31 + idx * 0.04);
      });
    });
  }

  // Velvet micro-hover sound for interactive buttons & cards
  playHover() {
    if (!this.enabled) return;
    const nowMs = Date.now();
    if (nowMs - this._lastHover < 22) return; // Prevent high-frequency overlap
    this._lastHover = nowMs;

    this._runWithAudio((ctx, now) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(840, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.026);

      gain.gain.setValueAtTime(0.065, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.032);
    });
  }

  // Sci-fi developer terminal chip blip (for code tabs, tech pills, badges)
  playCyberBlip() {
    if (!this.enabled) return;
    this._runWithAudio((ctx, now) => {
      // Two-stage rapid micro arpeggio (1280Hz -> 1920Hz)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1280, now);
      osc.frequency.setValueAtTime(1920, now + 0.022);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    });
  }

  // Tactile mechanical keyboard switch clack (for copy email, contact buttons, code snippets)
  playKeypress() {
    if (!this.enabled) return;
    this._runWithAudio((ctx, now) => {
      // High click transient
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(2400, now);
      osc1.frequency.exponentialRampToValueAtTime(450, now + 0.025);
      gain1.gain.setValueAtTime(0.09, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.035);

      // Bottom-out thud
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(320, now + 0.008);
      osc2.frequency.exponentialRampToValueAtTime(90, now + 0.045);
      gain2.gain.setValueAtTime(0.08, now + 0.008);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.008);
      osc2.stop(now + 0.055);
    });
  }

  // Crystal subtle confirmation chime (for copy success, external links, achievements)
  playSuccess() {
    if (!this.enabled) return;
    this._runWithAudio((ctx, now) => {
      // Chime arpeggio: E5 (659Hz) -> G#5 (830Hz) -> B5 (987Hz)
      [659, 830, 987].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.035);

        gain.gain.setValueAtTime(0.07, now + idx * 0.035);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18 + idx * 0.035);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.035);
        osc.stop(now + 0.2 + idx * 0.035);
      });
    });
  }
}

export const soundFX = new SoundController();
