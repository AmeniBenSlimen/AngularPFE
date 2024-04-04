import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { Modul } from 'src/app/models/modul';
import { Roles } from 'src/app/models/roles';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { ModulService } from 'src/app/services/modul.service';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.css']
})
export class MenuDashboardComponent implements OnInit{
  menus  : Menu[] = [];

  isMenuExpanded: boolean[] = [];

  constructor(public authService : AuthService,
              private service:MenuService) {
               


  }
  user: User = new User();
  roles  : Roles[] = [];
  showAdminBoard = false;
  AuthUserSub! : Subscription;
  ngOnInit(): void {
    this.service.getMenus().subscribe({
      next: (data) =>{
        this.menus = data;
            },
      error : (Error) =>{
        console.log(Error);
      }
    });
   }

  
  handleLogout() {
    this.authService.logout();
  }

}
