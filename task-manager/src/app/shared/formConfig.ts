import { FieldConfig } from './model/dynamic-form.model';

export const SAMPLE_FORM_CONFIG: FieldConfig[] = [
  {
    key: 'fullName',
    type: 'text',
    label: 'Full Name',
    tooltip: 'Enter your complete name',
    cssClass: 'col-6',
    fieldClass: 'p-6',
    validators: [
      { name: 'required' },
      { name: 'minlength', value: 3 },
      { name: 'maxlength', value: 50 },
    ],
  },
  {
    key: 'email',
    type: 'text',
    label: 'Email Address',
    tooltip: 'Enter a valid email',
    cssClass: 'col-6',
    validators: [
      { name: 'required' },
      { name: 'pattern', value: '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$' },
    ],
  },
  {
    key: 'gender',
    type: 'radio',
    label: 'Gender',
    cssClass: 'col-6',
    options: [
      { label: 'Male', value: 'M' },
      { label: 'Female', value: 'F' },
    ],
    validators: [{ name: 'required' }],
  },
  {
    key: 'agecheck',
    type: 'checkbox',
    label: 'are you 18+?',
    // options: [
    //   {
    //      label:'Yes',
    //      value: 'true'
    //   },
    //   {
    //      label:'No',
    //      value: 'false'
    //   }
    // ],
    validators: [{ name: 'required' }],
  },
  {
    key: 'hobbies',
    type: 'checkbox',
    label: 'Hobbies',
    cssClass: 'col-6',
    options: [
      { label: 'Sports', value: 'sports' },
      { label: 'Music', value: 'music' },
      { label: 'Travel', value: 'travel' },
    ],
    validators: [{ name: 'required' }],
  },
  {
    key: 'address',
    type: 'textarea',
    label: 'Address',
    cssClass: 'col-12',
    validators: [{ name: 'required' }, { name: 'maxlength', value: 200 }],
  },
  {
    key: 'transactions',
    type: 'array',
    label: 'Transactions',
    cssClass: 'col-12',
    children: [
      {
        key: 'amount',
        type: 'amount',
        label: 'Amount',
        cssClass: 'col-6',
        validators: [
          { name: 'required' },
          { name: 'pattern', value: '^[0-9]+$' },
        ],
      },
      {
        key: 'date',
        type: 'date',
        label: 'Date',
        cssClass: 'col-6',
        validators: [{ name: 'required' }],
      },
    ],
  },
  {
    key: 'info',
    type: 'label',
    label: 'Note: Please verify your information before submitting.',
    cssClass: 'col-12',
  },
  {
    key: 'country',
    type: 'select',
    cssClass: 'col-6',
    label: 'Country',
    options: [
      { label: 'India', value: 'IN' },
      { label: 'USA', value: 'US' },
      { label: 'Germany', value: 'DE' },
    ],
    validators: [{ name: 'required' }],
  },
  {
    key: 'countryv2',
    type: 'selectv2',
    cssClass: 'col-6 p-6',
    label: 'Country',
    options: [
      { label: 'India', value: 'IN' },
      { label: 'USA', value: 'US' },
      { label: 'Germany', value: 'DE' },
    ],
    validators: [{ name: 'required' }],
    functionBinders: {
      onChange: 'onChange',
      onSearch: 'onSearch',
    },
    visibleIf: {
      fieldKey: 'gender',
      value: 'M',
    },
  },
  {
    key: 'date',
    type: 'date',
    label: 'Date',
    cssClass: 'col-6',
    validators: [{ name: 'required' }],
  },
  {
    key: 'addresses',
    type: 'array',
    label: 'Addresses',
    children: [
      {
        key: 'street',
        type: 'text',
        label: 'Street',
        validators: [{ name: 'required' }],
      },
      {
        key: 'city',
        type: 'text',
        label: 'City',
        validators: [{ name: 'required' }],
      },
      { key: 'zip', type: 'text', label: 'Zip Code' },
    ],
  },

  // {
  //   key: 'gender',
  //   type: 'radio',
  //   label: 'gender',
  //   options: [
  //     { label: 'Male', value: 'M' },
  //     { label: 'Female', value: 'F' },
  //     { label: 'Other', value: 'O' }
  //   ],
  //   validators: [
  //     { name: 'required', value: true }
  //   ]
  // }
];
