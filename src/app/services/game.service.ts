import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameResponse } from '../models/game-response.model';

@Injectable({
  providedIn: 'root', // This ensures the service is available globally
})
export class GameService {
  private apiUrl = 'http://localhost:5000/api/games';

  constructor(private http: HttpClient) {}

  // Method to get games with pagination
  getGames(page: number): Observable<GameResponse> {
    return this.http.get<GameResponse>(`${this.apiUrl}?page=${page}&limit=6`);
  }
}
