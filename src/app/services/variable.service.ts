import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Variable } from '../models/variable';
import { Observable } from 'rxjs';
import { Score } from '../models/score';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  private BasicUrl ='http://localhost:8082/bank/api/auth';
  constructor(private http:HttpClient) { }
  
  addVariable(variable:any){
    return this.http.post<Variable>(`${this.BasicUrl}/addVariable`,variable);
  } 
  public getAllVariables(){
    return this.http.get<Variable[]>(`${this.BasicUrl}/getAllVariables  `);
  }
  public getVariableById(id: number): Observable<any> {

    const url = `${this.BasicUrl}/getVariableById/${id}`;
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

}