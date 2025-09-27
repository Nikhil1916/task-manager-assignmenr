import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
})
export class CheckboxComponent implements OnInit {
  @Input() field!: any;
  @Input() group!: FormGroup;
  @Input() slug: any;
  constructor(private translateS: TranslationService) {}

  ngOnInit(): void {
    console.log(this.group, this.field);
  }

  isInvalid() {
    const control = this.group.get(this.field.key);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getLabel() {
    return this.translateS.getLabel(this.slug, this.field.key);
  }

  getErrors() {
    const control = this.group.get(this.field.key);
    if (!control) return [];
    return Object.keys(control.errors || {}).map((errK: any) => {
      return this.translateS.getError(
        this.slug,
        this.field.key,
        errK,
        this.field.validators?.find((v: any) => v.name == errK)?.value
      );
    });
  }

  isInvalidArray() {
    const arr = this.formArray;
    // console.log(arr);
    return !!(arr && arr.invalid && (arr.dirty || arr.touched));
  }

  get formArray() {
    return this.group.get(this.field.key) as FormArray;
  }

  // Called on change only to trigger validations/state updates — DO NOT flip value here
  onCheckboxChange(index: number) {
    const arr = this.formArray;
    if (!arr) return;
    const selectedCtrl = arr.at(index).get('selected') as FormControl;
    // don't toggle value manually; just mark touched/dirty and re-run validators
    selectedCtrl.markAsTouched();
    selectedCtrl.markAsDirty();
    arr.markAsDirty();
    arr.updateValueAndValidity();
  }
}
