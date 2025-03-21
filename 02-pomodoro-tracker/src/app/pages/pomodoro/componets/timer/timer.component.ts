import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CirclePercentageComponent } from '../circle-percentage/circle-percentage.component';
import { TimerService } from '../../services/Timer.service';
import { StateConstant } from '../../constants';

@Component({
  selector: 'app-timer',
  imports: [CirclePercentageComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TimerService],
})
export class TimerComponent implements OnDestroy {
  public timerStrongColor: string = '#E046D7';
  public timerLightColor: string = '#E046D733';

  constructor(private readonly _timerService: TimerService) {}

  ngOnDestroy(): void {
    this._timerService.removeIntervalThread();
  }

  start() {
    this._timerService.start();
  }

  pauseOrRestore() {
    if (this.iscountdownRunning()) {
      this._timerService.pause();
    } else {
      this._timerService.startOrRestore();
    }
  }

  iscountdownRunning(): boolean {
    console.log(this._timerService.intervalReference);

    return this._timerService.intervalReference !== null;
  }

  isButtonDisabled(): boolean {
    return (
      this._timerService.maxSeconds() === this._timerService.remainingSeconds()
    );
  }

  get percentage() {
    return this._timerService.percentage;
  }

  get remainingSeconds() {
    return this._timerService.remainingSeconds;
  }

  get stateName() {
    return this._timerService.state.name;
  }

  get startButtonText() {
    if (!this._timerService.state.name) {
      throw Error(
        'Error while initializing the text of the button to start the countdown'
      );
    }

    if (
      this._timerService.state.name ===
      StateConstant.READY_TO_RUN_POMODORO_COUNTDOWN_STATE
    ) {
      return 'Start Pomodoro';
    }

    if (
      this._timerService.state.name ===
      StateConstant.READY_TO_RUN_BREAK_COUNTDOWN_STATE
    ) {
      return 'Start break';
    }

    return null;
  }
}
