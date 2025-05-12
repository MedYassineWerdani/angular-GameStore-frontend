import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from '../services/game.service'; // Import the GameService
import { GameResponse } from '../models/game-response.model'; // Import the model

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  games: any[] = [];
  totalPages: number = 1;
  currentPage: number = 1;

  constructor(private gameService: GameService) {} // Inject GameService

  ngOnInit() {
    this.loadGames();
  }

  loadGames(page: number = 1) {
    this.gameService.getGames(page).subscribe((data: GameResponse) => {
      this.games = data.games;
      this.totalPages = data.totalPages;
      this.currentPage = data.currentPage;
    });
  }

  // Methods to navigate pages
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
}
