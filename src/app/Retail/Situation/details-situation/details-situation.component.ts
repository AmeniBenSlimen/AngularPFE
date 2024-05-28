import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SituationClientRetail } from 'src/app/models/situation-client-retail';
import { SituationService } from 'src/app/services/situation.service';

@Component({
  selector: 'app-details-situation',
  templateUrl: './details-situation.component.html',
  styleUrls: ['./details-situation.component.css']
})
export class DetailsSituationComponent implements OnInit{
  situationId: number | undefined;
  situation: SituationClientRetail | undefined;
  situations  : SituationClientRetail[] = [];


  constructor(private route: ActivatedRoute, private situationService:SituationService ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.situationId = +params['id']; 
      this.situationService.getSituationById(this.situationId).subscribe(situation => this.situation = situation);
    });
  }
}
