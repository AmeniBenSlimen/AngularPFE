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

  getAllNotations(): Observable<Notation[]> {
    return this.http.get<Notation[]>(this.apiUrl);
  }
  private Url = 'http://localhost:8085/bank/api/auth'; 

  getNotationById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8085/bank/api/auth/getNotationById/${id}`);
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

}
