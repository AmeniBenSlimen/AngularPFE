import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NotationService } from 'src/app/services/notation.service';

@Component({
  selector: 'app-details-notation',
  templateUrl: './details-notation.component.html',
  styleUrls: ['./details-notation.component.css']
})
export class DetailsNotationComponent implements OnInit {
  notationDetails: any; // Déclare la propriété pour stocker les détails de la notation


  constructor(
    private notationService: NotationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la notation à partir des paramètres de la route
    const notationId = this.route.snapshot.paramMap.get('id'); // Assure-toi que l'ID est bien récupéré
    if (notationId) {
      this.getNotationById(+notationId); // Convertir en nombre
    }
  }

  getNotationById(id: number): void {
    this.notationService.getNotationById(id).subscribe({
      next: (data) => {
        this.notationDetails = data; // Assignation des détails de la notation
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la notation par ID :', error);
      }
    });
  }
  generatePDF() {
    const pdf = new jsPDF();
    const content = document.querySelector('.container');

    // Vérifie si le contenu existe et est un HTMLElement avant d'essayer de le convertir en image
    if (content instanceof HTMLElement) {
      html2canvas(content).then((canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190; // Largeur de l'image
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        position += heightLeft;

        pdf.save('details-notation.pdf');
      });
    } else {
      console.error('Le contenu à convertir en PDF n\'existe pas ou n\'est pas un élément HTML.');
    }
  }
}