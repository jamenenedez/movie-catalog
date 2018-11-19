import { Component, OnInit } from '@angular/core';

import { ActorService } from '../../services/actor.service';
import { NgForm } from '@angular/forms';
import { Actor } from 'src/app/models/actor';

declare var M: any;

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
    if (form.value._id) {
      this.actorService.putActor(form.value).subscribe(res => {
        this.getActors();
        this.resetForm(form);
        M.toast({ html: "Successfuly updated" });
      });
    }
    else{
      this.actorService.postActor(form.value).subscribe(res => {      
        this.getActors();
        this.resetForm(form);
        M.toast({html:"Successfuly saved"});
      });
    }    
  }

  deleteActor(_id: String) {
    if(confirm("Are you sure you want to delete it")){
      this.actorService.deleteActor(_id).subscribe(res => {      
        this.getActors();
        M.toast({html:"Successfuly deleted"});
      });
    }    
  }

  getActors() {
    this.actorService.getActors().subscribe(res => {
      this.actorService.actors = res as Actor[];
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
