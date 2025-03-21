import { computed, Injectable, signal } from '@angular/core';
import { State } from '../interfaces/State';
import { MinutsInSeconds, StateConstant } from '../constants';
import { ReadyToRunPomodoroCountdownState } from '../model';
// todo modificar el código para evitar que se importe el servicio a el componente root
@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private _state: State;
  private _intervalReference: any = null;

  private _maxSeconds = signal(MinutsInSeconds.TWENTY_FIVE_MINUTES_IN_SECONDS);
  private _remainingSeconds = signal(
    MinutsInSeconds.TWENTY_FIVE_MINUTES_IN_SECONDS
  );

  private _percentage = computed(
    () =>
      ((this._maxSeconds() - this._remainingSeconds()) / this._maxSeconds()) *
      1000
  );

  constructor() {
    this._state = new ReadyToRunPomodoroCountdownState(this);
  }

  start() {
    if (
      this._state.name === StateConstant.READY_TO_RUN_POMODORO_COUNTDOWN_STATE
    ) {
      this.readyToRunPomodoroCountdownState();
      return;
    }

    if (this._state.name === StateConstant.READY_TO_RUN_BREAK_COUNTDOWN_STATE) {
      this.readyToRunBreakCountdownState();
      return;
    }
  }

  readyToRunPomodoroCountdownState(): void {
    this.state.readyToRunPomodoroCountdownState();
  }

  readyToRunBreakCountdownState(): void {
    this.state.readyToRunBreakCountdownState();
  }

  startOrRestore() {
    this._intervalReference = setInterval(() => {
      this._remainingSeconds.update((seconds: number) => seconds - 1);
    }, 100);
  }

  pause() {
    this.removeIntervalThread();
  }

  removeIntervalThread(): void {
    if (this._intervalReference != null) {
      clearInterval(this._intervalReference);
      this._intervalReference = null;
    }
  }

  public get maxSeconds() {
    return this._maxSeconds;
  }

  public get remainingSeconds() {
    return this._remainingSeconds;
  }

  public get percentage() {
    return this._percentage;
  }

  public get state(): State {
    return this._state;
  }

  public set state(state: State) {
    this._state = state;
  }

  public get intervalReference() {
    return this._intervalReference;
  }

  public set intervalReference(value: any) {
    this._intervalReference = value;
  }
}
