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
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    HeaderDashboardComponent,
    MenuDashboardComponent,
    LoginComponent,
    RegisterComponent,
    AllUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [authInterceptorProvider,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
