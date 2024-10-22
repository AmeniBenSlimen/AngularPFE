import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { Variable } from 'src/app/models/variable';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { NotationService } from 'src/app/services/notation.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-modifier-notation',
  templateUrl: './modifier-notation.component.html',
  styleUrls: ['./modifier-notation.component.css']
})
export class ModifierNotationComponent implements OnInit {
  notations: any[] = [];
  variables: Variable[] = [];
  clients: Client[]=[];
  constructor(
    private variableService: VariableService,
    private notationService: NotationService,
    private clientService: ClientServiceService
  ) {}

  ngOnInit(): void {
    this.loadNotations();
    this.loadVariables();
    this.loadClients();
  }

  loadNotations(): void {
    this.variableService.getInProgress().subscribe(data => {
      this.notations = data;
      console.log(this.notations);
    });
  }
  loadClients(): void{
    this.clientService.getClients().subscribe(data =>{
      this.clients = data;
    })
  }

  loadVariables(): void {
    this.variableService.getAllVariables().subscribe(data => {
      this.variables = data;
    });
  }
}