import { Component, OnInit } from '@angular/core';

import { ActorService } from '../../services/actor.service';
import { NgForm } from '@angular/forms';
import { Actor } from 'src/app/models/actor';

declare var M:any;

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  constructor(private actorService: ActorService) { }

  ngOnInit() {
    this.getActors();
  }

  addActor(form: NgForm) {
    this.actorService.postActor(form.value).subscribe(res => {      
      this.getActors();
      this.resetForm(form);
      M.toast({html:"Save Successfuly"});
    });
  }

  getActors() {
    this.actorService.getActors().subscribe(res => {
      this.actorService.actors = res as Actor[];
      console.log(res);
    });
  }

  editActor(actor: Actor) {
    this.actorService.selectedActor = actor;
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.actorService.selectedActor = new Actor();
    }

  }

}
