import { computed, Injectable, signal } from '@angular/core';
import { TimerStateManager } from '../helpers';
import { TimerCommand } from '../helpers';
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
    progressColor: '',
    progressBackgroundColor: ''
  });

  private _percentage = computed(
    () =>
      ((this._timerSignal().maxSeconds - this._timerSignal().remainingSeconds) /
        this._timerSignal().maxSeconds) *
      100
  );

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

  public get maxSeconds() {
    return this._timerSignal().maxSeconds;
  }

  public get remainingSeconds() {
    return this._timerSignal().remainingSeconds;
  }

  public get percentage() {
    return this._percentage;
  }

  public get intervalReference() {
    return this._timerSignal().intervalReference;
  }

  public set intervalReference(value: any) {
    this._timerSignal.set({
      ...this._timerSignal(),
      intervalReference: value,
    });
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

}
