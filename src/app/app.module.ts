import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderDashboardComponent } from './dashboard-admin/header-dashboard/header-dashboard.component';
import { MenuDashboardComponent } from './dashboard-admin/menu-dashboard/menu-dashboard.component';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { authInterceptorProvider } from './services/authinterceptor.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { AuthService } from './services/auth.service';
import { NgxPaginationModule} from 'ngx-pagination';
import { BodyDashboardComponent } from './dashboard-admin/body-dashboard/body-dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterPipe } from './filter.pipe';
import { PermissionComponent } from './admin/permission/permission.component';
import { ListRolesComponent } from './admin/list-roles/list-roles.component';
import { RouterModule } from '@angular/router';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListClientComponent } from './Retail/list-client/list-client.component';
import { DetailClientComponent } from './Retail/detail-client/detail-client.component';
import { UploadCsvComponent } from './Retail/upload-csv/upload-csv.component';
import { ModuleRetailComponent } from './Retail/module-retail/module-retail.component';
import { FooterComponent } from './dashboard-admin/footer/footer.component';
import { MenuComponent } from './dashboard-admin/menu/menu.component';
import { RolesComponent } from './admin/roles/roles.component';
import { UpdateClientComponent } from './Retail/update-client/update-client.component';
import { UploadSituationCsvComponent } from './Retail/Situation/upload-situation-csv/upload-situation-csv.component';
import { ListSituationComponent } from './Retail/Situation/list-situation/list-situation.component';
import { DetailsSituationComponent } from './Retail/Situation/details-situation/details-situation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderDashboardComponent,
    MenuDashboardComponent,
    LoginComponent,
    RegisterComponent,
    AllUsersComponent,
    FilterPipe,
    PermissionComponent,
    ListRolesComponent,
    UpdateRoleComponent,
    AddRoleComponent,
    RoleUserComponent,
    ListUsersComponent,
    UpdateUserComponent,
    ListModuleComponent,
    UpdateModuleComponent,
    AddModuleComponent,
    AddMenuComponent,
    ListMenuComponent,
    UpdateMenuComponent,
    ListPrivilegeComponent,
    ListPrivilegeWithRoleComponent,
    AddPrivilegeComponent,
    UpdatePrivilegeComponent,
    BodyDashboardComponent,
    ListClientComponent,
    DetailClientComponent,
    UploadCsvComponent,
    ModuleRetailComponent,
    FooterComponent,
    MenuComponent,
    RolesComponent,
    UpdateClientComponent,
    UploadSituationCsvComponent,
    ListSituationComponent,
    DetailsSituationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatDialogModule,
    RouterModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [authInterceptorProvider,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
