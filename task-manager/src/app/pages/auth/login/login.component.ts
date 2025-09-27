import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormCreateService } from '../../../shared/services/form-create.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(private formS:FormCreateService,
     private authS:AuthService,
     private router: Router,
     private toastS:ToastService
    ) {}
  fieldConfig = [
    {
      key: 'email',
      type: 'text',
      addType: 'email',
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
      // this.loginForm.t
      // console.log(this.loginForm);
  }

  ngAfterViewInit(): void {
    // Let the browser finish autofill, then tell Angular to re-check validity
        setTimeout(() => {
      this.loginForm.updateValueAndValidity({ emitEvent: true });
    });

  }

  submit() {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid) {
      this.toastS.error("Please fill all the details");
      return;
    }
    this.loading = true;
    this.authS.login(this.loginForm.value).subscribe({
      next:()=>{
        this.loading = false;
        this.toastS.success("Logged in successfully");
        this.router.navigate(['/tasks'])
      },
      error:(e)=>{
        this.loading = false;
        this.toastS.error(e?.error?.message);
      }
    })
    
  }
}
