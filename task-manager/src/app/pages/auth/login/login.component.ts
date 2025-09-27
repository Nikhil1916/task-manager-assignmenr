import { Component, OnInit } from '@angular/core';
import { FormCreateService } from '../../../shared/services/form-create.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private formS:FormCreateService) {}
  fieldConfig = [
    {
      key: 'email',
      type: 'text',
      label: 'Email Address',
      tooltip: 'Enter a valid email',
      fieldClass: 'input',
      labelClass: 'label',
      validators: [
        { name: 'required' },
        {
          name: 'pattern',
          value: '^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$',
        },
      ],
    },
    {
      key: 'password',
      type: 'password',
      label: 'Password',
      tooltip: 'Enter a valid password',
      fieldClass: 'input',
      labelClass: 'label',
      validators: [
        { name: 'required' },
      ],
    },
  ];

  loginForm:any;
  loading = false;

  ngOnInit(): void {
      this.loginForm = this.formS.createForm(this.fieldConfig);
      console.log(this.loginForm);
  }
}
