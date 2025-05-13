import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  game: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    console.log('Fetching game with slug:', slug); // debug
    this.http.get(`http://localhost:5000/api/games/slug/${slug}`).subscribe({
      next: (data) => {
        console.log('Game data received:', data); // debug
        this.game = data;
      },
      error: (err) => {
        console.error('Error fetching game:', err); // debug
      },
    });
  }
}
