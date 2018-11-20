import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  readonly URL_API = 'http://localhost:3000/api/movies';
  selected: Movie;
  movies: Movie[];

  constructor(private http: HttpClient) {
    this.selected = new Movie();
  }

  getAll() {
    return this.http.get(this.URL_API);
  }

  post(movie: Movie) {
    return this.http.post(this.URL_API, movie);
  }

  put(movie: Movie) {
    return this.http.put(this.URL_API + `/${movie._id}`, movie);
  }

  delete(_id: String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
