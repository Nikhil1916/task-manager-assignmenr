import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CreateTaskDto, Task, UpdateTaskDto } from '../models/tasks.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private base = `${environment.apiUrl}/tasks`;
  constructor(private http: HttpClient) {}

  getMyTasks(): Observable<Task[]> { return this.http.get<Task[]>(this.base) };

  createTask(dto:CreateTaskDto):Observable<Task>{return this.http.post<Task>(this.base, dto)};

  updateTask(id:string, dto:UpdateTaskDto): Observable<Task>{ return this.http.patch<Task>(`${this.base}/${id}`, dto) };

  deleteTask(id: string) { return this.http.delete<{message:string}>(`${this.base}/${id}`); }

}
