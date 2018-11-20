import { Component, OnInit } from '@angular/core';

import { CountryService } from '../../services/country.service';
import { NgForm } from '@angular/forms';
import { Country } from 'src/app/models/country';

declare var M: any;

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.getAll();
  }

  add(form: NgForm) {
    if (form.value._id != "" && form.value._id != null) {
      this.countryService.put(form.value).subscribe(res => {
        this.getAll();
        this.reset(form);
        M.toast({ html: "Successfuly updated" });
      });
    }
    else {
      this.countryService.post(form.value).subscribe(res => {
        this.getAll();
        this.reset(form);
        M.toast({ html: "Successfuly saved" });
      });
    }
  }

  delete(_id: String) {
    if (confirm("Are you sure you want to delete it")) {
      this.countryService.delete(_id).subscribe(res => {
        this.getAll();
        M.toast({ html: "Successfuly deleted" });
      });
    }
  }

  getAll() {
    this.countryService.getAll().subscribe(res => {
      this.countryService.countries = res as Country[];
    });
  }

  edit(country: Country) {
    this.countryService.selected = country;
  /*   this.countryService.selected.nationality = country.nationality; */
  }

  reset(form: NgForm) {
    if (form) {
      form.reset();
      this.countryService.selected = new Country();
    }

  }

}
