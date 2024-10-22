import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreditDecisionServiceService {

  private baseUrl = 'http://localhost:8085/bank/api/auth'

  constructor(private http: HttpClient) {}

  getDecision(score: number, creditHistoryGood: boolean, repaymentCapacityGood: boolean) {
    return this.http.post(`${this.baseUrl}/decision`, {
      score,
      creditHistoryGood,
      repaymentCapacityGood
    });
  }
}
