import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
  signal,
} from '@angular/core';
import { CronometerPipe } from '../../pipes/cronometer.pipe';
import { CirclePercentageComponent } from '../circle-percentage/circle-percentage.component';

@Component({
  selector: 'app-timer',
  imports: [CirclePercentageComponent, CronometerPipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnDestroy {
  public maxSeconds: number = 1500;
  public seconds = signal(this.maxSeconds);
  private intervalReference: any;

  public percentage = computed(
    () =>
      Math.round(((this.maxSeconds - this.seconds()) / this.maxSeconds) * 100) /
      100
  );

  ngOnDestroy(): void {
    this.removeIntervalThread();
  }

  start(): void {
    this.intervalReference = setInterval(() => {
      this.seconds.update((seconds) => seconds - 1);
    }, 100);
  }

  pause(): void {
    this.removeIntervalThread();
  }

  reset(): void {
    this.seconds.set(this.maxSeconds);
    this.removeIntervalThread();
  }

  private removeIntervalThread(): void {
    if (this.intervalReference != null) {
      clearInterval(this.intervalReference);
    }
  }
}
