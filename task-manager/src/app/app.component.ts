import { Component, OnInit } from '@angular/core';
import { TokenStorage } from './core/token-storage';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { SocketService } from './core/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private authS:AuthService, private router:Router,
    private socketService: SocketService
  ) {}
  public TokenStorage = TokenStorage;
  title = 'task-manager';


  ngOnInit(): void {
        const token = TokenStorage.get();
        if (token) {
          this.socketService.connect(); // 🔁 reload ke baad bhi auto-connect
        }
  }

  logout() {
    this.authS.logout();
    this.socketService.disconnect();
    // this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
