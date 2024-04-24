import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { Roles } from 'src/app/models/roles';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.css']
})
export class MenuDashboardComponent implements OnInit {
  menus: Menu[] = [];
  user: User = new User();
  roles: Roles[] = [];
  showAdminBoard = false;
  AuthUserSub!: Subscription;

  constructor(public authService: AuthService, private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenus().subscribe({
      next: (data) => {
        this.menus = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  handleLogout() {
    this.authService.logout();
  }
}
