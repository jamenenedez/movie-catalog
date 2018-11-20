import { Component, OnInit } from '@angular/core';

import { DirectorService } from '../../services/director.service';
import { NgForm } from '@angular/forms';
import { Director } from 'src/app/models/director';
import { NationalityService } from 'src/app/services/nationality.service';
import { Nationality } from 'src/app/models/nationality';

declare var M: any;

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

  constructor(private directorService: DirectorService, public nationalityService: NationalityService) { }

  ngOnInit() {
    this.getAll();
    this.getAllNationalities();
  }

  add(form: NgForm) {
    if (form.value._id != "" && form.value._id != null) {
      this.directorService.put(form.value).subscribe(res => {
        this.getAll();
        this.reset(form);
        M.toast({ html: "Successfuly updated" });
      });
    }
    else {
      this.directorService.post(form.value).subscribe(res => {
        this.getAll();
        this.reset(form);
        M.toast({ html: "Successfuly saved" });
      });
    }
  }

  delete(_id: String) {
    if (confirm("Are you sure you want to delete it")) {
      this.directorService.delete(_id).subscribe(res => {
        this.getAll();
        M.toast({ html: "Successfuly deleted" });
      });
    }
  }

  getAll() {
    this.directorService.getAll().subscribe(res => {
      this.directorService.directors = res as Director[];
    });
  }

  getAllNationalities() {
    this.nationalityService.getAll().subscribe(res => {
      this.nationalityService.nationalities = res as Nationality[];
    });
  }

  edit(director: Director) {
    this.directorService.selected = director;
  /*   this.directorService.selected.nationality = director.nationality; */
  }

  reset(form: NgForm) {
    if (form) {
      form.reset();
      this.directorService.selected = new Director();
    }

  }

}
