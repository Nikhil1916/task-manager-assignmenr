import { Injectable } from '@angular/core';
import en from '../../../assets/i18/en.json';
// ../../../assets/i18/en.json

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations:any = en;

  constructor() { }

  getLabel(pageSlug:string, fieldKey:string) {
    return (this.translations?.[pageSlug]?.labels?.[fieldKey] || fieldKey)
  }


  getError(pageSlug:string, fieldKey:string, errorName:string, errorValue:string):string {
    let msgTemplate = this.translations?.[pageSlug]?.errors?.[fieldKey]?.[errorName] || `${fieldKey} ${errorName}`;
    if(msgTemplate?.includes('{{value}}')) {
       msgTemplate = msgTemplate.replace('{{value}}', errorValue);
    }
    return msgTemplate;
  }

}
