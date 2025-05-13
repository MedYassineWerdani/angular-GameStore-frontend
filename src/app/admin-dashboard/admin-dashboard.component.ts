import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { GameResponse } from '../models/game-response.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  games: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit() {
    this.loadGames();
  }

  loadGames(page: number = 1) {
    this.gameService.getGames(page, 15).subscribe((data: GameResponse) => {
      this.games = data.games;
      this.totalPages = data.totalPages;
      this.currentPage = data.currentPage;
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadGames(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadGames(this.currentPage - 1);
    }
  }

  deleteGame(slug: string) {
    if (confirm('Are you sure you want to delete this game?')) {
      this.gameService.deleteGame(slug).subscribe(() => {
        this.loadGames(this.currentPage); // Reload current page after deletion
      });
    }
  }

  editGame(slug: string) {
    this.router.navigate(['/admin/edit', slug]);
  }

  navigateToCreate() {
    this.router.navigate(['/admin/create']);
  }
}
