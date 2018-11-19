import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nationality } from '../models/nationality';

@Injectable({
  providedIn: 'root'
})
export class NationalityService {

  readonly URL_API = 'http://localhost:3000/api/nationalities';
  selected: Nationality;
  nationalities: Nationality[];

  constructor(private http: HttpClient) {
    this.selected = new Nationality();
  }

  getAll() {
    return this.http.get(this.URL_API);
  }

  post(nationality: Nationality) {
    return this.http.post(this.URL_API, nationality);
  }

  put(nationality: Nationality) {
    return this.http.put(this.URL_API + `/${nationality._id}`, nationality);
  }

  delete(_id: String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
