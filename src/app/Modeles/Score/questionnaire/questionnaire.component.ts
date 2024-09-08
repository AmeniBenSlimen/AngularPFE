import { Component, OnInit } from '@angular/core';
import { Variable } from 'src/app/models/variable';
import { ScoreService } from 'src/app/services/score.service';
import { NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  variables: Variable[] = [];
  selectedValues: { [key: string]: string } = {};
  finalScore: number | null = null;

  constructor(private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.loadVariables();
  }

  loadVariables(): void {
    this.scoreService.getAllVariables().subscribe(
      (variables: Variable[]) => {
        this.variables = variables;
        this.variables.forEach(variable => {
          // Initialize selectedValues with empty strings
          this.selectedValues[variable.id!.toString()] = '';
        });
      },
      error => {
        console.error('Failed to load variables:', error);
      }
    );
  }

  calculateFinalScore(): void {
    if (this.variables.length === 0) {
      console.error('Variables are not loaded yet.');
      return;
    }

    for (let variable of this.variables) {
      if (!this.selectedValues[variable.id!.toString()]) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: `Veuillez sélectionner une réponse pour la question: ${variable.description}`,
          confirmButtonText: 'OK'
        });
        return;
      }
    }

    this.finalScore = 0;
    this.variables.forEach(variable => {
      const selectedValue = this.selectedValues[variable.id!.toString()];
      const score = variable.scores.find(s => s.valeur === selectedValue);
      if (score && variable.coefficient !== undefined && score.score !== undefined) {
        this.finalScore! += score.score * variable.coefficient;
      }
    });

    Swal.fire({
      title: `Le score final est : ${this.finalScore}`,
      confirmButtonText: 'OK'
    });
  }
}