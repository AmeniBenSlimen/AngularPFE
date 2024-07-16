import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Score } from 'src/app/models/score';
import { Variable } from 'src/app/models/variable';
import { ScoreService } from 'src/app/services/score.service';
import { VariableService } from 'src/app/services/variable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulter-scores-variable',
  templateUrl: './consulter-scores-variable.component.html',
  styleUrls: ['./consulter-scores-variable.component.css']
})
export class ConsulterScoresVariableComponent implements OnInit {

  variable: Variable | undefined;

  constructor(
    private scoreService: ScoreService,
    private variableService: VariableService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadVariableWithScores(id);
    });
  }

  loadVariableWithScores(id: number): void {
    this.variableService.getVariableById(id).subscribe(
      (data: Variable) => {
        this.variable = data;
      },
      error => {
        console.error('Error loading variable details:', error);
        Swal.fire('Erreur', 'Erreur lors du chargement de la variable', 'error');
      }
    );
  }

  openUpdateForm(scoreId?: number): void {
    if (scoreId === undefined || !this.variable) {
      console.error('Score ID or variable is undefined');
      return;
    }

    this.variableService.getScoreById(scoreId).subscribe(
      (score: Score) => {
        Swal.fire({
          title: 'Modifier Score',
          html:
            `<input id="swal-input1" class="swal2-input" placeholder="Nouveau Score" value="${score.score}">` +
            `<input id="swal-input2" class="swal2-input" placeholder="Nouveau Choix" value="${score.valeur}">`,
          showCancelButton: true,
          confirmButtonText: 'Modifier',
          cancelButtonText: 'Annuler',
          preConfirm: () => {
            const newScore = (document.getElementById('swal-input1') as HTMLInputElement).value;
            const newChoice = (document.getElementById('swal-input2') as HTMLInputElement).value;

            score.score = parseFloat(newScore);
            score.valeur = newChoice;

            if (score.id) {
              this.updateScore(score.id, score);
            } else {
              console.error('Score ID is undefined');
            }
          }
        });
      },
      error => {
        console.error('Error fetching score details:', error);
        Swal.fire('Erreur', 'Erreur lors du chargement du score', 'error');
      }
    );
  }

  updateScore(scoreId: number, updatedScore: Score): void {
    this.scoreService.updateScore(scoreId, updatedScore).subscribe(
      updated => {
        console.log('Score mis à jour avec succès :', updated);
        if (this.variable && this.variable.id) {
          this.loadVariableWithScores(this.variable.id);
        } else {
          console.error('Variable ID is undefined or variable itself is not defined');
        }
        
        Swal.fire('Succès', 'Score mis à jour avec succès!', 'success');
      },
      error => {
        console.error('Erreur lors de la mise à jour du score :', error);
        Swal.fire('Erreur', 'Erreur lors de la mise à jour du score', 'error');
      }
    );
  }
  
  deleteScore(id: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous êtes sur le point de supprimer ce Choix!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, annuler!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.scoreService.deleteScore(id).subscribe({
          next: () => {
            Swal.fire('Supprimé!', 'Le Choix a été supprimé.', 'success');
            if (this.variable?.id) {
              this.loadVariableWithScores(this.variable.id);
            } else {
              console.error('Variable ID is undefined after score deletion');
            }
          },
          error: (error) => {
            console.error('Erreur lors de la suppression de Choix :', error);
            Swal.fire('Échec de la suppression!', 'La suppression de Choix a échoué. ' + error.message, 'error');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Annulé', 'La suppression a été annulée', 'error');
      }
    });
  }
  openUpdateVariableForm(): void {
    Swal.fire({
      title: 'Modifier Question',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nouvelle Description" value="' + this.variable?.description + '">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Nouveau Code" value="' + this.variable?.code + '">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Nouveau Coefficient" value="' + (this.variable && this.variable.coefficient !== undefined ? this.variable.coefficient.toString() : '') + '">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Nouveau Type" value="' + (this.variable && this.variable.type ? this.variable.type.toString() : '') + '">',

      showCancelButton: true,
      confirmButtonText: 'Modifier',
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        const newDescription = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const newCode = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const newCoefficient = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const newType = (document.getElementById('swal-input4') as HTMLInputElement).value;
          let parsedCoefficient = this.variable?.coefficient; 
        if (newCoefficient) {
          parsedCoefficient = parseFloat(newCoefficient);
          if (isNaN(parsedCoefficient)) {
            console.error('Nouveau coefficient invalide :', newCoefficient);
            parsedCoefficient = this.variable?.coefficient; 
          }
        }
          if (this.variable && newType) {
          this.variable.description = newDescription;
          this.variable.code = newCode;
          if (parsedCoefficient !== undefined) {
            this.variable.coefficient = parsedCoefficient;
          }
         
          this.variableService.updateVariable(this.variable.id, this.variable).subscribe(
            updated => {
              console.log('Variable mise à jour avec succès :', updated);
              Swal.fire('Succès', 'Question mise à jour avec succès!', 'success');
            },
            error => {
              console.error('Erreur lors de la mise à jour de la question :', error);
              Swal.fire('Erreur', 'Erreur lors de la mise à jour de la question', 'error');
            }
          );
        } else {
          console.error('Type de variable invalide :', newType);
        }
      }
    });
  }
}  