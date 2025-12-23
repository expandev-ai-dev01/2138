/**
 * Triggers sensory feedback (haptic and audio) based on configuration
 */
export const triggerFeedback = (config: { sound: boolean; haptic: boolean }) => {
  // Haptic Feedback (Vibration API)
  if (config.haptic && typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate(50);
    } catch {
      // Ignore errors if vibration is not supported or allowed
    }
  }

  // Audio Feedback (Web Audio API)
  if (config.sound && typeof window !== 'undefined' && window.AudioContext) {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // High pitch beep
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Ignore audio errors
    }
  }
};
