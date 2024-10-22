import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DecisionResult } from 'src/app/models/decision-result';
import { CreditDecisionServiceService } from 'src/app/services/credit-decision-service.service';

@Component({
  selector: 'app-credit-decision',
  templateUrl: './credit-decision.component.html',
  styleUrls: ['./credit-decision.component.css']
})
export class CreditDecisionComponent implements OnInit {
  decision?: string;
  
  constructor(private creditDecisionService: CreditDecisionServiceService) {}
  ngOnInit(): void {
  }
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],  // Les mois, par exemple
    datasets: [
      {
        data: [85, 72, 78, 75, 77, 75],  // Exemples de scores
        label: 'Score Mensuel',
        fill: true,
        tension: 0.5,
        borderColor: 'rgba(0,123,255,0.7)',
        backgroundColor: 'rgba(0,123,255,0.3)'
      }
    ]
  };
  

  public lineChartLegend = true; 
  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Permet de ne pas maintenir l'aspect ratio
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };
  
}
