import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAdmin = false;
  username: string = '';
  router: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.isAdmin = user?.role === 'admin';
      this.username = user?.username || '';
    });
  }

  logout() {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
}
