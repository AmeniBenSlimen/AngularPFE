// add-score.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Score } from 'src/app/models/score';
import { ScoreService } from 'src/app/services/score.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-score',
  templateUrl: './add-score.component.html',
  styleUrls: ['./add-score.component.css']
})
export class AddScoreComponent implements OnInit {
  score: Score = new Score();
  variableId ?: number;

  constructor(private route: ActivatedRoute, private service: ScoreService, private router: Router) {}

  ngOnInit(): void {
    this.variableId = +this.route.snapshot.paramMap.get('id')!;
    this.score.variableId = this.variableId;

  }
  resetForm(): void {
    this.score = new Score();
    this.score.variableId = this.variableId;
  }
  create(): void {
    console.log("Creating score with:", this.score); 
    this.service.addScore(this.score).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Score ajouté avec succès !',
        }).then(() => {
          this.resetForm();
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          text: 'Échec de l\'ajout du score !',
        });
        console.log(err);
      },
    });
  }
  
}
