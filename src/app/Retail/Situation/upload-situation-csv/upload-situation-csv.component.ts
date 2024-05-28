import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SituationService } from 'src/app/services/situation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-situation-csv',
  templateUrl: './upload-situation-csv.component.html',
  styleUrls: ['./upload-situation-csv.component.css']
})
export class UploadSituationCsvComponent{

  selectedFile: File | undefined;

  constructor(private situationService: SituationService, private router: Router) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      console.error('Aucun fichier sélectionné.');
      return;
    }

    this.situationService.uploadSituations(this.selectedFile).subscribe(
      (numberOfClientsAdded) => {
        console.log('Fichier ajouté avec succès. Nombre de situation ajoutés :', numberOfClientsAdded);
        Swal.fire({
          title: 'Succès !',
          text: `Fichier ajouté avec succès.`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            //this.router.navigate(['/admin/list-client']);
          }
        });
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du fichier :', error);
        Swal.fire({
          title: 'Erreur !',
          text: 'Une erreur est survenue lors de l\'ajout du fichier.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }


}

