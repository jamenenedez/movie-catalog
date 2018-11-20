import { Component, OnInit } from '@angular/core';

import { GenderService } from '../../services/gender.service';
import { NgForm } from '@angular/forms';
import { Gender } from 'src/app/models/gender';

declare var M: any;

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit {

  constructor(private genderService: GenderService) { }

  ngOnInit() {
    this.getAll();
  }

  add(form: NgForm) {
    if (form.value._id != "" && form.value._id != null) {
      this.genderService.put(form.value).subscribe(res => {
        this.getAll();
        this.reset(form);
        M.toast({ html: "Successfuly updated" });
      });
    }
    else {
      this.genderService.post(form.value).subscribe(res => {
        this.getAll();
        this.reset(form);
        M.toast({ html: "Successfuly saved" });
      });
    }
  }

  delete(_id: String) {
    if (confirm("Are you sure you want to delete it")) {
      this.genderService.delete(_id).subscribe(res => {
        this.getAll();
        M.toast({ html: "Successfuly deleted" });
      });
    }
  }

  getAll() {
    this.genderService.getAll().subscribe(res => {
      this.genderService.genders = res as Gender[];
    });
  }

  edit(gender: Gender) {
    this.genderService.selected = gender;
  /*   this.genderService.selected.nationality = gender.nationality; */
  }

  reset(form: NgForm) {
    if (form) {
      form.reset();
      this.genderService.selected = new Gender();
    }

  }

}
