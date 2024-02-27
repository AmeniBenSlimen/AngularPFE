import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit{
  users  : User[] = [];
  p: number = 1;
  itemsPerPage : number =10;
  totalUsers:any;
  searchtext:any;
constructor(private service:UserService,
            private dialogService: DialogServiceService){}

ngOnInit(): void {

  this.service.getUsers().subscribe({
    next: (data) =>{
      this.users = data ;
      this.totalUsers=data.length;
    
    },
    error : (Error) =>{
      console.log(Error);
    }
  });
}

deleteUser(userId: number): void {
  const dialogRef = this.dialogService.openConfirmDialog('Are you sure you want to delete this user?');
  dialogRef.afterClosed().subscribe({
    next: (result:any) => {
    if (result) {
      console.log('User deleted successfully');
    }
   }
   }
    );
}
}
