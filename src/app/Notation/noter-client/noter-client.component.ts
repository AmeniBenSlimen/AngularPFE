import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from 'src/app/models/response';
import { Type } from 'src/app/models/type.enum';
import { Variable } from 'src/app/models/variable';
import { VariableService } from 'src/app/services/variable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-noter-client',
  templateUrl: './noter-client.component.html',
  styleUrls: ['./noter-client.component.css']
})
export class NoterClientComponent implements OnInit{
  variables : Variable[] = [];
  totalModules:any;
  p: number = 1;
  itemsPerPage : number =5;
  searchtext:any;
  Type = Type;
  responses : Response[] = [];

  constructor(private route: ActivatedRoute, private service: VariableService, private router: Router) {}

  ngOnInit(): void {
    this.loadVariable();
  }

  loadVariable():void{
    this.service.getAllVariables().subscribe({
      next: (data)=>{
      this.variables=data;
      this.totalModules=data.length;
      this.responses = this.variables.map(variable => new Response(variable.id, ''));
    },
     error: (Error)=>{
      console.log(Error);
     }
  }
  )
  }

  getResponseByVariableId(variableId: any): any {
    console.log(this.responses);
    return this.responses.find(response => response.variableId === variableId);
  }
 

    submitResponse(): void {
      const incompleteResponses = this.responses.some(response => !response.response);

      if (incompleteResponses) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur!',
          text: 'Veuillez remplir toutes les réponses avant de soumettre le formulaire.',
          showConfirmButton: true
        });
        return; 
      }

      const response = { responses: this.responses, status: "DONE" };
      this.service.sendResponses(response).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: `Vous avez obtenu la note de : ${data.note}`,
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(["/admin/list-notation"]);
        },
        error: (error) => {
          console.error('Une erreur s\'est produite lors de la soumission de la réponse :', error);
        }
      });
    }

  submitResponseSave(): void {
    const response = { responses: this.responses, status: "IN_PROGRESS" };
    this.service.saveResponses(response).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Enregistré!',
          text: 'Les réponses ont été enregistrées avec succès.',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(["/admin/list-notation"]);
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de l\'enregistrement des réponses :', error);
      }
    });
  }
}
