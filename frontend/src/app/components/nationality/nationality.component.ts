import { Component, OnInit } from '@angular/core';

import { NationalityService } from '../../services/nationality.service';
import { NgForm } from '@angular/forms';
import { Nationality } from 'src/app/models/nationality';

declare var M: any;

@Component({
  selector: 'app-nationality',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.css']
})
export class NationalityComponent implements OnInit {

  constructor(private nationalityService: NationalityService) { }

  ngOnInit() {
    this.getAll();
  }

  add(form: NgForm) {
    if (form.value._id != "" && form.value._id != null) {
      this.nationalityService.put(form.value).subscribe(res => {
        this.getAll();
        this.reset(form);
        M.toast({ html: "Successfuly updated" });
      });
    }
    else {
      this.nationalityService.post(form.value).subscribe(res => {
        this.getAll();
        this.reset(form);
        M.toast({ html: "Successfuly saved" });
      });
    }
  }

  delete(_id: String) {
    if (confirm("Are you sure you want to delete it")) {
      this.nationalityService.delete(_id).subscribe(res => {
        this.getAll();
        M.toast({ html: "Successfuly deleted" });
      });
    }
  }

  getAll() {
    this.nationalityService.getAll().subscribe(res => {
      this.nationalityService.nationalities = res as Nationality[];
    });
  }

  edit(nationality: Nationality) {
    this.nationalityService.selected = nationality;
  /*   this.nationalityService.selected.nationality = nationality.nationality; */
  }

  reset(form: NgForm) {
    if (form) {
      form.reset();
      this.nationalityService.selected = new Nationality();
    }

  }

}
