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
  constructor(private readonly _timerService: TimerService) {}

  start() {
    this._timerService.start();
  }

  pauseOrRestore(): void {
    this._timerService.pauseOrRestore();
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

  get pauseButtonText() {
    return this._timerService.pauseButtonText
  }

  public get progressColor() {
    return this._timerService.progressColor;
  }

  public get progressBackgroundColor() {
    return this._timerService.progressBackgroundColor;
  }

}
