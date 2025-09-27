import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormCreateService } from '../services/form-create.service';
import { SAMPLE_FORM_CONFIG } from '../formConfig';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-check',
  templateUrl: './form-check.component.html',
  styleUrl: './form-check.component.css'
})
export class FormCheckComponent implements OnInit {
  constructor(private formGenerate:FormCreateService) {}
  myForm!:FormGroup;
  ngOnInit(): void {
    const config = {

    }
      this.myForm = this.formGenerate.createForm(SAMPLE_FORM_CONFIG)
  }

  onSubmit(val:any) {
    console.log(this.myForm);
    console.log(val);
    console.log(this.formGenerate.getRawValue(this.myForm));
  }

  onHobbyChange(event:any) {

  }

get hobbies(): FormArray {
  return this.myForm.get('hobbies') as FormArray;
}

get ageCheck(): FormArray {
  return this.myForm.get('agecheck') as FormArray;
}
}
