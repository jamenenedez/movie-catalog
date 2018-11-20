import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly URL_API = 'http://localhost:3000/api/categories';
  selected: Category;
  categories: Category[];

  constructor(private http: HttpClient) {
    this.selected = new Category();
  }

  getAll() {
    return this.http.get(this.URL_API);
  }

  post(category: Category) {
    return this.http.post(this.URL_API, category);
  }

  put(category: Category) {
    return this.http.put(this.URL_API + `/${category._id}`, category);
  }

  delete(_id: String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
