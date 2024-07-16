import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Variable } from 'src/app/models/variable';
import { VariableService } from 'src/app/services/variable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-variable',
  templateUrl: './add-variable.component.html',
  styleUrls: ['./add-variable.component.css']
})
export class AddVariableComponent {

  variable: Variable = new Variable();

  constructor(private service: VariableService, private router: Router) {}

  ngOnInit(): void {}

  create(): void {
    this.service.addVariable(this.variable).subscribe({
      
      next: (data) => {
       
       
        this.router.navigate(['/admin/Score/add-score', data.id]);
        
      },
      error: (err) => {
        Swal.fire({
          icon: 'error', 
          text: 'Échec de l\'ajout d\'un variable vous devez utiliser un seule modèle !', 
        });
        console.log(err); 
      },
    });
  }
 
}
