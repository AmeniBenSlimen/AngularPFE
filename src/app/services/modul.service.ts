import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modul } from '../models/modul';

@Injectable({
  providedIn: 'root'
})
export class ModulService {

  private BasicUrl ='http://localhost:8084/bank/api/auth/getAllModul';
  constructor(private http:HttpClient) { }
  public getModules(){
    return this.http.get<Modul[]>(`${this.BasicUrl}`);
  }
}
