import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SituationClientRetail } from 'src/app/models/situation-client-retail';
import { SituationService } from 'src/app/services/situation.service';

@Component({
    selector: 'app-details-situation',
    templateUrl: './details-situation.component.html',
    styleUrls: ['./details-situation.component.css']
})
export class DetailsSituationComponent implements OnInit {
  situationId?: number;
  situation?: SituationClientRetail;
    // Define the details to display
    situationDetails = [
        { label: 'Matricule', key: 'id' },
        { label: 'Date de Situation', key: 'dateDeSituation' },
        { label: 'Numéro de Compte Principal', key: 'numeroComptePrincipal' },
        { label: 'Montant En Consolidation', key: 'mntEnConsolidation' },
        { label: 'En Cours CT', key: 'encoursCT' },
        { label: 'En cours MT', key: 'encoursMT' },
        { label: 'En Cours Credit Tresorerie', key: 'encoursCreditTresorerie' },
        { label: 'Ratio Engagement CDR', key: 'ratioEngagementCDR' },
        { label: 'Consolidation Autres Banques', key: 'consolidationAutresBanques' },
        { label: 'Besoin Accompagnement', key: 'besoinAccompagnement' },
        { label: 'Besoin Financement', key: 'besoinFinancement' },
        { label: 'Ration Endettement', key: 'rationEndettement' },
        { label: 'Classe Banque Centrale', key: 'classeBanqueCentrale' },
        { label: 'Année Classification Centrale', key: 'anneeClassificationCentrale' },
        { label: 'Rating Actuelle Legacy', key: 'ratingActuelleLegacy' },
        { label: 'Classe Risque Legacy', key: 'classeRisqueLegacy' },
        { label: 'Score Client Legacy', key: 'scoreClientLegacy' },
        { label: 'Date Rating Legacy', key: 'dateRatingLegacy' },
        { label: 'Impaye', key: 'impaye' },
        { label: 'Montant Impayes', key: 'montantImpayes' },
        { label: 'Ratio Impayes Engagements', key: 'ratioImpayesEngagements' },
        { label: 'Anciennete Impayes', key: 'ancienneteImpayes' },
        { label: 'Code Materielite', key: 'codeMaterielite' },
        { label: 'Mouvements Totaux AnneeN', key: 'mouvementsTotauxAnneeN' },
        { label: 'Mouvements Totaux AnneeN1', key: 'mouvementsTotauxAnneeN1' },
        { label: 'Mouvement Creditieur AnneeN', key: 'mouvementCreditieurAnneeN' },
        { label: 'Mouvement Creditieur AnneeN1', key: 'mouvementCreditieurAnneeN1' },
        { label: 'Mouvement Debiteur AnneeN', key: 'mouvementDebiteurAnneeN' },
        { label: 'Mouvement Debiteur AnneeN1', key: 'mouvementDebiteurAnneeN1' },
        { label: 'Ratio Credit Solde Moyen', key: 'ratioCreditSoldeMoyen' },
        { label: 'Regularite Echeances', key: 'regulariteEcheances' },
        { label: 'Dernier Salaire YTD', key: 'dernierSalaireYTD' },
        { label: 'Solde Moyen Annuel AnneeN', key: 'soldeMoyenAnnuelAnneeN' },
        { label: 'Solde Moyen Annuel AnneeN1', key: 'soldeMoyenAnnuelAnneeN1' },
        { label: 'Total Creances GLE', key: 'totalCreancesGLE' },
        { label: 'Variation Annuelle Mouvement Credit N', key: 'variationAnnuelleMvtCreditN' },
        { label: 'Variation Annuelle Mouvement Credit N1', key: 'variationAnnuelleMvtCreditN1' },
        { label: 'Variation Mouvement Credit', key: 'variationMvtCredit' },
        { label: 'Ration Solde Moyen FC', key: 'rationSoldeMoyenFC' },
        { label: 'Iar Central Risques CDR', key: 'iarCentralRisquesCDR' },
        { label: 'Variation Engagement CDR', key: 'variationEngagementCDR' },
        { label: 'Montant Credit Tresorerie CDR', key: 'mntCreditTresorerieCDR' },
        { label: 'Variation Credit Treso CDR', key: 'variationCreditTresoCDR' },
        { label: 'Incident', key: 'incident' },
        { label: 'Modele Applicable', key: 'modeleApplicable' },
        { label: 'Autres Information', key: 'autresInformation' },
        { label: 'Commentaire', key: 'commentaire' },
        { label: 'Variable Libre 1', key: 'variableLibre1' },
        { label: 'Variable Libre 2', key: 'variableLibre2' },
        { label: 'Variable Libre 3', key: 'variableLibre3' },
        { label: 'Variable Libre 4', key: 'variableLibre4' },
        { label: 'Variable Libre 5', key: 'variableLibre5' },
        { label: 'Variable Libre 6', key: 'variableLibre6' },
        { label: 'Variable Libre 7', key: 'variableLibre7' }
    ];
    
    displayedFields: { label: string; key: string; }[] = [];
    currentPage = 0;
    fieldsPerPage = 5;

    constructor(private route: ActivatedRoute, private situationService: SituationService) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.situationId = +params['id'];
            this.loadSituation();
        });
    }

    private loadSituation(): void {
        if (this.situationId) {
            this.situationService.getSituationById(this.situationId).subscribe(
                situation => {
                    this.situation = situation;
                    this.updateDisplayedFields(); // Met à jour les champs affichés après le chargement de la situation
                },
                error => console.error('Error loading situation', error)
            );
        }
    }

    // Met à jour les champs affichés en fonction de la page actuelle
    updateDisplayedFields(): void {
        const start = this.currentPage * this.fieldsPerPage;
        const end = start + this.fieldsPerPage;
        this.displayedFields = this.situationDetails.slice(start, end);
    }

    // Naviguer à la page suivante
    nextPage(): void {
        if (this.currentPage < this.getMaxPage()) {
            this.currentPage++;
            this.updateDisplayedFields(); // Met à jour les champs affichés
        }
    }

    // Naviguer à la page précédente
    previousPage(): void {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.updateDisplayedFields(); // Met à jour les champs affichés
        }
    }

    // Calculer le nombre maximal de pages
    getMaxPage(): number {
        return Math.floor((this.situationDetails.length - 1) / this.fieldsPerPage); // -1 pour ajuster si on a un reste
    }

    // Obtenir la valeur d'un champ spécifique dans la situation
    getFieldValue(situation: SituationClientRetail | undefined, key: string): any {
        return situation ? situation[key as keyof SituationClientRetail] : '';
    }
}