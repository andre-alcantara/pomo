export function formatTime(ms: number): { minutes: string; seconds: string } {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  return {
    minutes: String(Math.floor(totalSeconds / 60)).padStart(2, '0'),
    seconds: String(totalSeconds % 60).padStart(2, '0'),
  };
}
