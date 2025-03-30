import { TimerStateManager } from '../helpers';
import { WritableSignal } from '@angular/core';
import { TimerProps, UiProps, TimerState } from '../interfaces';
import { StateConstant, ModeConstants } from '../constants';

import { WorkingState, PreparingState } from './';

export class PausedState implements TimerState {
  mode: string;
  name: string;

  private _timerStateManager: TimerStateManager;
  private _timerSignal: WritableSignal<TimerProps>;
  private _uiSignal: WritableSignal<UiProps>;

  constructor(
    mode: string,
    timerStateManager: TimerStateManager,
    timerSignal: WritableSignal<TimerProps>,
    uiSignal: WritableSignal<UiProps>
  ) {
    this.name = StateConstant.PAUSED_STATE;
    this.mode = mode;
    this._timerStateManager = timerStateManager;
    this._timerSignal = timerSignal;
    this._uiSignal = uiSignal;
  }

  prepare(): void {
    throw new Error('Method not implemented.');
  }

  waitForStart(): void {
    throw new Error('Method not implemented.');
  }

  work(): void {
    throw new Error('Method not implemented.');
  }

  changeWhileWorking(): void {
    throw new Error('Method not implemented.');
  }

  pauseWhileWorking(): void {
    throw new Error('Method not implemented.');
  }

  pause(): void {
    if (this._timerSignal().intervalReference !== null) {
      this.stopIntervalThread();
    }
  }

  changeWhilePaused(): void {
    this.mode =
      this.mode === ModeConstants.WORK_MODE
        ? ModeConstants.BREAK_MODE
        : ModeConstants.WORK_MODE;
    this._timerStateManager.state = new PreparingState(
      this.mode,
      this._timerStateManager,
      this._timerSignal,
      this._uiSignal
    );
    this._timerStateManager.prepare();
  }

  restoreWhilePaused(): void {
    this._timerStateManager.state = new WorkingState(
      this.mode,
      this._timerStateManager,
      this._timerSignal,
      this._uiSignal
    );
    this._timerStateManager.work();
  }

  private stopIntervalThread() {
    clearInterval(this._timerSignal().intervalReference);

    this._timerSignal.set({
      ...this._timerSignal(),
      intervalReference: null,
    });
  }
}
