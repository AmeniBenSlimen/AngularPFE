import { Component , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  template: `
    <h1 mat-dialog-title>Confirm</h1>
    <div mat-dialog-content>{{ data }}</div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </div>
  `,
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ){}
}
