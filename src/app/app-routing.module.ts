import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuDashboardComponent } from './dashboard-admin/menu-dashboard/menu-dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BodyDashboardComponent } from './dashboard-admin/body-dashboard/body-dashboard.component';

const routes: Routes = [  
{path:'admin',component:MenuDashboardComponent , children:[
{path:'dashboard' , component: BodyDashboardComponent}

] },
{path:'login',component:LoginComponent},
{path:'register',component:RegisterComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
