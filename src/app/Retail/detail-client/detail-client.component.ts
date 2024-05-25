import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent implements OnInit{
  clientId: number | undefined;
  client: Client | undefined;

  constructor(private route: ActivatedRoute, private clientService:ClientServiceService ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clientId = +params['id']; 
      this.clientService.getClientId(this.clientId).subscribe(client => this.client = client);
    });
  }

}
