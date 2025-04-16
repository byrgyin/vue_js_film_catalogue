export interface IFilm{
  id: number;
  backdropUrl:string;
  tmdbRating: number;
  releaseYear: number;
  runtime: number;
  language:string;
  budget:string;
  revenue:string;
  director:string;
  production:string;
  awardsSummary:string;
  title: string;
  plot: string;
  trailerUrl: string;
  trailerYouTubeId:string;
  posterUrl:string;
  genres:[string];
}
