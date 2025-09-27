import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';
import { TokenStorage } from '../token-storage';
import {tap} from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private base = `${environment.apiUrl}/auth`;
  constructor(private http:HttpClient) { }

  login(data:LoginRequest):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/login`, data).pipe(
      tap(res=>TokenStorage.set(res?.token))
    );
  }

  register(data:RegisterRequest):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/register`, data).pipe(
      tap(res=>TokenStorage.set(res?.token))
    )
  }

  logout() { TokenStorage.clear(); }
  isLoggedIn() { return TokenStorage.isAuthed(); }
}
