import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';

@Component({
  selector: 'app-circle-percentage',
  imports: [],
  templateUrl: './circle-percentage.component.html',
  styleUrl: './circle-percentage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CirclePercentageComponent {
  public percentage: InputSignal<number> = input(0);
  public color: string = 'green';
  public circumference: number = 2 * Math.PI * 90;

  getStrokeDashoffset(): number {
    return this.circumference * (1 - this.percentage() / 100);
  }
}
