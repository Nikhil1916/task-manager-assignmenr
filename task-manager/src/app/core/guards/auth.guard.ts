import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { TokenStorage } from '../token-storage';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean | UrlTree {
    return TokenStorage.isAuthed() ? true : this.router.parseUrl('/login');
  }
}
