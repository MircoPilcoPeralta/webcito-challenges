export interface TimerState {
  name: string;
  mode: string;

  prepare(): void;
  waitForStart(): void;

  work(): void;
  changeWhileWorking(): void;
  pauseWhileWorking(): void;

  pause(): void;
  restoreWhilePaused(): void;
  changeWhilePaused(): void;
}
