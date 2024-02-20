import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenstorageService } from './tokenstorage.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper=new JwtHelperService()
  role=''
  private url = 'http://localhost:8083/clinique/api/auth'
  AuthenticatedUser$  = new BehaviorSubject<User | null>(null);
  constructor(private http:HttpClient, private tokenstorageService : TokenstorageService,private router: Router) {
   }
  login(forms:any):Observable<any>{
    return this.http.post(this.url+'/signin',
    {username:forms.username,password:forms.password});
  }
  register(forms:any):Observable<any>{
    return this.http.post(this.url+'/signup',
    {username:forms.username,fullname:forms.fullname,email:forms.email,phone:forms.phone,password:forms.password});
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logout(){
    this.tokenstorageService.signOut();
    this.router.navigate(['/login']);

  }
  getToken(){
    this.tokenstorageService.getToken();
  }
  /*refreshToken(){
    return this.http.request('post', 'http://localhost:8083/clinique/api/auth/refresh-token-cookie', {
      withCredentials: true
    })
  }*/
  LoggedIn(){
    let token:any=localStorage.getItem('token')
    if(!token){
     return false
    }
    let decodeToken=this.helper.decodeToken(token)
   
   
   if(decodeToken.role!=='Admin'){
      return false
    }

    if(this.helper.isTokenExpired(token)){
      return false
    }

    return true
 }
}
