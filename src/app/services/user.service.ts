import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  user$ = this.userSubject.asObservable();

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  clearUser() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  isAdmin(): boolean {
    return this.userSubject.value?.role === 'admin';
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }
}
