import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BasicUrl ='http://localhost:8083/clinique/api/auth/users';
  constructor(private http:HttpClient) { }
  public getUsers(){
    return this.http.get<User[]>(`${this.BasicUrl}`);
  }
}
