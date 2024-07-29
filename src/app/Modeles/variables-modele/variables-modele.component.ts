import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Modele } from 'src/app/models/modele';
import { Variable } from 'src/app/models/variable';
import { ModeleService } from 'src/app/services/modele.service';

@Component({
  selector: 'app-variables-modele',
  templateUrl: './variables-modele.component.html',
  styleUrls: ['./variables-modele.component.css']
})
export class VariablesModeleComponent implements OnInit{
  modele: Modele | null = null;
  variables: Variable[] = [];
  id: number = 0;
  p: number = 1;
  itemsPerPage: number = 5;
  totalModules: any;
  searchtext: any;
  constructor(private service:ModeleService ,private sniper:ActivatedRoute, private router:Router){ }

  ngOnInit(): void {
    this.id = this.sniper.snapshot.params['id'];
    this.loadModele();
  }

  loadModele(): void {
    this.service.getModeleById(this.id).subscribe({
      next: (res) => {
        this.modele = res;
        this.variables = res.variables; 
      },
      error: (error) => {
        console.error('Error fetching Modele with id: ' + this.id, error);
      }
    });
  }
  addVariable(id:any):void {
    this.router.navigate(['/admin/Variable/add-variable',id]);
  }
  
}
