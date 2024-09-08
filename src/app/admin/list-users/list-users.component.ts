import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateUserComponent } from '../update-user/update-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  users  : User[] = [];
  p: number = 1;
  itemsPerPage : number =10;
  totalUsers:any;
  searchtext:any;
constructor(private service:UserService,
            private router:Router){}

ngOnInit(): void {
  this.loadUser();
}
loadUser():void{
  this.service.getUsers().subscribe({
    next: (data) =>{
      this.users = data ;
      this.totalUsers=data.length;
    
    },
    error : (Error) =>{
      console.log(Error);
    }
  });
}
deleteUser(id: any): void {
  // Afficher un Sweet Alert pour demander confirmation
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "Vous êtes sur le point de supprimer cet utilisateur!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimez-le!',
    cancelButtonText: 'Non, annuler!'
  }).then((result) => {
    if (result.isConfirmed) {
      // Si l'utilisateur confirme, appeler le service de suppression
      this.service.deleteUser(id).subscribe({
        next: (res) => {
          Swal.fire(
            'Supprimé!',
            'L’utilisateur a été supprimé.',
            'success'
          );
          this.loadUser(); // Recharger la liste des utilisateurs
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de l’utilisateur :', error);
          Swal.fire(
            'Échec de la suppression!',
            'La suppression de l’utilisateur a échoué. ' + error.message,
            'error'
          );
        },
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Si l'utilisateur annule, afficher un message d'annulation
      Swal.fire(
        'Annulé',
        'La suppression a été annulée',
        'error'
      );
    }
  });
}
openUpdateUserForm(user: User): void {
  Swal.fire({
    title: 'Modifier Utilisateur',
    html:
      '<input id="swal-input1" style="font-size: 16px; font-family: serif" class="swal2-input" placeholder="Nom d\'utilisateur" value="' + user.username + '">' +
      '<input id="swal-input2" style="font-size: 16px; font-family: serif" class="swal2-input" placeholder="Nom complet" value="' + user.fullname + '">' +
      '<input id="swal-input3" style="font-size: 16px; font-family: serif" class="swal2-input" placeholder="Email" value="' + user.email + '">'+
      '<input id="swal-input4" style="font-size: 16px; font-family: serif" class="swal2-input" placeholder="Télèphone" value="' + user.phone + '">',

    showCancelButton: true,
    confirmButtonText: 'Modifier',
    cancelButtonText: 'Annuler',
    preConfirm: () => {
      const newUsername = (document.getElementById('swal-input1') as HTMLInputElement).value;
      const newFullname = (document.getElementById('swal-input2') as HTMLInputElement).value;
      const newEmail = (document.getElementById('swal-input3') as HTMLInputElement).value;
      const newPhone = (document.getElementById('swal-input4') as HTMLInputElement).value;

      if (newUsername && newFullname && newEmail && newPhone) {
        user.username = newUsername;
        user.fullname = newFullname;
        user.email = newEmail;
        user.phone = newPhone;

        this.service.updateUser(user.id, user).subscribe({
          next: updatedUser => {
            console.log('Utilisateur mis à jour avec succès :', updatedUser);
            Swal.fire('Succès', 'Utilisateur mis à jour avec succès!', 'success');
            this.loadUser(); 
          },
          error: error => {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
            Swal.fire('Erreur', 'Erreur lors de la mise à jour de l\'utilisateur', 'error');
          }
        });
      } else {
        Swal.fire('Erreur', 'Veuillez remplir tous les champs.', 'error');
      }
    }
  });
}

updateUser(id:any):void{
  this.router.navigate(['/update-user',id]);
}
toggleStatus(user: User) {
  const action = user.status ? 'désactiver' : 'activer'; // Détermine l'action en fonction du statut actuel

  Swal.fire({
    title: `Êtes-vous sûr de vouloir ${action} cet utilisateur ?`,
    text: `L'utilisateur sera ${action}é.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: `Oui, ${action} l'utilisateur`,
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      // Inverser le statut de l'utilisateur
      user.status = !user.status;

      // Appeler le service pour mettre à jour le statut de l'utilisateur
      this.service.updateUser(user.id, user).subscribe(
        (response) => {
          Swal.fire(
            `Utilisateur ${action}é!`,
            `L'utilisateur a été ${action}é avec succès.`,
            'success'
          );
          this.loadUser(); // Recharger la liste des utilisateurs après la mise à jour du statut
        },
        (error) => {
          console.error(`Erreur lors de la ${action}ation de l'utilisateur`, error);
          Swal.fire(
            `Erreur`,
            `Une erreur est survenue lors de la tentative de ${action}ation de l'utilisateur.`,
            'error'
          );
        }
      );
    }
  });
}



}
