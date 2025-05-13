export interface Game {
  _id?: string;
  title: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  tags?: string[];
  platforms?: string[];
  releaseDate?: string;
  genre?: string;
  developer?: string;
}
