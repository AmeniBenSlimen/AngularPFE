import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent {
  user: User = new User() ;
  userId:number = 0;
  roles  : Roles[] = [];
  selectedRoles: Roles[] = [];
  constructor(private service:UserService ,private sniper:ActivatedRoute, private router:Router){ }

  ngOnInit(): void {
    this.userId = this.sniper.snapshot.params['id'];
    this.service.getByUserId(this.userId).subscribe({
      next: (res) => {
        this.user = res;
        this.service.getRoles().subscribe({
          next: (data) => {
            this.roles = data;
          },
        });
      },
      error: (error) => {
        console.error('error fetching user with id :' + this.userId, error);
      }
    });
  }
  onRoleChange(role: Roles, isChecked: boolean) {
    if (isChecked) {
      // Vérifier si le rôle est déjà dans la liste des rôles sélectionnés
      const existingIndex = this.selectedRoles.findIndex(selectedRole => selectedRole.id === role.id);
      if (existingIndex === -1) {
        // Si le rôle n'est pas déjà sélectionné, l'ajouter à la liste
        this.selectedRoles.push(role);
      }
    } else {
      // Retirer le rôle de la liste des rôles sélectionnés s'il est décoché
      const index = this.selectedRoles.findIndex(selectedRole => selectedRole.id === role.id);
      if (index !== -1) {
        this.selectedRoles.splice(index, 1);
      }
    }
  }
  
  assignRoles() {
    this.service.assignRolesToUser(this.userId, this.selectedRoles).subscribe({
      next: () => {
        console.log('Roles assigned successfully.');
        this.selectedRoles = [];
      },
      error: (error) => {
        console.error('Error assigning roles:', error);
      }
    });
  }
  get isAdmin() {
    return this.user && this.user.roles && 
           (this.user.roles.some(role => role.cdRole === 'ROLE_ADMIN') || 
            this.user.roles.some(role => role.cdRole === 'ROLE_USER'));
  }
  
  
}
