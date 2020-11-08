import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'fromNowDate' })
export class DatePipe implements PipeTransform {
  transform(date: Date | string): string {
    const dateObj = moment(date);
    const duration = moment.duration(dateObj.diff(new Date()));
    const hours = -duration.asHours();
    if (hours > 3) {
      return dateObj.format('MMM Do h:mm a');
    }
    return dateObj.fromNow();
  }
}
