import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Variable } from 'src/app/models/variable';
import { NotationService } from 'src/app/services/notation.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-liste-notation-client',
  templateUrl: './liste-notation-client.component.html',
  styleUrls: ['./liste-notation-client.component.css']
})
export class ListeNotationClientComponent implements OnInit  {
  notations: any[] = [];
  variables: Variable[] = [];
  notationId:any;

  constructor(
    private variableService: VariableService,
    private notationService: NotationService,
    private router:Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadNotations();
    this.loadVariables();

  }

  loadNotations(): void {
    this.variableService.getInProgress().subscribe(data => {
      this.notations = data;
      console.log(this.notations);
    });
  }

  loadVariables(): void {
    this.variableService.getAllVariables().subscribe(data => {
      this.variables = data;
    });
  }

  ConsulterNotation(id:any):void{
    this.router.navigate(['/consulter-notation',id]);
  }


}
