import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'zone.js/lib/zone-impl';
import { FormCreateService } from '../../../shared/services/form-create.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
id: string | null = null;
  loading = false;
  error = '';
  initial?: Task;
  form:any;
  formConfig = [
    {
      key: 'title',
      type: 'text',
      tooltip: 'Enter a valid Title',
      fieldClass: 'input',
      labelClass: 'label',
      label:"title",
      validators: [
        { name: 'required' }
      ],
    },
     {
      label:"description",
      key: 'description',
      type: 'textarea',
      tooltip: 'Enter a valid description',
      fieldClass: 'input',
      labelClass: 'label',
      validators: [
        { name: 'required' }
      ],
    },
  ]

  constructor(
    private fb: FormCreateService,
    private tasksSvc: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private toastS:ToastService
  ) {}

  ngOnInit(): void {
    console.log(this.route);
    this.id = this.route.snapshot.paramMap.get('id');
    this.form = this.fb.createForm(this.formConfig);

  }

  submit() {
    if (this.form.invalid) {
      this.toastS.error("Please fill all the details");
      return;
    };
    this.loading = true;

    const dto = this.form.value as { title: string; description?: string };

    const obs = this.id
      ? this.tasksSvc.updateTask(this.id, dto)
      : this.tasksSvc.createTask(dto);

    obs.subscribe({
      next: () => {
        this.id ? this.toastS.success("Task Updated") : this.toastS.success("Task Created");
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Save failed';
        this.loading = false;
      },
      complete: () => (this.loading = false)
    });
  }
}
