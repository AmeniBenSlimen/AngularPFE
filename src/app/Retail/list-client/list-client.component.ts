import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientServiceService } from 'src/app/services/client-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  clients  : Client[] = [];
  p: number = 1;
  itemsPerPage : number =10;
  totalUsers:any;
  searchtext:any;
constructor(private service:ClientServiceService,
            private router:Router){}

ngOnInit(): void {
  this.loadClient();
}
loadClient():void{
  this.service.getClients().subscribe({
    next: (data) =>{
      this.clients = data ;
      this.totalUsers=data.length;
    
    },
    error : (Error) =>{
      console.log(Error);
    }
  });
}
deleteClient(id: any): void {
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "Vous êtes sur le point de supprimer cet client!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimez-le!',
    cancelButtonText: 'Non, annuler!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.service.deleteClient(id).subscribe({
        next: (res) => {
          Swal.fire(
            'Supprimé!',
            'L’utilisateur a été supprimé.',
            'success'
          );
          this.loadClient(); 
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de client :', error);
          Swal.fire(
            'Échec de la suppression!',
            'La suppression de client a échoué. ' + error.message,
            'error'
          );
        },
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Annulé',
        'La suppression a été annulée',
        'error'
      );
    }
  });
}
detailClient(id:any):void{
  this.router.navigate(['/detail-client',id]);
}


}
