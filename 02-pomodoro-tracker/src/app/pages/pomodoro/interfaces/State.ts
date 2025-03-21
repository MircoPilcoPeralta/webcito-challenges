export interface State {
  name: string;

  readyToRunPomodoroCountdownState(): void;
  readyToRunBreakCountdownState(): void;
}
