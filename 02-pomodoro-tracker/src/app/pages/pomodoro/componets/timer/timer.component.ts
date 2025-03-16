import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CirclePercentageComponent } from '../circle-percentage/circle-percentage.component';
import { CronometerPipe } from '../../pipes/cronometer.pipe';

@Component({
  selector: 'app-timer',
  imports: [CirclePercentageComponent, CronometerPipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnInit, OnDestroy {
  public seconds = signal(0);
  private intervalReference: any;

  ngOnInit(): void {
    this.intervalReference = setInterval(() => {
      this.seconds.update((seconds) => seconds + 1);
    }, 1000);
    console.log(this.intervalReference);
  }

  ngOnDestroy(): void {
    if (this.intervalReference != null) {
      clearInterval(this.intervalReference);
    }
  }
}
