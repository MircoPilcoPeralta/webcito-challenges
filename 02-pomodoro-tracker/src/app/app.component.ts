import { Component } from '@angular/core';
import {PomodoroComponent} from "./pages/pomodoro/pomodoro.component"


@Component({
  selector: 'app-root',
  imports: [PomodoroComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Pomodoro';
}
