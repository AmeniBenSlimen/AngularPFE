import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenstorageService {
  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user';
  ROLES_KEY = 'auth-roles' ;
  constructor() { }
  getRol(): string[] {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    return user.roles || [];
  }
  signOut(){
    window.sessionStorage.clear();
  }
  public getRoless(): string[] {
    const user = this.getUser();
    console.log('User from getUser():', user);  // Ajouter un log pour vérifier la structure de l'utilisateur
    
    if (user && Array.isArray(user.roles)) {
      console.log('User roles:', user.roles);  // Afficher les rôles pour vérifier leur structure
      return user.roles;
    } else {
      console.log('Roles not found or not an array');
      return [];  // Si les rôles ne sont pas dans un tableau, retourner un tableau vide
    }
  }
  
  
  public saveToken(token : string){
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY,token);
  }
  public saveUser(user:any){
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY,user);
  }
  public getToken():any{
    return sessionStorage.getItem(this.TOKEN_KEY);
  }
  public getUser(){
    return JSON.parse(sessionStorage.getItem(this.USER_KEY)!);
  }
  clean(): void {
    window.localStorage.clear();
  }
  public getRoles(): string[] {
    const user = this.getUser();
    return user && user.role ? user.role : [];
  }
  getUsername(): string | null {
    const user = sessionStorage.getItem(this.USER_KEY);
    console.log('User data from sessionStorage:', user); 
    if (user) {
      try {
        const userObj = JSON.parse(user);  
        return userObj.username || null; 
      } catch (error) {
        console.error('Error parsing user object:', error); 
      }
    }
    return null; 
  }
  getInfoUser(): string | null {
    const user = sessionStorage.getItem(this.USER_KEY);
    if (user) {
      try {
        const userObj = JSON.parse(user);  
        return userObj.user || null; 
      } catch (error) {
        console.error('Error parsing user object:', error); 
      }
    }
    return null; 
  }
  getU() {
    return JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  }

  getR(): string[] {
    const user = this.getUser();
    return user && user.roles ? user.roles : [];
  }

  // Retrieves the username
  getUsern(): string | null {
    const user = this.getUser();
    return user && user.username ? user.username : null;
  }
}
