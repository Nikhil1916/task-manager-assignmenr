import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { TaskListComponent } from './pages/tasks/task-list/task-list.component';
import { TaskFormComponent } from './pages/tasks/task-form/task-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: TaskListComponent },
      { path: 'new', component: TaskFormComponent },
      { path: ':id/edit', component: TaskFormComponent },
    ],
  },
  { path: '**', redirectTo: 'tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
