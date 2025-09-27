import { Component, Input, OnInit } from '@angular/core';
import { FormCreateService } from '../services/form-create.service';
import { FieldConfig } from '../model/dynamic-form.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rubicon',
  templateUrl: './rubicon.component.html',
  styleUrl: './rubicon.component.css'
})
export class RubiconComponent implements OnInit {
 @Input() fields!:any;
 @Input() group!:any;
 @Input() slug!:string;
 @Input() parentClass!:string;
 constructor(public formService:FormCreateService) {}
ngOnInit(): void {
  // console.log(this.fields, this.group, this.slug)
    // this.fields = [
    //   {
    //     key: 'fullName',
    //     type: 'text',
    //     label: 'Full Name',
    //     tooltip: 'Enter your complete name',
    //     cssClass: 'p-6',
    //     fieldClass: 'mr-6',
    //     validators: [
    //       { name: 'required' },
    //       { name: 'minlength', value: 3 },
    //       { name: 'maxlength', value: 10 },
    //     ],
    //   },
    // ];
    // this.slug = 'rubicon-test'; 
    // this.group = this.formS.createForm(this.fields);
}

submit() {
  // console.log(this.group.value, this.group);
}

}
