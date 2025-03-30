import { Pipe, type PipeTransform } from '@angular/core';
import { formatSeconds } from '../utils';

@Pipe({
  name: 'cronometer',
})
export class CronometerPipe implements PipeTransform {
  transform(value: number): string {
    const { minutes, restantSeconds } = formatSeconds(value);

    return `${minutes < 10 ? '0' + minutes : minutes}:${
      restantSeconds < 10 ? '0' + restantSeconds : restantSeconds
    }`;
  }
}
