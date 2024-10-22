import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modele } from 'src/app/models/modele';
import { ModeleService } from 'src/app/services/modele.service';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-list-modele',
  templateUrl: './list-modele.component.html',
  styleUrls: ['./list-modele.component.css'],
})
export class ListModeleComponent implements OnInit {
  modele: Modele[] = [];
  name: string = '';
  id?:number;
  annee?: number;
  p: number = 1;
  itemsPerPage: number = 10;
  totalUsers: any;
  searchtext: any;
  searched: boolean = false;
  codeRelation: any;
  exists: boolean = false;
  notExists: boolean = false;
  maDate: Date = new Date();

  constructor(private service: ModeleService,private router: Router,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadModeles();
  }

  loadModeles(): void {
    this.service.getModeles().subscribe({
        next: (modeles: Modele[]) => {
            this.modele = modeles;
            this.cdr.detectChanges(); // Force la détection des changements
        },
        error: (error) => {
            console.error('Erreur lors du chargement des modèles:', error);
        }
    });
}

  deleteModele(id: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous êtes sur le point de supprimer ce modèle!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, annuler!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteModele(id).subscribe({
          next: (res) => {
            Swal.fire('Supprimé!', 'Le modèle a été supprimé.', 'success');
            this.removeModeleFromList(id); 
          },
          error: (error) => {
            console.error('Erreur lors de la suppression de modèle :', error);
            Swal.fire(
              'Échec de la suppression!',
              'La suppression de modèle a échoué. ' + error.message,
              'error'
            );
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Annulé', 'La suppression a été annulée', 'error');
      }
    });
  }

  removeModeleFromList(id: number): void {
    this.modele = this.modele.filter(m => m.id !== id);
  }
  listeVariableModele(id:any):void {
    this.router.navigate(['/admin/Modele/variables',id]);
  }

  updateModele(id:any):void {
    this.router.navigate(['/admin/Modele/update-modele',id]);
  }
  addVariable(id:any):void {
    this.router.navigate(['/admin/Variable/add-variable',id]);
  }
  SearchByNameAndAnnee(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
  
    this.searched = true;
  
    this.service.SearchByNameAndAnnee(this.name,this.annee).subscribe({
      next: (data) => {
        this.exists = true;
        this.modele = data;
        this.notExists = this.modele.length === 0;
        if (this.notExists) {
          Swal.fire({
            icon: 'error',
            title: 'Aucun modèle trouvé',
            text: 'Veuillez essayer un autre Nom de Modèle.'
          });
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  toggleUsed(modele: Modele): void {
    if (!modele || modele.id === undefined) {
        console.error('Modèle invalide:', modele);
        return;
    }

    console.log('Valeur avant mise à jour:', modele.used);
    modele.used = !modele.used; // Inverse la valeur de used

    this.service.ModeleUsed(modele.id, modele.used).subscribe({
        next: (updatedModele: Modele) => {
            console.log('Réponse de l\'API:', updatedModele);
            const index = this.modele.findIndex(m => m.id === updatedModele.id);
            if (index !== -1) {
                this.modele[index] = updatedModele;
                this.cdr.detectChanges(); // Force la détection des changements
                console.log('Modèle mis à jour dans la liste:', updatedModele);
            } else {
                console.error('Modèle non trouvé dans la liste:', updatedModele);
            }
        },
        error: (error) => {
            console.error('Erreur lors de la mise à jour du modèle:', error);
        }
    });
}
}