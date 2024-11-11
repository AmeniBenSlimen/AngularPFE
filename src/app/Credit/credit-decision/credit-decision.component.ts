import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { NotationService } from 'src/app/services/notation.service';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-credit-decision',
  templateUrl: './credit-decision.component.html',
  styleUrls: ['./credit-decision.component.css']
})
export class CreditDecisionComponent implements OnInit {
  public barChartLabels: string[] = ['TRES_BON', 'BON', 'MOYEN', 'FAIBLE', 'TRES_FAIBLE'];
  public debtRatio: number = 0;
  public barChartData: ChartData<'bar', number[], string> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [],
        label: 'Nombre de clients',
        backgroundColor: '#42A5F5',
        hoverBackgroundColor: '#1E88E5'
      }
    ]
  };

  public barChartType: 'bar' = 'bar'; 
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Appréciations',
          color: '#333',
          font: {
            size: 16,
            weight: 'bold',
          }
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Nombre de clients',
          color: '#333',
          font: {
            size: 16,
            weight: 'bold',
          }
        },
        grid: {
          color: '#e0e0e0',
        },
        beginAtZero: true,
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          }
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#fff',
        font: {
          weight: 'bold'
        },
        formatter: (value: number) => {
          return value > 0 ? value : '';
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutBounce'
    }
  };

  constructor(private statistiquesService: NotationService) {}

  ngOnInit(): void {
    this.statistiquesService.getAppreciationData().subscribe((data: any) => {
      this.barChartData.datasets[0].data = [
        data.TRES_BON || 0,
        data.BON || 0,
        data.MOYEN || 0,
        data.FAIBLE || 0,
        data.TRES_FAIBLE || 0
      ];
    });
    this.getClientDataAndCalculateDebtRatio();
    }

    getClientDataAndCalculateDebtRatio() {
      this.statistiquesService.getClientData().subscribe(
        (clientData) => {
          console.log('Données du client:', clientData); // Vérifiez les données reçues
          
          // Accédez aux données du premier client
          const client = clientData[0];
          const encoursCT = client.encoursCT;
          const encoursMT = client.encoursMT;
          const encoursCreditTresorerie = client.encoursCreditTresorerie;
          const mntEnConsolidation = client.mntEnConsolidation;
    
          this.calculateDebtRatio(encoursCT, encoursMT, encoursCreditTresorerie, mntEnConsolidation);
        },
        (error) => {
          console.error('Erreur lors de la récupération des données du client:', error);
        }
      );
    }
    

  
calculateDebtRatio(encoursCT: number, encoursMT: number, encoursCreditTresorerie: number, mntEnConsolidation: number) {
  this.statistiquesService.getDebtRatio(encoursCT, encoursMT, encoursCreditTresorerie, mntEnConsolidation).subscribe(
    (ratio) => {
      console.log('Résultat du ratio d\'endettement:', ratio); // Loguer le ratio retourné
      this.debtRatio = ratio;
    },
    (error) => {
      console.error('Erreur lors de l\'appel à l\'API:', error);
    }
  );
}
/* const encoursCT = parseFloat(client.encoursCT);
const encoursMT = parseFloat(client.encoursMT);
const encoursCreditTresorerie = parseFloat(client.encoursCreditTresorerie);
const mntEnConsolidation = parseFloat(client.mntEnConsolidation);

public double calculateTotalDebtRatio(double encoursCT, double encoursMT,
  double encoursCreditTresorerie, double mntEnConsolidation) {
double totalEncours = encoursCT + encoursMT + encoursCreditTresorerie;
System.out.println("Total Encours: " + totalEncours);
System.out.println("Montant En Consolidation: " + mntEnConsolidation);

if (mntEnConsolidation == 0) {
return 0; // Eviter la division par zéro
}

return totalEncours / mntEnConsolidation;
} */


}
