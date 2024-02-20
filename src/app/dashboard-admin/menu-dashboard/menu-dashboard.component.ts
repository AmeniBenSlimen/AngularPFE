import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.css']
})
export class MenuDashboardComponent implements OnInit{
  constructor(private authService : AuthService) {
  }
  showAdminBoard = false;
  AuthUserSub! : Subscription;
  ngOnInit(): void {
    
   }
  handleLogout() {
    this.authService.logout();
  }
 
}
