import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent {
  role:Roles = new Roles() ;
  roleId:number = 0;

  constructor(private service:RoleService ,private sniper:ActivatedRoute, private router:Router){ }

  ngOnInit(): void {
    this.roleId = this.sniper.snapshot.params['id'];
    this.service.getRoleId(this.roleId).subscribe({
      next : (res) => {
        this.role = res;
      },
      error : (error) =>{
        console.error('error fetching product with id :' +this.roleId, error);
      }
    })
  }
  updateRole():void{
    this.service.updateRole(this.roleId,this.role).subscribe({
        next : (res) =>{
          this.router.navigate(['admin/roles']);
        },
        error : (error) => {
          console.error('error updating product with id : '+this.role);
        }
    });
}
}
