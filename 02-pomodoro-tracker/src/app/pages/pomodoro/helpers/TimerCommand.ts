import { StateConstant } from '../constants';
import { ITimerCommand } from '../interfaces';
import { TimerStateManager } from './';

export class TimerCommand implements ITimerCommand {

  constructor(private _timerStateManager: TimerStateManager) {
  }

  start(): void {
    if (this._timerStateManager.state.name === StateConstant.WAITING_FOR_START_STATE) {
      this._timerStateManager.waitForStart();
      return;
    }

    if (this._timerStateManager.state.name === StateConstant.WORKING_STATE) {
      this._timerStateManager.changeWhileWorking();
      return;
    }

    if (this._timerStateManager.state.name === StateConstant.PAUSED_STATE) {
      this._timerStateManager.changeWhilePaused();
      return;
    }

  }

  pauseOrResume(): void {
    if(this._timerStateManager.state.name === StateConstant.WORKING_STATE) {
      this._timerStateManager.pauseWhileWorking();
      return;
    }

    if(this._timerStateManager.state.name === StateConstant.PAUSED_STATE) {
      this._timerStateManager.restoreWhilePaused();
    }

  }

}
