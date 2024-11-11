import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Privilege } from 'src/app/models/privilege';
import { Roles } from 'src/app/models/roles';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { PrivilegeService } from 'src/app/services/privilege.service';
import { RoleService } from 'src/app/services/role.service';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  role : Roles = new Roles();
  menus: any[] = [];
  user: User = new User();
  roles: string[] = [];
  showAdminBoard = false;
  AuthUserSub!: Subscription;
  privileges : Privilege[]=[];
  accessAdmin : boolean = false ;
  accessManager : boolean = false ;
  accessUser : boolean = false ;

  constructor (private service:RoleService, private router:Router , public authService: AuthService, private menuService: MenuService,private pservice:PrivilegeService, private tokenStorageService:TokenstorageService){}
  ngOnInit(): void {
    this.roles = this.tokenStorageService.getRoless();
    this.accessAdmin = this.roles.includes('ROLE_ADMIN');
    this.accessManager = this.roles.includes('ROLE_MANAGER');
    this.accessUser = this.roles.includes('ROLE_USER');
  
    this.menuService.getModuls().subscribe({
      next: (data) => {
        this.menus = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
create():void{
  this.service.addRole(this.role).subscribe({
    next :(data) => {
      this.router.navigate(["/admin/roles"]);
    },
     error:(err) => {
      console.log(err);
    } 
  });
}


  
canAdminAccess()
{
  this.roles = this.tokenStorageService.getRoles() ;
  if(this.roles.includes('ROLE_ADMIN')){
        this.accessAdmin = true ;
  } else {
        // this.router.navigate(['home'])
  }
}


canManagerAccess()
{
  this.roles = this.tokenStorageService.getRoles() ;
  if(this.roles.includes('ROLE_MANAGER')){
        this.accessManager = true ;
  } else {
        // this.router.navigate(['home'])
  }
}

canUserAccess()
{
  this.roles = this.tokenStorageService.getRoles() ;
  if(this.roles.includes('ROLE_USER')){
        this.accessUser = true ;
  } else {
        // this.router.navigate(['home'])
  }
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
}
