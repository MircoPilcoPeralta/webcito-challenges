import { WritableSignal } from '@angular/core';
import { ModeConstants } from '../constants';
import { TimerProps, UiProps, TimerState } from '../interfaces';

import { PreparingState } from '../State';

// Dos errores:
// 1.- No pensar en métodos que permitan moverse a otros estados alternativos
// 2.- Pensar que el servicio debia encargarse de manipular el state manager cuando otra clase podía probeer una
// capa de abstracción mayor que permita al servicio realizar su labor y limitarse.
// 3.- Error al crear variantes de clases que hacen casi lo mismo

export class TimerStateManager {
  private _state: TimerState;

  constructor(timerSignal: WritableSignal<TimerProps>, uiSignal: WritableSignal<UiProps>) {
    this._state = new PreparingState(ModeConstants.WORK_MODE, this, timerSignal, uiSignal);
    this._state.prepare();
  }

  get state(): TimerState {
    return this._state;
  }

  public set state(state: TimerState) {
    this._state = state;
  }

  prepare(): void {
   this._state.prepare();
  }

  waitForStart(): void {
    this._state.waitForStart();
  }

  work(): void {
    this._state.work();
  }

  changeWhileWorking(): void {
    this._state.changeWhileWorking();
  }

  pauseWhileWorking(): void {
    this._state.pauseWhileWorking();
  }

  pause(): void  {
    this._state.pause();
  }

  restoreWhilePaused(): void {
    this._state.restoreWhilePaused();
  }

  changeWhilePaused(): void {
    this._state.changeWhilePaused();
  }

}
