import { WritableSignal } from '@angular/core';
import { ColorConstants, ModeConstants, StateConstant, TimeConstants, UIConstants } from '../constants';
import { TimerStateManager } from '../helpers';
import { TimerProps, TimerState, UiProps } from '../interfaces';

import { WaitingForStartState } from './';

export class PreparingState implements TimerState {
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
    this.name = StateConstant.PREPARING_STATE;
    this.mode = mode;
    this._timerStateManager = timerStateManager;
    this._timerSignal = timerSignal;
    this._uiSignal = uiSignal;
  }

  prepare(): void {
    if (this._timerSignal().intervalReference) {
      this.stopIntervalThread();
    }

    const startButtonText: string =
      this.mode === ModeConstants.WORK_MODE
        ? UIConstants.START_POMODORO
        : UIConstants.START_BREAK;

    const pauseButtonText: string =
    this.mode === ModeConstants.WORK_MODE
      ? UIConstants.PAUSE_POMODORO
      : UIConstants.PAUSE_BREAK;

    const progressColor = this.mode === ModeConstants.WORK_MODE
    ? ColorConstants.WORK_COLOR
    : ColorConstants.BREAK_COLOR;

    const progressBackgroundColor = this.mode === ModeConstants.WORK_MODE
    ? ColorConstants.WORK_BACKGROUND_COLOR
    : ColorConstants.BREAK_BACKGROUND_COLOR;


    const time: number =
      this.mode === ModeConstants.WORK_MODE
        ? TimeConstants.TWENTY_FIVE_MINUTES_IN_SECONDS
        : TimeConstants.FIVE_MINUTES_IN_SECONDS;

    this._uiSignal.update((values) => ({
      ...values,
      startButtonText: startButtonText,
      pauseButtonText: pauseButtonText,
      progressColor,
      progressBackgroundColor
    }));

    this._timerSignal.update((values) => ({
      ...values,
      maxSeconds: time,
      remainingSeconds: time,
    }));

    this._timerStateManager.state = new WaitingForStartState(
      this.mode,
      this._timerStateManager,
      this._timerSignal,
      this._uiSignal
    );
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
