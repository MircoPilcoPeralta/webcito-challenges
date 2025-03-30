import { WritableSignal } from '@angular/core';
import { StateConstant } from '../constants';
import { TimerStateManager } from '../helpers';
import { TimerProps, TimerState, UiProps } from '../interfaces';

import { WorkingState } from './';

export class WaitingForStartState implements TimerState {
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
    this.name = StateConstant.WAITING_FOR_START_STATE;
    this.mode = mode;
    this._timerStateManager = timerStateManager;
    this._timerSignal = timerSignal;
    this._uiSignal = uiSignal;
  }

  prepare(): void {
    throw new Error('Method not implemented.');
  }

  waitForStart(): void {
    this._timerStateManager.state = new WorkingState(
      this.mode,
      this._timerStateManager,
      this._timerSignal,
      this._uiSignal
    );
    this._timerStateManager.work();
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
    throw new Error('Method not implemented.');
  }

  changeWhilePaused(): void {
    throw new Error('Method not implemented.');
  }

  restoreWhilePaused(): void {
    throw new Error('Method not implemented.');
  }
}
