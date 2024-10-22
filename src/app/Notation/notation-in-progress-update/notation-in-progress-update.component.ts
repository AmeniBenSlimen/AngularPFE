import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Notation } from 'src/app/models/notation';
import { Response } from 'src/app/models/response';
import { Type } from 'src/app/models/type.enum';
import { Variable } from 'src/app/models/variable';
import { VariableService } from 'src/app/services/variable.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-notation-in-progress-update',
    templateUrl: './notation-in-progress-update.component.html',
    styleUrls: ['./notation-in-progress-update.component.css']
})
export class NotationInProgressUpdateComponent implements OnInit {
    notations: Notation[] = []; // Keep it as an array
    notationId!: number;
    responses : Response[] = [];
    variables: Variable[] = [];
    totalModules: any;
    p: number = 1;
    itemsPerPage: number = 5;
    searchtext: any;
    Type = Type;
    clientId?: number;
    currentIndex: number = 0;
    constructor(private variableService: VariableService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.notationId = +params['id']; // Get the notation ID from the route
                this.getNotationsInProgress(this.notationId);
            }
            if (params['clientId']) {
                this.clientId = +params['clientId']; // Récupère l'ID du client depuis la route
            }
        });
    }
    

    getNotationsInProgress(id: number): void {
        this.variableService.getAllClientsWithNotationsInProgress(id)
            .subscribe({
                next: (data) => {
                    this.notations = Array.isArray(data) ? data : [data]; // S'assurer que c'est un tableau
                    console.log('Notations:', this.notations);
    
                    // Assigner l'ID du client
                    if (this.notations.length > 0) {
                        this.clientId = this.notations[0].clientId; // Récupérer l'ID du client à partir de la première notation
                        console.log('Client ID:', this.clientId);
                    }
    
                    // Peupler les réponses à partir des notations
                    this.responses = this.notations.flatMap(notation => notation.responses || []);
                    console.log('Responses:', this.responses);
                },
                error: (err) => {
                    console.error('There was an error!', err);
                }
            });
    }
    
    
    
   /* submitResponse(): any {
        const response = {
            id: this.notationId,
            responses: this.notations.flatMap(notation =>
                notation.responses ?
                notation.responses.map(r => ({
                    variableId: r.variable ? r.variable.id : null, // Vérifie si variable existe
                    response: r.response || '' // Assure que la réponse n'est pas null
                })) : []
            ),
            status: "IN_PROGRESS" // À vérifier s'il est nécessaire
        };
    
        return this.variableService.updateResponses(response).subscribe({
            next: (data)=>{

                Swal.fire(
                  "note",
                  "est :"+ data.note
                );
          
              },
               error: (Error)=>{
                console.log(Error);
               }
            })
    }*/
            submitResponse(): void {
                if (this.clientId !== undefined) {
                    const responsePayload = {
                        responses: this.responses.map(response => ({
                            variableId: response.variable ? response.variable.id : null, // Vérifie si la variable existe
                            response: response.response || '' // Assure que la réponse n'est pas null
                        })), 
                        status: "DONE"
                    };
            
                    console.log('Payload envoyé au serveur:', responsePayload);
            
                    this.variableService.finaliseNote(this.clientId, responsePayload).subscribe({
                        next: (data) => {
                            Swal.fire("VOTRE NOTE EST : " + data.note);
                        },
                        error: (error) => {
                            console.error("Erreur lors de la soumission :", error);
                            console.error("Détails de l'erreur :", error.error); 
                            Swal.fire("Erreur : Impossible de soumettre la réponse. Détails : " + (error.error || "Aucun détail fourni"));
                        }
                    });
                } else {
                    console.error("Client ID est indéfini.");
                    Swal.fire("Erreur : L'ID du client est manquant.");
                }
            }
            
            
    
    
    
    
    
    
    
} 