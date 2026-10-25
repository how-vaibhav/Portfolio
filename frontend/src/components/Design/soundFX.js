/**
 * Tactile Sound FX Generator using Web Audio API
 * Generates instant, soft, satisfying mechanical clicks, paper rustles, camera shutters, and cyber warps.
 * Zero external mp3 dependencies, 100% reliable, zero network latency.
 */

class SoundController {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this._setupUserUnlock();
  }

  // Ensure AudioContext is initialized and resumed on user gesture
  init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  _setupUserUnlock() {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      this.init();
      ['pointerdown', 'touchstart', 'keydown'].forEach((e) => {
        window.removeEventListener(e, unlock);
      });
    };
    ['pointerdown', 'touchstart', 'keydown'].forEach((e) => {
      window.addEventListener(e, unlock, { once: true, passive: true });
    });
  }

  // Ultra-crisp mechanical haptic tick (Leica camera dial / Apple Taptic feel)
  playTick() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Stage 1: Micro mechanical impulse (noise transient)
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.008);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, now);
      filter.Q.setValueAtTime(3.0, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);

      // Stage 2: Warm body resonance (sine drop)
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.035);

      oscGain.gain.setValueAtTime(0.05, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Audio context silenced or blocked
    }
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
      osc.frequency.setValueAtTime(780, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.065);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);

      // Secondary tactile spring bounce
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(320, now + 0.015);
      osc2.frequency.exponentialRampToValueAtTime(80, now + 0.055);

      gain2.gain.setValueAtTime(0.04, now + 0.015);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.015);
      osc2.stop(now + 0.065);
    } catch {
      // Silent catch
    }
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
      osc1.frequency.setValueAtTime(1100, now);
      osc1.frequency.exponentialRampToValueAtTime(240, now + 0.05);
      gain1.gain.setValueAtTime(0.1, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.06);

      // 2. Secondary aperture blade snap (mechanical catch)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1800, now + 0.035);
      osc2.frequency.exponentialRampToValueAtTime(600, now + 0.09);
      gain2.gain.setValueAtTime(0.06, now + 0.035);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.035);
      osc2.stop(now + 0.105);

      // 3. Resonant luxury linen paper slide (frequency sweep)
      const osc3 = this.ctx.createOscillator();
      const gain3 = this.ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(320, now + 0.06);
      osc3.frequency.exponentialRampToValueAtTime(1280, now + 0.28);
      gain3.gain.setValueAtTime(0.07, now + 0.06);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
      osc3.connect(gain3);
      gain3.connect(this.ctx.destination);
      osc3.start(now + 0.06);
      osc3.stop(now + 0.33);
    } catch {
      // Silent catch
    }
  }

  // Futuristic cyber warp & terminal engagement sound for entering Dev Mode
  playWarp() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Sub-bass tactile punch (50Hz)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(110, now);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.18);
      subGain.gain.setValueAtTime(0.12, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.23);

      // 2. Ascending cyber synth warp sweep
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(160, now);
      osc1.frequency.exponentialRampToValueAtTime(960, now + 0.2);
      gain1.gain.setValueAtTime(0.05, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.25);

      // 3. Dual harmonic confirmation ping (cyber lock)
      [1280, 1920].forEach((freq, idx) => {
        const pingOsc = this.ctx.createOscillator();
        const pingGain = this.ctx.createGain();
        pingOsc.type = 'sine';
        pingOsc.frequency.setValueAtTime(freq, now + 0.14 + idx * 0.04);
        pingOsc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.22 + idx * 0.04);
        pingGain.gain.setValueAtTime(0.05, now + 0.14 + idx * 0.04);
        pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28 + idx * 0.04);
        pingOsc.connect(pingGain);
        pingGain.connect(this.ctx.destination);
        pingOsc.start(now + 0.14 + idx * 0.04);
        pingOsc.stop(now + 0.29 + idx * 0.04);
      });
    } catch {
      // Silent catch
    }
  }

  // Velvet micro-hover sound for interactive buttons & cards
  playHover() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(920, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.022);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Silent catch
    }
  }
}

export const soundFX = new SoundController();
