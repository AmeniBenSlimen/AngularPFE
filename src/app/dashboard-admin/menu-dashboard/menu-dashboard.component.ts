import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { Privilege } from 'src/app/models/privilege';
import { Roles } from 'src/app/models/roles';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { PrivilegeService } from 'src/app/services/privilege.service';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.css']
})
export class MenuDashboardComponent implements OnInit {
  menus: any[] = [];
  user: User = new User();
  roles: Roles[] = [];
  showAdminBoard = false;
  AuthUserSub!: Subscription;
  privileges: Privilege[] = [];
  currentUser: User | null = null;
  username: string | undefined; 
  accessAdmin : boolean = false ;
  accessManager : boolean = false ;
  accessUser : boolean = false ;
  constructor(public authService: AuthService, private menuService: MenuService, private pservice: PrivilegeService, private router: Router, private tokenStorageService:TokenstorageService  ) {
    // Remplacez ici par le getter public
    /*this.authService.currentUser.subscribe((user: User | null) => {
      this.currentUser = user;
    });*/
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
  });
    this.usernameName();
    this.menuService.getModuls().subscribe({
      next: (data) => {
        this.menus = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  usernameName() {
    this.username = this.tokenStorageService.getUsername() ?? ''; 
  }
  
  handleLogout() {
    this.authService.logout();
  }

  isAdmin(): boolean {
    return this.authService.hasAccess({ cdRole: 'ROLE_ADMIN' });
  }

  isUser(): boolean {
    return this.authService.hasAccess({ cdRole: 'ROLE_USER' });
  }

  toggleMenu(menu: any) {
    menu.expanded = !menu.expanded;
  }

  openUpdateUserProfile() {
    this.router.navigate(['/update-profile']); // Ensure this matches your route configuration
  }
}