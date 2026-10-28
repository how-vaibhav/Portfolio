/**
 * Tactile Sound FX Generator using Web Audio API
 * Generates instant, soft, satisfying mechanical clicks, paper rustles, camera shutters, and cyber warps.
 * Zero external mp3 dependencies, 100% reliable, zero network latency.
 * Shared across both Design Mode and Dev Mode.
 */

class SoundController {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this._lastHover = 0;
    this._lastTick = 0;
    this._setupUserUnlock();
  }

  // Ensure AudioContext is initialized and resumed on user gesture
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

  _setupUserUnlock() {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      this.init();
      ['pointerdown', 'pointerup', 'touchstart', 'touchend', 'keydown', 'click', 'wheel'].forEach((e) => {
        window.removeEventListener(e, unlock);
      });
    };
    ['pointerdown', 'pointerup', 'touchstart', 'touchend', 'keydown', 'click', 'wheel'].forEach((e) => {
      window.addEventListener(e, unlock, { once: true, passive: true });
    });
  }

  // Ultra-crisp mechanical haptic tick (Leica camera dial / Apple Taptic feel)
  playTick() {
    if (!this.enabled) return;
    const nowMs = Date.now();
    if (nowMs - this._lastTick < 18) return; // Prevent high-frequency flutter
    this._lastTick = nowMs;

    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Stage 1: Micro mechanical impulse (noise transient)
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.009);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.28));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(4200, now);
      filter.Q.setValueAtTime(3.2, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.065, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.014);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);

      // Stage 2: Warm body resonance (sine drop)
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.032);

      oscGain.gain.setValueAtTime(0.06, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.042);
    } catch {}
  }

  // Soft tactile paper snap / switch engagement
  playSnap() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Fast acoustic pop with rich harmonic decay
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(720, now);
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.065);

      gain.gain.setValueAtTime(0.085, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);

      // Secondary tactile spring bounce
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(280, now + 0.012);
      osc2.frequency.exponentialRampToValueAtTime(70, now + 0.052);

      gain2.gain.setValueAtTime(0.05, now + 0.012);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.058);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.012);
      osc2.stop(now + 0.062);
    } catch {}
  }

  // Multi-blade mechanical camera shutter & luxury paper sliding aperture sound
  playAperture() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Shutter blade release click (crisp metal transient)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1200, now);
      osc1.frequency.exponentialRampToValueAtTime(260, now + 0.048);
      gain1.gain.setValueAtTime(0.1, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.052);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.058);

      // 2. Secondary aperture blade snap (mechanical catch)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1750, now + 0.03);
      osc2.frequency.exponentialRampToValueAtTime(580, now + 0.085);
      gain2.gain.setValueAtTime(0.07, now + 0.03);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.095);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.03);
      osc2.stop(now + 0.1);

      // 3. Resonant luxury linen paper slide (frequency sweep)
      const osc3 = this.ctx.createOscillator();
      const gain3 = this.ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(320, now + 0.055);
      osc3.frequency.exponentialRampToValueAtTime(1150, now + 0.26);
      gain3.gain.setValueAtTime(0.075, now + 0.055);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      osc3.connect(gain3);
      gain3.connect(this.ctx.destination);
      osc3.start(now + 0.055);
      osc3.stop(now + 0.31);
    } catch {}
  }

  // Futuristic cyber warp & terminal engagement sound for entering Dev Mode
  playWarp() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Sub-bass tactile punch (55Hz)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(120, now);
      subOsc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
      subGain.gain.setValueAtTime(0.14, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.25);

      // 2. Ascending cyber synth warp sweep
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(180, now);
      osc1.frequency.exponentialRampToValueAtTime(1100, now + 0.22);
      gain1.gain.setValueAtTime(0.065, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.27);

      // 3. Dual harmonic confirmation ping (cyber lock)
      [1320, 1980].forEach((freq, idx) => {
        const pingOsc = this.ctx.createOscillator();
        const pingGain = this.ctx.createGain();
        pingOsc.type = 'sine';
        pingOsc.frequency.setValueAtTime(freq, now + 0.15 + idx * 0.04);
        pingOsc.frequency.exponentialRampToValueAtTime(freq * 1.45, now + 0.23 + idx * 0.04);
        pingGain.gain.setValueAtTime(0.06, now + 0.15 + idx * 0.04);
        pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3 + idx * 0.04);
        pingOsc.connect(pingGain);
        pingGain.connect(this.ctx.destination);
        pingOsc.start(now + 0.15 + idx * 0.04);
        pingOsc.stop(now + 0.31 + idx * 0.04);
      });
    } catch {}
  }

  // Velvet micro-hover sound for interactive buttons & cards
  playHover() {
    if (!this.enabled) return;
    const nowMs = Date.now();
    if (nowMs - this._lastHover < 25) return; // Prevent high-frequency overlap
    this._lastHover = nowMs;

    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(840, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.026);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.032);
    } catch {}
  }

  // Sci-fi developer terminal chip blip (for code tabs, tech pills, badges)
  playCyberBlip() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Two-stage rapid micro arpeggio (1280Hz -> 1920Hz)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1280, now);
      osc.frequency.setValueAtTime(1920, now + 0.022);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch {}
  }

  // Tactile mechanical keyboard switch clack (for copy email, contact buttons, code snippets)
  playKeypress() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // High click transient
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(2400, now);
      osc1.frequency.exponentialRampToValueAtTime(450, now + 0.025);
      gain1.gain.setValueAtTime(0.07, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.035);

      // Bottom-out thud
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(320, now + 0.008);
      osc2.frequency.exponentialRampToValueAtTime(90, now + 0.045);
      gain2.gain.setValueAtTime(0.06, now + 0.008);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.008);
      osc2.stop(now + 0.055);
    } catch {}
  }

  // Crystal subtle confirmation chime (for copy success, external links, achievements)
  playSuccess() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Chime arpeggio: E5 (659Hz) -> G#5 (830Hz) -> B5 (987Hz)
      [659, 830, 987].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.035);

        gain.gain.setValueAtTime(0.05, now + idx * 0.035);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18 + idx * 0.035);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.035);
        osc.stop(now + 0.2 + idx * 0.035);
      });
    } catch {}
  }
}

export const soundFX = new SoundController();
