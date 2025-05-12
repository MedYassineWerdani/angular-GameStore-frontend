export interface GameResponse {
  games: Array<any>; // This would be an array of game objects
  totalPages: number; // Total number of pages for pagination
  currentPage: number; // The current page of results
  totalGames: number; // Total number of games available
}
