import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { UserService } from './user.service'; // 👈 import

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token = new BehaviorSubject<string | null>(null);
  token$ = this.token.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {}

  login(username: string, password: string) {
    return this.http
      .post<{ token: string; isAdmin: boolean; username: string }>(
        'http://localhost:5000/api/auth/login',
        { username, password }
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          this.token.next(response.token);

          // ✅ Save user info to localStorage and update UserService
          const user = {
            username: response.username,
            role: response.isAdmin ? 'admin' : 'user',
          };
          localStorage.setItem('user', JSON.stringify(user));
          this.userService.setUser(user);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // ✅ Also clear user
    this.token.next(null);
    this.userService.clearUser(); // ✅ Reset user state
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
