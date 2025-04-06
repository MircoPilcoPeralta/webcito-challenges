import { WritableSignal } from '@angular/core';
import {
  ModeConstants,
  StateConstant,
  TimeConstants
} from '../constants';
import { TimerStateManager } from '../helpers';
import { TimerProps, TimerState, UiProps } from '../interfaces';

import { PausedState, PreparingState, WaitingForStartState } from './';

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
        const buttonText: string =
          this.mode === ModeConstants.WORK_MODE
            ? UIConstants.START_BREAK
            : UIConstants.START_POMODORO;

        const time: number =
          this.mode === ModeConstants.WORK_MODE
            ? TimeConstants.FIVE_MINUTES_IN_SECONDS
            : TimeConstants.TWENTY_FIVE_MINUTES_IN_SECONDS;

        this.mode =
          this.mode === ModeConstants.WORK_MODE
            ? ModeConstants.BREAK_MODE
            : ModeConstants.WORK_MODE;

        this._uiSignal.update((values) => ({
          ...values,
          startButtonText: buttonText,
        }));

        this._timerSignal.update((values) => ({
          ...values,
          maxSeconds: time,
          remainingSeconds: time,
        }));

        return;
      }

      this._timerSignal.update((state) => ({
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        percentage: ((this._timerSignal().maxSeconds - this._timerSignal().remainingSeconds) / this._timerSignal().maxSeconds) * 100
      }));
    }, TimeConstants.ONE_SECONDS_IN_MS);



    this._timerSignal.set({
      ...this._timerSignal(),
      intervalReference: intervalReferenceUpdated,
    });
  }

  changeWhileWorking(): void {

    const updatedSessions =
      this.mode === ModeConstants.WORK_MODE
        ? this._uiSignal().sessions + 1
        : this._uiSignal().sessions;

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

    this._timerStateManager.state = new WaitingForStartState(
      this.mode,
      this._timerStateManager,
      this._timerSignal,
      this._uiSignal
    );
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
}
