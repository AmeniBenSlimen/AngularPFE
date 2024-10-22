import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotationService } from 'src/app/services/notation.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-consulter-notation',
  templateUrl: './consulter-notation.component.html',
  styleUrls: ['./consulter-notation.component.css']
})
export class ConsulterNotationComponent implements OnInit{
  notationsFinalisees: any[] = []; 
  notationId:any;
  notationsFinaliseesById: any[] = [];
  activeNotations: { [key: number]: boolean } = {};
  notationDetails: any;  
  constructor(private service: VariableService,
    private notationService: NotationService,
    private router:Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.notationId = params['id'];
    });
    this.loadNotationsFinalisees(); 
    this.route.params.subscribe(params => {
      const notationId = params['id']; // Récupérer l'ID de la notation à partir des paramètres de route
      this.getNotationById(notationId); // Appeler la méthode pour récupérer les détails
    });
}


loadNotationsFinalisees(): void {
  this.service.getTerminated().subscribe({
      next: (data) => {
          console.log('Notations finalisées:', data); 
          this.notationsFinalisees = data;
      },
      error: (error) => {
          console.error('Erreur lors du chargement des notations finalisées :', error);
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


  loadNotationsFinaliseesById(): void {
    this.service.getNotationById(this.notationId).subscribe({
      next: (data) => {
        this.notationsFinaliseesById = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des notations finalisées :', error);
      }
    });
  }
   
}
