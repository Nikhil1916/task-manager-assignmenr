import { Component, Input } from '@angular/core';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {

  @Input() field!:any;
  @Input() group!:any;
  @Input() slug!:string;
  constructor(private translateS:TranslationService) {}

  ngAfterViewInit(): void {
      // this.getErrors();
  }

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
