import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SituationClientRetail } from 'src/app/models/situation-client-retail';
import { SituationService } from 'src/app/services/situation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-situation',
  templateUrl: './list-situation.component.html',
  styleUrls: ['./list-situation.component.css']
})
export class ListSituationComponent implements OnInit {
  situation: SituationClientRetail[] = [];
  p: number = 1;
  itemsPerPage: number = 10;
  totalUsers: any;
  searchtext: any;
  searched: boolean = false;
  clientId: any;
  exists: boolean = false;
  notExists: boolean = false;

  constructor(private service: SituationService, private router: Router) {}

  ngOnInit(): void {
    this.loadSituation();
  }

  loadSituation(): void {
    this.service.getSituations().subscribe({
      next: (data) => {
        this.situation = data;
        this.totalUsers = data.length;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  SearchByClientId(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.searched = true;

    this.service.SearchByClientId(this.clientId).subscribe({
      next: (data) => {
        this.exists = true;
        this.situation = data;
        this.notExists = this.situation.length === 0;
        if (this.notExists) {
          Swal.fire({
            icon: 'error',
            title: 'Aucune Situation trouvée',
            text: 'Veuillez essayer un autre ID de client.'
          });
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
