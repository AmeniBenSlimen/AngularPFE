import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { ModeleService } from 'src/app/services/modele.service';
import { Modele } from 'src/app/models/modele'; // Import the Modele model

@Component({
  selector: 'app-liste-client-notation',
  templateUrl: './liste-client-notation.component.html',
  styleUrls: ['./liste-client-notation.component.css']
})
export class ListeClientNotationComponent implements OnInit {
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

  navigateToModele(clientId: number): void {
    this.modeleService.getModeleUsed().subscribe({
      next: (modeles: Modele[]) => {
        const modele = modeles.find((m: Modele) => m.used === true);
        if (modele) {
          this.router.navigate(['/admin/Retail/ListeVariableModele', modele.id]);
        } else {
          console.error('No modele with used=true found');
        }
      },
      error: (error) => {
        console.error('Error fetching modeles used:', error);
      }
    });
  }
}
