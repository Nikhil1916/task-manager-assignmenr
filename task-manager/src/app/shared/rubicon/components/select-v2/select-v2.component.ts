import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-select-v2',
  templateUrl: './select-v2.component.html',
   styleUrl: './select-v2.component.css'
})
export class SelectV2Component implements OnInit, OnChanges {

    @Input() group:any;
    @Input() slug:any;
    @Input() field:any;
  
  constructor(private translateS:TranslationService, private cd:ChangeDetectorRef) {}


  ngOnInit(): void {
      console.log(this.group, this.slug, this.field);
  }
  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
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

  change(e:any) {
    // console.log(this.group.get(e.key)?.value);
    // console.log(this.field);
    this.field.functionBinders.onChange({
      event: e,
      field: this.field
    });
    this.cd.detectChanges();
        console.log(this.group, this.field);

  }

}
