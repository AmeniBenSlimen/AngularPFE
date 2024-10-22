import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { Notation } from 'src/app/models/notation';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { ModeleService } from 'src/app/services/modele.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-li-client-notation',
  templateUrl: './li-client-notation.component.html',
  styleUrls: ['./li-client-notation.component.css']
})
export class LiClientNotationComponent implements OnInit {
  clients: Client[] = [];
  notations: Notation[] = [];
  p: number = 1;
  searchtext: any;
  itemsPerPage: number = 5;
  totalUsers: any;

  constructor(
    private clientService: ClientServiceService,
    private router: Router,
    private modeleService: ModeleService,
    private variableService: VariableService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  // Charger les clients avec leurs notations
  loadClients(): void {
    this.clientService.getClientWithScore().subscribe({
      next: (data) => {
        // Filtrer les clients qui ont des notations en cours
        this.clients = data.filter((client: Client) => 
          client.notations && client.notations.length > 0
        );
        this.totalUsers = this.clients.length;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  // Récupérer les notations en cours pour un client donné
  getNotationsInProgress(id: number): void {
    if (id) {
      this.variableService.getAllClientsWithNotationsInProgress(id).subscribe(
        (data: Notation[]) => {
          this.notations = data;
          // Naviguer vers les détails de la notation en cours
          this.router.navigate([`/admin/Retail/Notation/getNotationInProgress/${id}`]);
        },
        (error) => console.error('There was an error!', error)
      );
    } else {
      console.error('Invalid ID passed:', id);
    }
  } 
}
