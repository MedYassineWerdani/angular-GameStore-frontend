import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token = new BehaviorSubject<string | null>(null);
  token$ = this.token.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<{ token: string; isAdmin: boolean; username: string }>(
        '/api/auth/login',
        { username, password }
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          this.token.next(response.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.token.next(null);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
