import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { Task, TaskStatus } from '../../../core/models/tasks.model';
import { ToastService } from '../../../core/services/toast.service';
import { SocketService } from '../../../core/services/socket.service';
import { every } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filtered: Task[] = [];
  statusFilter: TaskStatus | 'all' = 'all';
  loading = false;
  error = '';

  constructor(
    private tasksSvc: TaskService,
    private router: Router,
    private toastS: ToastService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.load();
    this.socketService.onTaskEvents().subscribe((evt: any) => {
      // console.log(evt);
      if (!evt) return;
      // console.log(evt, this.tasks);
      switch (evt.type) {
        case 'created':
          this.tasks = [evt.data, ...this.tasks];
          break;
        case 'updated': {
          const id = String(evt.data?._id ?? evt.data?.id);
          this.tasks = this.tasks.map((t) =>
            String(t._id ?? (t as any).id) === id ? evt.data : t
          );
          break;
        }
        case 'deleted': {
          const delId = String(evt.data?._id ?? evt.data?.id);
          this.tasks = this.tasks.filter(
            (t) => String(t._id ?? (t as any).id) !== delId
          );
          break;
        }
      }
      this.applyFilter();
    });
  }

  load() {
    this.loading = true;
    this.tasksSvc.getMyTasks().subscribe({
      next: (data: any) => {
        this.tasks = data?.tasks;
        this.applyFilter();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load tasks';
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }

  applyFilter() {
    this.filtered =
      this.statusFilter === 'all'
        ? this.tasks.slice() // 👈 new array ref for CD
        : this.tasks.filter((t) => t.status === this.statusFilter);
  }

  toggleStatus(t: Task) {
    const status: TaskStatus = t.status === 'pending' ? 'completed' : 'pending';
    this.tasksSvc.updateTask(t._id, { status }).subscribe({
      next: (u) => {
        t.status = u.status;
        this.applyFilter();
      },
      error: () => {},
    });
  }

  delete(t: Task) {
    if (!confirm('Delete this task?')) return;
    this.tasksSvc.deleteTask(t._id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((x) => x._id !== t._id);
        this.toastS.success('Task deleted');
        this.applyFilter();
      },
    });
  }

  newTask() {
    this.router.navigate(['/tasks/new']);
  }
  editTask(t: Task) {
    this.router.navigate(['/tasks', t._id, 'edit']);
  }
}
