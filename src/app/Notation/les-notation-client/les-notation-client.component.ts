import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotationService } from 'src/app/services/notation.service';

@Component({
  selector: 'app-les-notation-client',
  templateUrl: './les-notation-client.component.html',
  styleUrls: ['./les-notation-client.component.css']
})
export class LesNotationClientComponent implements OnInit {
  clientId: number | null = null;
  notations: any[] = [];
  notationDetails: any;  

  constructor(private notationService: NotationService, private route: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clientId = params['clientId'] ? +params['clientId'] : null;
      console.log('Client ID récupéré :', this.clientId); // Vérifiez l'ID ici
  
      if (this.clientId !== null) {
        this.getNotationsByClientId(this.clientId);
      } else {
        console.error('ID de client non trouvé');
      }
    });
  }
  
  getNotationsByClientId(clientId: number): void {
    this.notationService.getNotationsByClientId(clientId).subscribe({
      next: (data) => {
        console.log('Données reçues pour le client :', data); // Ajoutez cette ligne
        this.notations = data;
        if (this.notations.length === 0) {
          console.log('Aucune notation trouvée pour ce client.');
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des notations du client :', error);
      }
    });
  }
  getNotationById(id: number): void {
    if (id) { // Vérifie que l'ID est défini
      this.notationService.getNotationById(id).subscribe({
        next: (data) => {
          this.notationDetails = data; // Enregistre les détails de la notation
          console.log('Détails de la notation récupérée:', this.notationDetails);
          // Ici, redirige vers la page des détails de la notation
          this.router.navigate([`/admin/Retail/Notation/DetailsNotation/${id}`]);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération de la notation par ID :', error);
        }
      });
    } else {
      console.error('ID de notation est undefined');
    }
  }
  
}