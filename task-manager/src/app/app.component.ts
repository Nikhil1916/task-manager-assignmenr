import { Component } from '@angular/core';
import { TokenStorage } from './core/token-storage';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private authS:AuthService, private router:Router) {}
  public TokenStorage = TokenStorage;
  title = 'task-manager';

  logout() {
    this.authS.logout();
    this.router.navigate(["/login"]);
  }
}
