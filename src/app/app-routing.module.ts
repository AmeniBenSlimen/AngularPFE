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
import { HabilitationEtRoleComponent } from './Habilitaion/habilitation-et-role/habilitation-et-role.component';
import { GestionModeleComponent } from './Modeles/gestion-modele/gestion-modele.component';
import { AddModeleComponent } from './Modeles/add-modele/add-modele.component';
import { ListModeleComponent } from './Modeles/list-modele/list-modele.component';
import { CorbeilleModeleComponent } from './Modeles/corbeille-modele/corbeille-modele.component';
import { UpdateModeleComponent } from './Modeles/update-modele/update-modele.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddVariableComponent } from './Modeles/Variable/add-variable/add-variable.component';
import { AddScoreComponent } from './Modeles/Score/add-score/add-score.component';
import { ListVariableComponent } from './Modeles/Variable/list-variable/list-variable.component';
import { ConsulterScoresVariableComponent } from './Modeles/Variable/consulter-scores-variable/consulter-scores-variable.component';
import { QuestionnaireComponent } from './Modeles/Score/questionnaire/questionnaire.component';
import { VariablesModeleComponent } from './Modeles/variables-modele/variables-modele.component';
import { ListeClientNotationComponent } from './Retail/Notaion/liste-client-notation/liste-client-notation.component';
import { ListeVariableModeleComponent } from './Retail/Notaion/liste-variable-modele/liste-variable-modele.component';
import { authGuard } from './auth.guard';
import { ConsulterNotationComponent } from './Notation/consulter-notation/consulter-notation.component';
import { NoterClientComponent } from './Notation/noter-client/noter-client.component';
import { ModifierNotationComponent } from './Notation/modifier-notation/modifier-notation.component';
import { UpdateNotationComponent } from './Notation/update-notation/update-notation.component';
import { UpdateProfileComponent } from './admin/update-profile/update-profile.component';
import { BodySettingsComponent } from './admin/body-settings/body-settings.component';
import { UpdataPwdComponent } from './admin/updata-pwd/updata-pwd.component';
import { CreditDecisionComponent } from './Credit/credit-decision/credit-decision.component';
import { LiClientNotationComponent } from './Notation/li-client-notation/li-client-notation.component';
import { NotationInProgressUpdateComponent } from './Notation/notation-in-progress-update/notation-in-progress-update.component';
import { DetailsNotationComponent } from './Notation/details-notation/details-notation.component';
import { ConsulterResultatCreditComponent } from './Client/consulter-resultat-credit/consulter-resultat-credit.component';
import { LesNotationClientComponent } from './Notation/les-notation-client/les-notation-client.component';


const routes: Routes = [  
  {
    path: 'admin',
    component: MenuDashboardComponent, 
    
    children: [
      { path: 'dashboard', component: BodyDashboardComponent },
      { path: 'users', component: AllUsersComponent,canActivate: [authGuard]},
      { path: 'permission/:id', component: PermissionComponent,canActivate: [authGuard] },
      { path: 'consulter-privilege', component: ListRolesComponent,canActivate: [authGuard]},
      { path: 'updateRole/:id', component: UpdateRoleComponent,canActivate: [authGuard]},
      { path: 'add-role', component: AddRoleComponent,canActivate: [authGuard]},
      { path: 'list-role-user/:id', component:RoleUserComponent,canActivate: [authGuard]},
      { path: 'list-users', component:ListUsersComponent,canActivate: [authGuard]},
      { path: 'update-user/:id', component:UpdateUserComponent,canActivate: [authGuard]},
      { path: 'list-modules', component:ListModuleComponent,canActivate: [authGuard]},
      { path: 'update-module/:cdModul', component:UpdateModuleComponent,canActivate: [authGuard]},
      { path: 'add-module', component:AddModuleComponent,canActivate: [authGuard]},
      { path: 'add-menu', component:AddMenuComponent, canActivate: [authGuard] },
      { path: 'list-menu', component:ListMenuComponent,canActivate: [authGuard]},
      { path: 'update-menu/:cdMenu', component:UpdateMenuComponent,canActivate: [authGuard]},
      { path: 'list-privilege', component:ListPrivilegeComponent,canActivate: [authGuard]},
      { path: 'privileges/:roleId', component: ListPrivilegeWithRoleComponent,canActivate: [authGuard] },
      { path: 'add-privilege', component: AddPrivilegeComponent,canActivate: [authGuard]},
      { path: 'update-privilege/:id', component: UpdatePrivilegeComponent,canActivate: [authGuard]},
      { path: 'list-client', component: ListClientComponent,canActivate: [authGuard]},
      { path: 'detail-client/:id', component: DetailClientComponent,canActivate: [authGuard]},
      { path: 'upload-csv', component: UploadCsvComponent,canActivate: [authGuard]},
      { path: 'module-retail', component: ModuleRetailComponent,canActivate: [authGuard]},
      { path: 'roles', component: RolesComponent,canActivate: [authGuard]},
      { path: 'update-client/:id', component: UpdateClientComponent,canActivate: [authGuard]},
      { path: 'Situation/upload-csv', component: UploadSituationCsvComponent,canActivate: [authGuard]},
      { path: 'Situation/consulterSituation', component: ListSituationComponent,canActivate: [authGuard]},
      { path: 'Situation/details-situation/:id', component: DetailsSituationComponent,canActivate: [authGuard]},
      { path: 'habilitation-et-role', component: HabilitationEtRoleComponent},
      { path: 'models',component: GestionModeleComponent,canActivate: [authGuard]},
      { path: 'Modele/add-modele',component: AddModeleComponent,canActivate: [authGuard]},
      { path: 'Modele/list-modele',component: ListModeleComponent,canActivate: [authGuard]},
      { path: 'Modele/corbeille-modele',component: CorbeilleModeleComponent,canActivate: [authGuard]},
      { path: 'Modele/update-modele/:id',component: UpdateModeleComponent,canActivate: [authGuard]},
      { path: 'Variable/add-variable/:modeleId', component: AddVariableComponent,canActivate: [authGuard]},
      { path: 'Score/add-score/:variableId', component: AddScoreComponent,canActivate: [authGuard]},
      { path: 'Variable/list-variable', component: ListVariableComponent,canActivate: [authGuard]},
      { path: 'Variable/ConsulterScoresVariable/:id', component: ConsulterScoresVariableComponent,canActivate: [authGuard]},
      { path: 'Modele/questionnaire', component: QuestionnaireComponent,canActivate: [authGuard]},
      { path: 'Modele/variables/:id', component:VariablesModeleComponent,canActivate: [authGuard]},
      
      { path: 'Retail/Notation/noter-client', component: NoterClientComponent ,canActivate: [authGuard]},
      { path: 'Retail/ListClient', component:ListeClientNotationComponent,canActivate: [authGuard]},
      { path: 'Retail/Notation/consulter-notation/:id', component: ConsulterNotationComponent,canActivate: [authGuard] },
      { path: 'Retail/Notation/consulter-notation', component: ConsulterNotationComponent ,canActivate: [authGuard]},
      { path: 'Retail/Notation/Notation/noter-client/:id', component: NoterClientComponent ,canActivate: [authGuard]},
      { path: 'Retail/Notation/modifier-notation', component: ModifierNotationComponent,canActivate: [authGuard] },
      { path: 'updateNotation/:id',component: UpdateNotationComponent,canActivate: [authGuard]},
      { path: 'Retail/Notation/list-clients', component: ListeClientNotationComponent ,canActivate: [authGuard]},
      { path: 'Retail/Notation/list-clients-notation', component: LiClientNotationComponent,canActivate: [authGuard] },
      { path: 'Retail/Notation/getNotationInProgress/:id', component: NotationInProgressUpdateComponent ,canActivate: [authGuard]},
      { path: 'Retail/Notation/DetailsNotation/:id', component: DetailsNotationComponent,canActivate: [authGuard]},
      { path: 'Retail/Notation/NotationClient/:clientId', component: LesNotationClientComponent},

      { path: 'update-profile', component: UpdateProfileComponent ,canActivate: [authGuard]},
      { path: 'settings', component: BodySettingsComponent,canActivate: [authGuard]},
      { path: 'update-pwd', component: UpdataPwdComponent,canActivate: [authGuard]},
      { path: 'credit-decision', component: CreditDecisionComponent }
    
    ]
  },
  {path: 'client',
    component: MenuDashboardComponent,
    
    children: [
      { path: ':clientId/DemandeStatus', component: ConsulterResultatCreditComponent }
    ]}
  ,
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//, canActivate: [authGuard] 