import { MinutsInSeconds, StateConstant } from '../constants';
import { State } from '../interfaces/State';
import { TimerService } from '../services/Timer.service';
import { ReadyToRunPomodoroCountdownState } from './ReadyToRunPomodoroCountdownState';

export class ReadyToRunBreakCountdownState implements State {
  private timerService: TimerService;
  name: string;

  constructor(timerService: TimerService) {
    this.timerService = timerService;
    this.name = StateConstant.READY_TO_RUN_BREAK_COUNTDOWN_STATE;
  }

  readyToRunPomodoroCountdownState(): void {
    throw new Error('Method not implemented.');
  }

  readyToRunBreakCountdownState(): void {
    this.timerService.maxSeconds.set(MinutsInSeconds.FIVE_MINUTES_IN_SECONDS);
    this.timerService.remainingSeconds.set(
      MinutsInSeconds.FIVE_MINUTES_IN_SECONDS
    );

    this.timerService.removeIntervalThread();
    this.timerService.startOrRestore();

    this.timerService.state = new ReadyToRunPomodoroCountdownState(
      this.timerService
    );
  }
}
