import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDashboardComponent } from './dashboard-admin/menu-dashboard/menu-dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BodyDashboardComponent } from './dashboard-admin/body-dashboard/body-dashboard.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { PermissionComponent } from './admin/permission/permission.component';
import { ListRolesComponent } from './admin/list-roles/list-roles.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { AddRoleComponent } from './admin/add-role/add-role.component';
import { DeleteRoleUserComponent } from './admin/delete-role-user/delete-role-user.component';
import { RoleUserComponent } from './admin/role-user/role-user.component';

const routes: Routes = [  
  {
    path: 'admin',
    component: MenuDashboardComponent,
    
    children: [
      { path: 'dashboard', component: BodyDashboardComponent },
      { path: 'users', component: AllUsersComponent },
      { path: 'permission/:id', component: PermissionComponent },
      { path: 'roles', component: ListRolesComponent},
      { path: 'updateRole/:id', component: UpdateRoleComponent},
      { path: 'add-role', component: AddRoleComponent},
      { path: 'delete-role-user', component:DeleteRoleUserComponent},
      { path: 'list-role-user/:id', component:RoleUserComponent}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
