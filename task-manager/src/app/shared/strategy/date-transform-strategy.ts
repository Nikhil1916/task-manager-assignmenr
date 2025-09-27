import { DatePipe } from '@angular/common';
import { ValueTransformStrategy } from '../interfaces';
export class DateTransformStrategy implements ValueTransformStrategy {
  constructor(private datePipe: DatePipe) {}
  transform(value: any, format: string = 'dd/MM/yyyy') {
    return this.datePipe.transform(value, format);
  }
}
