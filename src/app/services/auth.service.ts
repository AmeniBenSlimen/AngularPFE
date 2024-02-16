import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8083/clinique/api/auth'

  constructor(private http:HttpClient) { }
  login(forms:any):Observable<any>{
    return this.http.post(this.url+'/signin',
    {username:forms.username,password:forms.password});
  }
  register(forms:any):Observable<any>{
    return this.http.post(this.url+'/signup',
    {username:forms.username,fullname:forms.fullname,email:forms.email,phone:forms.phone,password:forms.password});
  }
}
