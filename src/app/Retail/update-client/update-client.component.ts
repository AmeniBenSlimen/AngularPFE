import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientServiceService } from 'src/app/services/client-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit{
  client:Client = new Client() ;
  id: number = 0;

  constructor(private service:ClientServiceService ,private sniper:ActivatedRoute, private router:Router){ }

  ngOnInit(): void {
    this.id = this.sniper.snapshot.params['id'];
    this.service.getClientId(this.id).subscribe({
      next : (res) => {
        this.client = res;
      },
      error : (error) =>{
        console.error('error fetching client with code id :' +this.id, error);
      }
    })
  }
  updateClient(): void {
    this.service.updateClient(this.id, this.client).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Succès!',
          text: 'Client mis à jour avec succès!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['admin/list-client']);
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du client avec id : ' + this.id);
        Swal.fire({
          title: 'Erreur!',
          text: 'Erreur lors de la mise à jour du client!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}

