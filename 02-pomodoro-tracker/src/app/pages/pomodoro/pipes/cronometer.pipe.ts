import { Pipe, type PipeTransform } from '@angular/core';
import { formatSeconds } from '../utils';

@Pipe({
  name: 'cronometer',
})
export class CronometerPipe implements PipeTransform {
  transform(value: number): string {
    const { hours, minutes, restantSeconds } = formatSeconds(value);

    return `${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }:${restantSeconds < 10 ? '0' + restantSeconds : restantSeconds}`;
  }
}
