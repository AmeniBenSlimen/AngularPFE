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
import { RoleUserComponent } from './admin/role-user/role-user.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { ListModuleComponent } from './admin/Module/list-module/list-module.component';
import { UpdateModuleComponent } from './admin/Module/update-module/update-module.component';
import { AddModuleComponent } from './admin/Module/add-module/add-module.component';
import { AddMenuComponent } from './admin/Menu/add-menu/add-menu.component';
import { ListMenuComponent } from './admin/Menu/list-menu/list-menu.component';
import { UpdateMenuComponent } from './admin/Menu/update-menu/update-menu.component';
import { ListPrivilegeComponent } from './admin/privilege/list-privilege/list-privilege.component';
import { ListPrivilegeWithRoleComponent } from './admin/privilege/list-privilege-with-role/list-privilege-with-role.component';
import { AddPrivilegeComponent } from './admin/privilege/add-privilege/add-privilege.component';
import { UpdatePrivilegeComponent } from './admin/privilege/update-privilege/update-privilege.component';
import { ListClientComponent } from './Retail/list-client/list-client.component';
import { DetailClientComponent } from './Retail/detail-client/detail-client.component';
import { UploadCsvComponent } from './Retail/upload-csv/upload-csv.component';
import { ModuleRetailComponent } from './Retail/module-retail/module-retail.component';
import { RolesComponent } from './admin/roles/roles.component';
import { UpdateClientComponent } from './Retail/update-client/update-client.component';
import { UploadSituationCsvComponent } from './Retail/Situation/upload-situation-csv/upload-situation-csv.component';
import { ListSituationComponent } from './Retail/Situation/list-situation/list-situation.component';
import { DetailsSituationComponent } from './Retail/Situation/details-situation/details-situation.component';


const routes: Routes = [  
  {
    path: 'admin',
    component: MenuDashboardComponent,
    
    children: [
      { path: 'dashboard', component: BodyDashboardComponent },
      { path: 'users', component: AllUsersComponent },
      { path: 'permission/:id', component: PermissionComponent },
      { path: 'consulter-privilege', component: ListRolesComponent},
      { path: 'updateRole/:id', component: UpdateRoleComponent},
      { path: 'add-role', component: AddRoleComponent},
      { path: 'list-role-user/:id', component:RoleUserComponent},
      { path: 'list-users', component:ListUsersComponent},
      { path: 'update-user/:id', component:UpdateUserComponent},
      { path: 'list-modules', component:ListModuleComponent},
      { path: 'update-module/:cdModul', component:UpdateModuleComponent},
      { path: 'add-module', component:AddModuleComponent},
      { path: 'add-menu', component:AddMenuComponent},
      { path: 'list-menu', component:ListMenuComponent},
      { path: 'update-menu/:cdMenu', component:UpdateMenuComponent},
      { path: 'list-privilege', component:ListPrivilegeComponent},
      { path: 'privileges/:roleId', component: ListPrivilegeWithRoleComponent },
      { path: 'add-privilege', component: AddPrivilegeComponent},
      { path: 'update-privilege/:id', component: UpdatePrivilegeComponent},
      { path: 'list-client', component: ListClientComponent},
      { path: 'detail-client/:id', component: DetailClientComponent},
      { path: 'upload-csv', component: UploadCsvComponent},
      { path: 'module-retail', component: ModuleRetailComponent},
      { path: 'roles', component: RolesComponent},
      { path: 'update-client/:id', component: UpdateClientComponent},
      { path: 'Situation/upload-csv', component: UploadSituationCsvComponent},
      { path: 'Situation/consulterSituation', component: ListSituationComponent},
      { path: 'Situation/details-situation/:id', component: DetailsSituationComponent}
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
