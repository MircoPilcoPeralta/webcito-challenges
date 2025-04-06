import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CronometerPipe } from '../../pipes/cronometer.pipe';

@Component({
  selector: 'app-circle-percentage',
  imports: [CronometerPipe],
  templateUrl: './circle-percentage.component.html',
  styleUrl: './circle-percentage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CirclePercentageComponent {
  private DEFAULT_COLOR: string = 'black';

  public percentage = input<number>(0);

  public remainingSeconds = input<number>(0);

  public mainColor = input<string>(this.DEFAULT_COLOR);
  public secondColor = input<string>(this.DEFAULT_COLOR);

  public rounds = input<number>(0);

  public circumference: number = 2 * Math.PI * 90;

  getStrokeDashoffset(): number {
    return this.circumference * (1 - this.percentage() / 100);
  }
}
