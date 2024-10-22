import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent implements OnInit {
  clientId: number | undefined;
  client: Client | undefined;
  allFields: { label: string; key: string; }[] = [
    { label: 'Matricule', key: 'id' },
    { label: 'Code Relation', key: 'codeRelation' },
    { label: 'ID Nationalité', key: 'idNat' },
    { label: 'Code Relation Flexcube', key: 'codeRelationFlexcube' },
    { label: 'Nom', key: 'nom' },
    { label: 'Profession', key: 'profession' },
    { label: 'Nationalité', key: 'nationalite' },
    { label: 'Ville', key: 'ville' },
    { label: 'Région', key: 'region' },
    { label: 'Date de Naissance', key: 'dateNaissance' },
    { label: 'Date Début Relation', key: 'dateDebutRelation' },
    { label: 'Situation Familiale', key: 'situationFamiliale' },
    { label: 'Salaire Domicile', key: 'salaireDomicile' },
    { label: 'Date d\'embauche', key: 'dateEmbauche' },
    { label: 'new Profession Code', key: 'newProfessionCode' },
    { label: 'new Model UBCI', key: 'newModelUBCI' },
    { label: 'Autre', key: 'autre' }
  ];
  displayedFields: { label: string; key: string; }[] = [];
  currentPage = 0;
  fieldsPerPage = 5;

  constructor(private route: ActivatedRoute, private clientService: ClientServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clientId = +params['id'];
      this.clientService.getClientId(this.clientId).subscribe(client => this.client = client);
    });
    this.updateDisplayedFields();
  }

  updateDisplayedFields(): void {
    const start = this.currentPage * this.fieldsPerPage;
    const end = start + this.fieldsPerPage;
    this.displayedFields = this.allFields.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.getMaxPage()) {
      this.currentPage++;
      this.updateDisplayedFields();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplayedFields();
    }
  }

  getMaxPage(): number {
    return Math.floor(this.allFields.length / this.fieldsPerPage);
  }
  getFieldValue(client: Client | undefined, key: string): any {
    return client ? client[key as keyof Client] : '';
  }
  
}
