import { Injectable, signal } from '@angular/core';
import { TimerCommand, TimerStateManager } from '../helpers';
import { TimerProps, UiProps } from '../interfaces';

@Injectable()
export class TimerService {
  private _timerSignal = signal<TimerProps>({
    maxSeconds: 0,
    remainingSeconds: 0,
    percentage: 0,
    intervalReference: null as any,
  });

  private _uiSignal = signal<UiProps>({
    startButtonText: '',
    pauseButtonText: '',
    pauseButtonActive: false,
    progressColor: '',
    progressBackgroundColor: '',
    sessions: 0
  });

  private _timerStateManager: TimerStateManager;
  private _timerCommand: TimerCommand;

  constructor() {
    this._timerStateManager = new TimerStateManager(
      this._timerSignal,
      this._uiSignal
    );
    this._timerCommand = new TimerCommand(this._timerStateManager);
  }

  start() {
    this._timerCommand.start();
  }

  pauseOrRestore(): void {
    this._timerCommand.pauseOrResume();
  }

  public get remainingSeconds() {
    return this._timerSignal().remainingSeconds;
  }

  public get percentage() {
    return this._timerSignal().percentage;
  }

  public get startButtonText() {
    return this._uiSignal().startButtonText;
  }

  public get pauseButtonText() {
    return this._uiSignal().pauseButtonText;
  }

  public get progressColor() {
    return this._uiSignal().progressColor;
  }

  public get progressBackgroundColor() {
    return this._uiSignal().progressBackgroundColor;
  }

  public get sessions() {
    return this._uiSignal().sessions;
  }

  public get pauseButtonActive() {
    return this._uiSignal().pauseButtonActive;
  }

}
