import { Component, OnInit } from '@angular/core';

import { ActorService } from '../../services/actor.service';
import { NgForm } from '@angular/forms';
import { Actor } from 'src/app/models/actor';
import { NationalityService } from 'src/app/services/nationality.service';
import { Nationality } from 'src/app/models/nationality';

declare var M: any;

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  constructor(private actorService: ActorService, public nationalityService: NationalityService) { }

  actor$: Actor;

  ngOnInit() {
    this.getAll();
    this.getAllNationalities();
  }

  add(form: NgForm) {
    if (form.value._id != "" && form.value._id != null) {
      this.actorService.put(form.value).subscribe(res => {
        this.getAll();
        this.reset(form);
        M.toast({ html: "Successfuly updated" });
      });
    }
    else {
      this.actorService.post(form.value).subscribe(res => {
        this.getAll();
        this.reset(form);
        M.toast({ html: "Successfuly saved" });
      });
    }
  }

  delete(_id: String) {
    if (confirm("Are you sure you want to delete it")) {
      this.actorService.delete(_id).subscribe(res => {
        this.getAll();
        M.toast({ html: "Successfuly deleted" });
      });
    }
  }

  getAll() {
    this.actorService.getAll().subscribe(res => {
      this.actorService.actors = res as Actor[];
    });
  }

  getAllNationalities() {
    this.nationalityService.getAll().subscribe(res => {
      this.nationalityService.nationalities = res as Nationality[];
    });
  }

  edit(actor: Actor) {
    this.actorService.selected = actor;
  }

  getOne(actor: Actor) {
    this.actorService.selected = actor;
  }

  reset(form: NgForm) {
    if (form) {
      form.reset();
      this.actorService.selected = new Actor();
    }

  }

}
