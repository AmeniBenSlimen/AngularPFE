import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private BasicUrl ='http://localhost:8084/bank/api/auth/admin/dashboard';
  constructor(private http:HttpClient) { }
  public getMenus(){
    return this.http.get<Menu[]>(`${this.BasicUrl}`);
  }
}
