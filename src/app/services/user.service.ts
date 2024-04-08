import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Roles } from '../models/roles';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BasicUrl ='http://localhost:8084/bank/api/auth/users';
  constructor(private http:HttpClient) { }
  public getUsers(){
    return this.http.get<User[]>(`${this.BasicUrl}`);
  }
  private Url ='http://localhost:8084/bank/api/auth';
  assignRolesToUser(id: number, roles: Roles[]): Observable<any> {
    const url = `${this.Url}/${id}/roles`;
    return this.http.put<any>(url, roles);
  }
  public getByUserId(id: number): Observable<User> {

    const url = `${this.Url}/getByUserId/${id}`;
    return this.http.get<User>(url);
  }
  public getRoles(){
    const url= `${this.Url}/getAllRoles`;
    return this.http.get<Roles[]>(url);
  }
  public getUserRole(id:number): Observable<User>{
    const url= `${this.Url}/userRole/${id}`;
    return this.http.get<User>(url);
  }
  removeRoleFromUser(userId: number, roleId: number) {
    return this.http.delete(`${this.Url}/user/${userId}/roles/${roleId}`);
  }
}
