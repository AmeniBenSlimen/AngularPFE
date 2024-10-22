import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { Modele } from 'src/app/models/modele';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { ModeleService } from 'src/app/services/modele.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {
  clients: Client[] = [];
  p: number = 1;
  itemsPerPage: number = 10;
  totalUsers: any;
  searchtext: any;
  searched: boolean = false;
  codeRelation: any;
  exists: boolean = false;
  notExists: boolean = false;

  constructor(
    private clientService: ClientServiceService,
    private router: Router,
    private modeleService: ModeleService // Inject the service
  ) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.totalUsers = data.length;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  navigateToNotationClient(clientId: number): void {
    this.clientService.getClientId(clientId).subscribe({
      next: (client: Client) => {
        if (client) {
          this.router.navigate(['/admin/Retail/Notation/Notation/noter-client', client.id]);
        } else {
          console.error('Client not found');
        }
      },
      error: (error) => {
        console.error('Error fetching client:', error);
      }
    });
  }
  
}
