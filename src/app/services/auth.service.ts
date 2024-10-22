import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenstorageService } from './tokenstorage.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Roles } from '../models/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  private helper = new JwtHelperService();
  private url = 'http://localhost:8085/bank/api/auth';
  private currentUser: User | null = null;
  constructor(
    private http: HttpClient, 
    private tokenstorageService: TokenstorageService, 
    private router: Router
  ) {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
    }
    const userData = sessionStorage.getItem('user');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }
  getCurrentUse(): User | null {
    return this.currentUser;
  }
  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }
  setCurrentUse(user: User) {
    this.currentUser = user;
    sessionStorage.setItem('user', JSON.stringify(user)); 
  }
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(forms: any): Observable<any> {
    return this.http.post<User>(this.url + '/signin', { username: forms.username, password: forms.password })
      .pipe(
        map((user: User) => {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  register(forms: any): Observable<any> {
    return this.http.post(this.url + '/signup', {
      username: forms.username,
      fullname: forms.fullname,
      email: forms.email,
      phone: forms.phone,
      password: forms.password
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.tokenstorageService.signOut();
    this.router.navigate(['/login']);
  }

  getToken() {
    return this.tokenstorageService.getToken();
  }

  getUserRole(id: number): Observable<User> {
    const url = `${this.url}/userRole/${id}`;
    return this.http.get<User>(url);
  }

  LoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const decodeToken = this.helper.decodeToken(token);
    return decodeToken.role === 'Admin' && !this.helper.isTokenExpired(token);
  }

  getRole(): Roles | null {
    const user = this.tokenstorageService.getUser();
    return user && user.role ? user.role as Roles : null;
  }

  hasAccess(role: Roles): boolean {
    const userRole = this.getRole();
    return userRole ? userRole === role : false; 
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  incrementFailedAttempts(email: string): Observable<any> {
    return this.http.post(`${this.url}/incrementFailedAttempts`, email, { responseType: 'text' });
  }

  isLocked(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/isLocked/${email}`);
  }

  getCurrentUserEmail(): string | null {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.email || null;
  }
  isAdmi(): boolean {
    const roles = this.tokenstorageService.getRoles();
    return roles.includes('ROLE_ADMIN');
  }
  
  isAdmin(): boolean {
    const roles = this.tokenstorageService.getRoles();
    console.log('User roles:', roles); 
    return roles.includes('ROLE_ADMIN');
  }

  printUserRole(): void {
    const role = this.getRole();
    if (role) {
      console.log(`Rôle de l'utilisateur : ${role}`);
    } else {
      console.log("Aucun rôle trouvé ou utilisateur non authentifié.");
    }
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null; // Assurez-vous que le format est correct
}


  
  public getCurrentUserId(): number | undefined {
    const user = this.currentUserSubject.value;
    return user ? user.id : undefined; 
  }
  public updateCurrentUser(user: User): void {
    console.log('Updating current user:', user);
    this.currentUserSubject.next(user);
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    console.log('User stored in sessionStorage:', sessionStorage.getItem('currentUser'));
}

  
}
