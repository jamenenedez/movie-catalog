import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Director } from '../models/director';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  readonly URL_API = 'http://localhost:3000/api/directors';
  selected: Director;
  directors: Director[];

  constructor(private http: HttpClient) {
    this.selected = new Director();
  }

  getAll() {
    return this.http.get(this.URL_API);
  }

  post(director: Director) {
    return this.http.post(this.URL_API, director);
  }

  put(director: Director) {
    return this.http.put(this.URL_API + `/${director._id}`, director);
  }

  delete(_id: String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
