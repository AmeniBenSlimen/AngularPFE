import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notation } from '../models/notation';

@Injectable({
  providedIn: 'root'
})
export class NotationService {

  private apiUrl = 'http://localhost:8085/bank/api/auth/variables'; 

  constructor(private http: HttpClient) {}
  
  getTotalNotations(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8085/bank/api/auth/total-notations`);
  }
  getAllNotations(): Observable<Notation[]> {
    return this.http.get<Notation[]>(this.apiUrl);
  }
  private Url = 'http://localhost:8085/bank/api/auth'; 

  getNotationById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8085/bank/api/auth/getNotationById/${id}`);
  }
  getAppreciationData(): Observable<any> {
    return this.http.get<any>(`${this.Url}/appreciations`);
  }
  getClientData(): Observable<any> {
    return this.http.get<any>(`${this.Url}/ConsulterSituation`); 
  }
  getDebtRatio(encoursCT: number, encoursMT: number, encoursCreditTresorerie: number, mntEnConsolidation: number): Observable<number> {
    return this.http.get<number>(`${this.Url}/debt-ratio`, {
      params: {
        encoursCT: encoursCT.toString(),
        encoursMT: encoursMT.toString(),
        encoursCreditTresorerie: encoursCreditTresorerie.toString(),
        mntEnConsolidation: mntEnConsolidation.toString()
      }
    });
  }
  createNotation(notation: Notation, idClient: number): Observable<Notation> {
    const url = `${this.apiUrl}/notation/${idClient}`;
    return this.http.post<Notation>(url, notation);
  }
  

  updateNotation(notation: Notation): Observable<Notation> {
    return this.http.put<Notation>(`${this.apiUrl}/${notation.id}`, notation);
  }

  deleteNotation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getNotationsByStatus(status: string): Observable<Notation[]> {
    return this.http.get<Notation[]>(`${this.apiUrl}?status=${status}`);
  }
  getProgress(clientId: number): Observable<string> {
    return this.http.get(`${this.Url}/${clientId}/progress`, { responseType: 'text' });
}
getNotationsByClientId(clientId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.Url}/client/${clientId}`);
}
}
