import { WritableSignal } from '@angular/core';
import {
  LocalStorageConstants,
  ModeConstants,
  StateConstant,
  TimeConstants
} from '../constants';
import { TimerStateManager } from '../helpers';
import { TimerProps, TimerState, UiProps } from '../interfaces';

import { PausedState, PreparingState } from './';

export class WorkingState implements TimerState {
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
    this.name = StateConstant.WORKING_STATE;
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

    const intervalReferenceUpdated = setInterval(() => {
      if (this._timerSignal().remainingSeconds === 0) {
        this.changeWhileWorking();
        return;
      }

      this._timerSignal.update((state) => ({
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        percentage: this.updatePercentage(),
      }));

    }, TimeConstants.ONE_SECONDS_IN_MS);

    this._timerSignal.set({
      ...this._timerSignal(),
      intervalReference: intervalReferenceUpdated,
    });
  }

  private updatePercentage(): number {
    return (
      ((this._timerSignal().maxSeconds - this._timerSignal().remainingSeconds) /
        this._timerSignal().maxSeconds) *
      100
    );
  }

  changeWhileWorking(): void {
    if (this._timerSignal().intervalReference) {
      this.stopIntervalThread();
    }

    const updatedSessions =
      this.mode === ModeConstants.WORK_MODE
        ? this._uiSignal().sessions + 1
        : this._uiSignal().sessions;

    localStorage.setItem(LocalStorageConstants.SESSIONS_KEY, updatedSessions.toString());

    this._uiSignal.update((values) => ({
      ...values,
      sessions: updatedSessions,
    }));

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
    this._timerStateManager.state.prepare();
    this._timerStateManager.state.waitForStart();
  }

  pauseWhileWorking(): void {
    this._timerStateManager.state = new PausedState(
      this.mode,
      this._timerStateManager,
      this._timerSignal,
      this._uiSignal
    );
    this._timerStateManager.pause();
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

  private stopIntervalThread() {
    clearInterval(this._timerSignal().intervalReference);

    this._timerSignal.set({
      ...this._timerSignal(),
      intervalReference: null,
    });
  }
}
