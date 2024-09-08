import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Modele } from 'src/app/models/modele';
import { ModeleService } from 'src/app/services/modele.service';
import { VariableService } from 'src/app/services/variable.service';
import { Variable } from 'src/app/models/variable'; // Ensure this path is correct

@Component({
  selector: 'app-liste-variable-modele',
  templateUrl: './liste-variable-modele.component.html',
  styleUrls: ['./liste-variable-modele.component.css']
})
export class ListeVariableModeleComponent implements OnInit {
  variables: Variable[] = []; 
  id: number | undefined;
  modele: Modele | undefined;

  constructor(
    private variableService: VariableService, 
    private router: Router,
    private modeleService: ModeleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    console.log('Modele ID:', this.id);

    if (this.id) {
      this.modeleService.getVariableId(this.id).subscribe({
        next: (res: Modele) => {
          this.modele = res;
          console.log('Modele:', this.modele);
        },
        error: (error) => {
          console.error('Error fetching modele with ID:', this.id, error);
        }
      });
      this.loadVariables(); 
    } else {
      console.error('Modele ID is not provided.');
    }
  }

  loadVariables(): void {
    if (this.id) {
      this.variableService.getVariablesModele(this.id) 
        .subscribe({
          next: (data: Variable[]) => {
            this.variables = data;
          },
          error: (error) => {
            console.error('Error fetching variables:', error);
          }
        });
    }
  }
}
