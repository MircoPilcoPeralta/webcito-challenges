import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy
} from '@angular/core';
import { TimerService } from '../../services/Timer.service';
import { CirclePercentageComponent } from '../circle-percentage/circle-percentage.component';

@Component({
  selector: 'app-timer',
  imports: [CirclePercentageComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TimerService],
})
export class TimerComponent {
  public timerStrongColor: string = '#E046D7';
  public timerLightColor: string = '#E046D733';

  constructor(private readonly _timerService: TimerService) {}

  start() {
    this._timerService.start();
  }

  pauseOrRestore(): void {
    this._timerService.pauseOrRestore();
  }

  isButtonDisabled(): boolean {
    return (
      this._timerService.maxSeconds === this._timerService.remainingSeconds
    );
  }

  get percentage() {
    return this._timerService.percentage;
  }

  get remainingSeconds() {
    return this._timerService.remainingSeconds;
  }

  get startButtonText() {
    return this._timerService.startButtonText
  }
}
