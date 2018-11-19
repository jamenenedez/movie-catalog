import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actor } from '../models/actor';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  readonly URL_API = 'http://localhost:3000/api/actors';
  selectedActor: Actor;
  actors: Actor[];

  constructor(private http: HttpClient) {
    this.selectedActor = new Actor();
  }

  getAll() {
    return this.http.get(this.URL_API);
  }

  post(actor: Actor) {
    return this.http.post(this.URL_API, actor);
  }

  put(actor: Actor) {
    return this.http.put(this.URL_API + `/${actor._id}`, actor);
  }

  delete(_id: String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
