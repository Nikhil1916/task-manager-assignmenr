// /to add validation of field on submit

import { Injectable } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FieldConfig, ValidatorConfig } from '../model/dynamic-form.model';

@Injectable({
  providedIn: 'root',
})
export class FormCreateService {
  constinue = {};
  save = {};
  constructor(private fb: FormBuilder) {}

  createForm(config: any): any {
    const group: { [key: string]: any } = {};
    config.forEach((field: any) => {
      group[field.key] = this.createControl(field);
    });
    return this.fb.group(group);
  }

  private createControl(field: FieldConfig): any {
    switch (field.type) {
      case 'array':
        const arr:FormArray = this.fb.array([]);
        if (field.children && field.children.length > 0) {
          arr.push(this.createArrayGroup(field.children));
        }
        return arr;
      case 'checkbox':
        if (!field?.options || field.options.length == 0) {
          return new FormControl(
            false,
            this.bindValidators(field?.validators || [])
          );
        }
        const checkBoxArray = this.fb.array(
          field?.options?.map((opt: any) =>
            this.fb.group({
              label: [opt?.label],
              value: [opt?.value],
              selected: [false],
            })
          ) || []
        );
        if (field.validators?.some((v) => v.name === 'required')) {
          checkBoxArray.setValidators(this.atLeastOneSelectedValidator());
          checkBoxArray.updateValueAndValidity();
        }
        return checkBoxArray;
      case 'label':
        return new FormControl({
          value: field.defaultValue || '',
          disabled: true,
        });
      default:
        return new FormControl(
          {
            value: field.defaultValue || null,
            disabled: field.disabled || false,
          },
          this.bindValidators(field.validators || [])
        );
    }
  }

  private bindValidators(validators: ValidatorConfig[]): any {
    if (!validators || validators?.length == 0) return null;

    const angularValidators = validators
      .map((v) => {
        switch (v.name) {
          case 'required':
            return Validators.required;
          case 'minlength':
            return Validators.minLength(v.value);
          case 'maxlength':
            return Validators.maxLength(v.value);
          case 'pattern':
            return Validators.pattern(v.value);
          case 'amountMin':
            return (control: FormControl) => {
              if (control.value != null && +control.value < v.value) {
                return { amountMin: true };
              }
              return null;
            };
          default:
            return null;
        }
      })
      .filter(Boolean);
    return angularValidators;
  }

  getControl(form: FormGroup, key: string): FormControl {
    return form.get(key) as FormControl;
  }

  getFormArray(form: FormGroup, key: string): FormArray {
    return form.get(key) as FormArray;
  }

  patchValue(form: FormGroup, values: any) {
    form.patchValue(values);
  }

  setValue(form: FormGroup, values: any) {
    form.setValue(values);
  }

  resetForm(form: FormGroup, values: any = {}) {
    form.reset(values);
  }

  getRawValue(form: FormGroup) {
    return form.getRawValue();
  }

  addFormArrayItem(formArray: FormArray, children: FieldConfig[]) {
    const group = {};
    children.forEach((child) => {});
  }

  private atLeastOneSelectedValidator(): any {
    return (control: any): { [key: string]: any } | null => {
      if (control instanceof FormArray) {
        const selected = control.controls.some(
          (ctrl) => ctrl.get('selected')?.value === true
        );
        // return selected ? null : { atLeastOneRequired: true };
        //updated error name to required from atLeastOneRequired to map values in en.json
        return selected ? null : { required: true };
      }
      return null;
    };
  }

  bindFunctionHandlers(fields: any[], context: any) {
    fields.forEach((field: any) => {
      if (field.type === 'selectv2' && field.functionBinders) {
        const fnName = field.functionBinders.onChange as keyof typeof context;
        const fn = context[fnName] as unknown as Function;
        if (typeof fn === 'function') {
          field.functionBinders.onChange = fn.bind(context);
        }
      }
    });
    return fields;
  }

  isFieldVisible(field: FieldConfig, form: FormGroup): boolean {
    if(field?.hide) return false;
    if (!field.visibleIf) return true;
    const depControl = form.get(field.visibleIf.fieldKey);
    if (!depControl) return true;
    return depControl.value === field.visibleIf.value;
  }

  createArrayGroup(children: FieldConfig[]):FormGroup {
    const group:any = {};
    children?.forEach((child:any)=>{
      group[child.key] = this.createControl(child);
    });
    return this.fb.group(group);
  }

}
