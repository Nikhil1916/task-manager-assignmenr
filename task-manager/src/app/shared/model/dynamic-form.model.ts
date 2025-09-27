export type FieldType =
  | 'text'
  | 'textarea'
  | 'checkbox'
  | 'radio'
  | 'amount'
  | 'label'
  | 'select'
  | 'array'
  | 'date'
  | 'selectv2';

// validator configuration
export interface ValidatorConfig {
  name:
    | 'required'
    | 'minlength'
    | 'maxlength'
    | 'pattern'
    | 'custom'
    | 'amountMin'
    | string;
  value?: any;
  message?: string;
}

// øptions for select radio and checkbox
export interface Option {
  label: string;
  value: string;
}

// core field configuration

export interface FieldConfig {
  key: string; // control ka naam
  type: FieldType; // field type
  label?: string; // field label
  tooltip?: string; // tooltip text
  cssClass?: string; // custom CSS classes
  defaultValue?: any; // initial value
  disabled?: boolean; // disable flag
  validators?: ValidatorConfig[]; // validation list
  options?: Option[]; // for select/radio/checkbox
  children?: FieldConfig[]; // for array/group fields,
  fieldClass?: string;
  functionBinders?: any;
  visibleIf?: {
    fieldKey: string; // jis field ki value check karni hai
    value: any; // agar us value se match ho to hi visible
  };
  hide?:boolean
}
