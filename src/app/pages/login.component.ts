import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.error = null;
    this.success = false;

    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.auth.login(username, password).subscribe({
      next: (response) => {
        this.success = true;

        const user = {
          username: response.username,
          role: response.isAdmin ? 'admin' : 'user',
        };
        localStorage.setItem('user', JSON.stringify(user));

        setTimeout(() => this.router.navigate(['/games']), 500);
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed';
      },
    });
  }
}
