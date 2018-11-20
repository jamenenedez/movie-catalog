import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  readonly URL_API = 'http://localhost:3000/api/countries';
  selected: Country;
  countries: Country[];

  constructor(private http: HttpClient) {
    this.selected = new Country();
  }

  getAll() {
    return this.http.get(this.URL_API);
  }

  post(country: Country) {
    return this.http.post(this.URL_API, country);
  }

  put(country: Country) {
    return this.http.put(this.URL_API + `/${country._id}`, country);
  }

  delete(_id: String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
