import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameResponse } from '../models/game-response.model';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = 'http://localhost:5000/api/games';

  constructor(private http: HttpClient) {}

  getGames(page: number, limit: number = 6): Observable<GameResponse> {
    return this.http.get<GameResponse>(
      `${this.apiUrl}?page=${page}&limit=${limit}`
    );
  }

  deleteGame(slug: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete(`${this.apiUrl}/${slug}`, { headers });
  }

  createGame(gameData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post(this.apiUrl, gameData, { headers });
  }

  updateGame(slug: string, gameData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put(`${this.apiUrl}/${slug}`, gameData, { headers });
  }

  getGameBySlug(slug: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/slug/${slug}`);
  }
}
