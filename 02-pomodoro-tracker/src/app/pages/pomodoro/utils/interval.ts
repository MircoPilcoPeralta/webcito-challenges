export function initInterval(callback: () => void, ms: number) {
  return setInterval(callback, ms);
}

export function removeInterval (reference: any) {
  clearInterval(reference);
}
