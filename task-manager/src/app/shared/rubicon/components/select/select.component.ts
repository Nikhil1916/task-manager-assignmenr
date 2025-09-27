import { Component, Input } from '@angular/core';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {

  @Input() group:any;
  @Input() slug:any;
  @Input() field:any;

  constructor(private translateS:TranslationService) {}


  getLabel():string {
    return this.translateS.getLabel(this.slug, this.field.key);
  }

  getErrors() {
    const control = this.group.get(this.field.key);
    if(!control || !control.errors) return [];
    return Object.keys(control.errors).map((errK)=> {
      return this.translateS.getError(this.slug, this.field.key, errK, this.field.validators?.find((v:any)=>v.name==errK)?.value)
    });
  }

  isInvalid() {
    const control = this.group.get(this.field.key);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

}
