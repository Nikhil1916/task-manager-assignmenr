import { CurrencyPipe } from '@angular/common';
import { ValueTransformStrategy } from '../interfaces';

export class CurrencyTransformStrategy implements ValueTransformStrategy {
  constructor(
    private currencyPipe: CurrencyPipe,
  ) {}
 transform(
    value: any,
    config?: { currencyCode?: string; display?: 'code' | 'symbol' | 'symbol-narrow' | string }
  ): string {
    const currencyCode = config?.currencyCode ?? 'USD';
    const display = config?.display ?? 'symbol-narrow';
    return this.currencyPipe.transform(value, currencyCode, display) ?? '';
  }
}
