import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit{
  users  : User[] = [];
constructor(private service:UserService){}

ngOnInit(): void {
  this.service.getUsers().subscribe({
    next: (data) =>{
      this.users = data ;
    },
    error : (Error) =>{
      console.log(Error);
    }
  });
}

}
