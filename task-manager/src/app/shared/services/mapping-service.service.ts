import { Injectable } from '@angular/core';
import { DynamicFieldType } from '../enums';
import { DynamicFields } from '../interfaces';
import { get } from 'lodash-es';
import { TransformStrategyFactory } from '../strategy/transform-strategy-factory';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor(private transformFactory: TransformStrategyFactory) { }

  attachValues(config:DynamicFields[], response:any):any {
    return config?.map((field:any)=>{
      switch(field?.type) {
        case DynamicFieldType.LABEL:
          const rawValue = field?.key ? get(response, field?.key) : '';
          const strategy = field?.transformType ? this.transformFactory.getStrategy(field?.transformType) : null;
          const value = strategy
            ? strategy.transform(rawValue, field.transformConfig) // 🔑 pass config
            : rawValue;
          return {
            ...field, 
            value
          }
        case DynamicFieldType.GROUP:
          return {
            ...field,
            fields: this.attachValues(field?.fields || [], response)
          }
        default:
          return field
      }
    })
  }
}
