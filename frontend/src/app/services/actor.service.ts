import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actor } from '../models/actor';
import { ActorComponent } from '../components/actor/actor.component';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  readonly URL_API = 'http://localhost:3000/api/actors';
  selectedActor: Actor;
  actors: Actor[];
  nationality: [{_id: "31qweqwe8t", name:"cubana"}, {_id: "3333e3eas", name:"mexicana"}];

  constructor(private http: HttpClient) {
    this.selectedActor = new Actor();
  }

  getActors() {
    return this.http.get(this.URL_API);
  }

  postActor(actor: Actor) {
    return this.http.post(this.URL_API, actor);
  }

  putActor(actor: Actor) {
    return this.http.put(this.URL_API + `/${actor._id}`, actor);
  }

  deleteActor(_id: String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
