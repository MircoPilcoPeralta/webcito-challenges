export function formatSeconds(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const restantSeconds = seconds % 60;

  return { hours, minutes, restantSeconds };
}
