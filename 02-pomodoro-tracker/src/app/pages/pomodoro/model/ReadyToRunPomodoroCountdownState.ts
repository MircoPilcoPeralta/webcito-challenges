import { MinutsInSeconds, StateConstant } from '../constants';
import { State } from '../interfaces/State';
import { TimerService } from '../services/Timer.service';
import { ReadyToRunBreakCountdownState } from './ReadyToRunBreakCountdownState';

export class ReadyToRunPomodoroCountdownState implements State {
  private timerService: TimerService;
  name: string;

  constructor(timerService: TimerService) {
    this.timerService = timerService;
    this.name = StateConstant.READY_TO_RUN_POMODORO_COUNTDOWN_STATE;
  }

  readyToRunPomodoroCountdownState(): void {
    this.timerService.maxSeconds.set(
      MinutsInSeconds.TWENTY_FIVE_MINUTES_IN_SECONDS
    );
    this.timerService.remainingSeconds.set(
      MinutsInSeconds.TWENTY_FIVE_MINUTES_IN_SECONDS
    );

    this.timerService.removeIntervalThread();
    this.timerService.startOrRestore();

    this.timerService.state = new ReadyToRunBreakCountdownState(
      this.timerService
    );
  }

  readyToRunBreakCountdownState(): void {
    throw new Error('Method not implemented.');
  }
}
