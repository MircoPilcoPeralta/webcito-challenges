import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
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
  public maxMinutes: number = 1500;
  public seconds = signal(this.maxMinutes);
  private intervalReference: any;

  ngOnDestroy(): void {
    this.removeIntervalThread();
  }

  start(): void {
    this.intervalReference = setInterval(() => {
      this.seconds.update((seconds) => seconds - 1);
    }, 1000);
  }

  pause(): void {
    this.removeIntervalThread();
  }

  reset(): void {
    this.seconds.set(this.maxMinutes);
    this.removeIntervalThread();
  }

  private removeIntervalThread(): void {
    if (this.intervalReference != null) {
      clearInterval(this.intervalReference);
    }
  }
}
