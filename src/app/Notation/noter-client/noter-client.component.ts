import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from 'src/app/models/response'; 
import { Score } from 'src/app/models/score';
import { Type } from 'src/app/models/type.enum';
import { Variable } from 'src/app/models/variable'; 
import { VariableService } from 'src/app/services/variable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-noter-client',
  templateUrl: './noter-client.component.html',
  styleUrls: ['./noter-client.component.css']
})
export class NoterClientComponent  implements OnInit{
  variables: Variable[] = [];
  totalModules: any;
  p: number = 1;
  itemsPerPage: number = 5;
  searchtext: any;
  Type = Type;
  responses: Response[] = [];
  clientId?: number;
  currentIndex: number = 0; 
  note: number | undefined;
  constructor(private route: ActivatedRoute, private service: VariableService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clientId = +params['id'];
      this.loadVariable();
    });
  }

  loadVariable(): void {
    this.service.getAllVariablesId(this.clientId).subscribe({
      next: (data) => {
        this.variables = data;
        this.totalModules = data.length;
        this.responses = this.variables.map(variable => new Response(variable.id, variable.response));
      },
      error: (Error) => {
        console.log(Error);
      }
    });
  }

  getResponseByVariableId(variableId: any): Response {
    // Ensure that we return an initialized object if it doesn't exist
    let response = this.responses.find(response => response.variableId === variableId);
    
    if (!response) {
      // If no response is found for the given variable, initialize a default one
      response = new Response(variableId, '');  // Adjust the default value as needed
      this.responses.push(response);
    }
  
    return response;
  }
  

  getVariableById(variableId: number): Variable | undefined {
    return this.variables.find(variable => variable.id === variableId);
  }

  getScoresForVariable(variableId: number): Score[] | undefined {
    const variable = this.getVariableById(variableId);
    return variable ? variable.scores : [];
  }
  submitResponse(): void {
    if (this.clientId !== undefined) {
        const responsePayload = {
            responses: this.responses.map(response => ({
                variableId: response.variableId,
                response: response.response
            })),
            status: "DONE"
        };

        console.log('Payload envoyé au serveur:', responsePayload);

        this.service.finaliseNote(this.clientId, responsePayload).subscribe({
            next: (data) => {
                let appreciationMessage = '';
                let alertIcon: 'success' | 'warning' | 'error';

                switch(data.appreciation) {
                    case 'TRES_BON':
                        appreciationMessage = "Félicitations, vous avez une très bonne appréciation !";
                        alertIcon = 'success';
                        break;
                    case 'BON':
                        appreciationMessage = "Bonne appréciation, continuez ainsi !";
                        alertIcon = 'success';
                        break;
                    case 'MOYEN':
                        appreciationMessage = "Appréciation moyenne, des améliorations sont possibles.";
                        alertIcon = 'warning';
                        break;
                    case 'FAIBLE':
                        appreciationMessage = "Note faible, il est important de s'améliorer.";
                        alertIcon = 'warning';
                        break;
                    case 'TRES_FAIBLE':
                        appreciationMessage = "Très faible appréciation, des efforts importants sont nécessaires.";
                        alertIcon = 'error';
                        break;
                    default:
                        appreciationMessage = "Appréciation inconnue.";
                        alertIcon = 'error';
                        break;
                }

                Swal.fire({
                    title: 'Résultat de l\'appréciation',
                    html: `<strong>La note finale du client est :</strong> ${data.note}<br>${appreciationMessage}`,
                    icon: alertIcon,
                    confirmButtonText: 'OK',
                    customClass: {
                        popup: 'animated fadeInDown'
                    }
                });
            },
            error: (error) => {
                console.error("Erreur lors de la soumission :", error);
                console.error("Détails de l'erreur :", error.error);

                // Vérifiez si l'erreur est liée à un problème de client déjà en cours (ex. déjà une notation en cours)
                if (error.status === 409) { // Conflit: une notation est déjà en cours
                    Swal.fire({
                        title: "Erreur",
                        text: "Vous devez finaliser votre note en cours avant d'en affecter une nouvelle.",
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else {
                    // Erreur générique pour tout autre cas
                    Swal.fire({
                        title: "Erreur",
                        text: "Impossible de soumettre la réponse. Détails : " + (error.error || "Aucun détail fourni"),
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    } else {
        console.error("Client ID est indéfini.");
        Swal.fire("Erreur : L'ID du client est manquant.");
    }
}


  submitResponseSave(): any {
    if (this.clientId !== undefined) {
      const responsePayload = {
        responses: this.responses, 
        status: "IN_PROGRESS" 
      };

      this.service.sendResponses(this.clientId, responsePayload).subscribe({
        next: (data) => {
          Swal.fire("VOTRE NOTE EST SAUVEGARDER ");
        },
        error: (error) => {
          console.error("Erreur lors de la soumission :", error);
          Swal.fire("Erreur : Impossible de soumettre la réponse.");
        }
      });
    } else {
      console.error("Client ID est indéfini.");
      Swal.fire("Erreur : L'ID du client est manquant.");
    }
  }
  
}
