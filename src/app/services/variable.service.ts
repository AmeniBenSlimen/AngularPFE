import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Variable } from '../models/variable';
import { Observable } from 'rxjs';
import { Score } from '../models/score';
import { Notation } from '../models/notation';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  private BasicUrl ='http://localhost:8085/bank/api/auth';
  constructor(private http:HttpClient) { }
  
  addVariable(variable:any,modeleId:any){
    return this.http.post<Variable>(`${this.BasicUrl}/addVariable/${modeleId}`,variable);
  } 
  public getAllVariables(){
    return this.http.get<Variable[]>(`${this.BasicUrl}/getAllVariables  `);
  }
  public getVariableById(id: number): Observable<any> {

    const url = `${this.BasicUrl}/getVariableScoreById/${id}`;
    return this.http.get<any>(url);
  }
  getScoreById(scoreId: number): Observable<Score> {
    const url = `${this.BasicUrl}/scores/${scoreId}`;
    return this.http.get<Score>(url);
  }
  updateVariable(id:any,variable:any){
    return this.http.put<Variable>(`${this.BasicUrl}/updataVariable/${id}`,variable);
 }
 deleteVariable(id:any){
  return this.http.delete<any>(`${this.BasicUrl}/deleteVariable/${id}`);
}
public getVariables(){
  return this.http.get<Variable[]>(`${this.BasicUrl}`);
}
valeurPonderer(variableId: number): Observable<Variable> {
  const url = `${this.BasicUrl}/ponderation/${variableId}`;
  return this.http.get<Variable>(url);
}
public getVariablesModele(id:any){
  return this.http.get<Variable[]>(`${this.BasicUrl}/VariableModele/${id}`);
}
public getTerminated(){
  return this.http.get<any>(`${this.BasicUrl}/done`);
}
public saveResponses(responses: any) {
  return this.http.post<any>(`${this.BasicUrl}/notation`, responses);
}
public sendResponses(clientId: number, responses: any): Observable<any> {
  return this.http.post<any>(`${this.BasicUrl}/notation/${clientId}`, responses);
}
public finaliseNote(clientId: number, responses: any): Observable<any> {
  return this.http.post<any>(`${this.BasicUrl}/finaliseNote/${clientId}`, responses);
}
public finaliseNoteProgress(clientId: number, responses: any): Observable<any> {
  return this.http.post<any>(`${this.BasicUrl}/Progress/${clientId}`, responses);
}
public getInProgress(){
  return this.http.get<any>(`${this.BasicUrl}/inProgress`);
}
public getAllVariableResponses(notationId:any){
  return this.http.get<any[]>(`${this.BasicUrl}/variableResponses/${notationId}`);
}
public updateResponses(responses: any){
  return this.http.put<any>(`${this.BasicUrl}/notation`,responses);
}
public getNotationById(id: number): Observable<any> {

  const url = `${this.BasicUrl}/variableResponses/${id}`;
  return this.http.get<any>(url);
}
public getAllVariablesId(clientId: any){
  return this.http.get<Variable[]>(`${this.BasicUrl}/getAllVariables/${clientId}`);
}
public finalizeNotation(notationId: number) {
  return this.http.put<any>(`${this.BasicUrl}/notation/${notationId}/finalize`, {});
}
getAllClientsWithNotationsInProgress(id: number): Observable<Notation[]> {
  return this.http.get<Notation[]>(`${this.BasicUrl}/getNotationById/${id}`);
}
}
