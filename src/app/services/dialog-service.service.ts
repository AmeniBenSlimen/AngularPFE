import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../admin/delete-user/delete-user.component';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(private dialog: MatDialog) { }
  openConfirmDialog(message: string): any {
    return this.dialog.open(DeleteUserComponent, {
      width: '400px',
      data: message
    });
  }
}
