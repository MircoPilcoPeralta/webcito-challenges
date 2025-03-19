import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
  signal,
} from '@angular/core';
import { CirclePercentageComponent } from '../circle-percentage/circle-percentage.component';

@Component({
  selector: 'app-timer',
  imports: [CirclePercentageComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnDestroy {
  public timerColor: string = '#E046D7';

  public maxSeconds: number = 1500;
  public remainingSeconds = signal(this.maxSeconds);

  private intervalReference: any;

  public percentage = computed(
    () => ((this.maxSeconds - this.remainingSeconds()) / this.maxSeconds) * 100
  );

  ngOnDestroy(): void {
    this.removeIntervalThread();
  }

  start(): void {
    this.intervalReference = setInterval(() => {
      this.remainingSeconds.update((seconds) => seconds - 1);
    }, 100);
  }

  pause(): void {
    this.removeIntervalThread();
  }

  reset(): void {
    this.removeIntervalThread();
    this.remainingSeconds.set(this.maxSeconds);
  }

  private removeIntervalThread(): void {
    if (this.intervalReference != null) {
      clearInterval(this.intervalReference);
    }
  }
}
