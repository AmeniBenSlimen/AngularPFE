import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotationService } from 'src/app/services/notation.service';

@Component({
  selector: 'app-consulter-resultat-credit',
  templateUrl: './consulter-resultat-credit.component.html',
  styleUrls: ['./consulter-resultat-credit.component.css']
})
export class ConsulterResultatCreditComponent implements OnInit {
  clientId: number | null = null;
  progress: number = -1;

  constructor(
    private notationService: NotationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['clientId']) {
        this.clientId = +params['clientId'];
        this.getProgress();
      }
    });
  }

  getProgress(): void {
    if (this.clientId !== null) {
      this.notationService.getProgress(this.clientId).subscribe(
        (data: string) => {
          const matches = data.match(/\d+/); // Récupère les chiffres dans la chaîne
          this.progress = matches ? parseInt(matches[0], 10) : -1;
        },
        (error) => {
          console.error('Erreur lors de la récupération de la progression:', error);
          this.progress = -1;
        }
      );
    } else {
      console.warn('clientId est nul, impossible de récupérer la progression.');
    }
  }
}
