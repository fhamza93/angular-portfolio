import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private authChecked = new BehaviorSubject<boolean>(false);
  private uid: string | null = null;
  private email: string | null = null;

  loggedIn$ = this.loggedIn.asObservable();
  authChecked$ = this.authChecked.asObservable();

  constructor(private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState.subscribe(user => {
      this.loggedIn.next(!!user); 
      this.authChecked.next(true);
      this.uid = user ? user.uid : null;
    });
  }

  async login(username: string, password: string): Promise<void> {
    try {
      const userCredential = await this.firebaseAuth.signInWithEmailAndPassword(username, password);
      this.loggedIn.next(true); 
      this.uid = userCredential.user ? userCredential.user.uid : null;
      this.email = username;
      localStorage.setItem('userEmail', this.email);
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(error.message);
    }
  }

  async logout(): Promise<void> {
    await this.firebaseAuth.signOut();
    this.uid = null;
    this.email = null;
    localStorage.removeItem('userEmail');
    this.loggedIn.next(false); 
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable(); 
  }

  getCurrentUserId(): string | null {
    return this.uid; 
  }

  getCurrentUserUid(): string {
    return this.uid != null ? this.uid : '-1'; 
  }

  getCurrentUserEmail(): string | null {
    return localStorage.getItem('userEmail'); 
  }

  isCurrentUserAdmin(): boolean {
    this.email = localStorage.getItem('userEmail');
    return this.email != null && this.email.startsWith('admin');
  }

  isCurrentUserClient(): boolean {
    this.email = localStorage.getItem('userEmail');
    return this.email != null && this.email.startsWith('cliente');
   }
}
