import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { TimerComponent } from './componets/timer/timer.component';

@Component({
  selector: 'app-pomodoro',
  imports: [TimerComponent],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PomodoroComponent {}
