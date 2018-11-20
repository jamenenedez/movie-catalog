import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gender } from '../models/gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  readonly URL_API = 'http://localhost:3000/api/genders';
  selected: Gender;
  genders: Gender[];

  constructor(private http: HttpClient) {
    this.selected = new Gender();
  }

  getAll() {
    return this.http.get(this.URL_API);
  }

  post(gender: Gender) {
    return this.http.post(this.URL_API, gender);
  }

  put(gender: Gender) {
    return this.http.put(this.URL_API + `/${gender._id}`, gender);
  }

  delete(_id: String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
