import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../services/movie.service';
import { NgForm } from '@angular/forms';
import { Movie } from 'src/app/models/movie';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ActorService } from 'src/app/services/actor.service';
import { DirectorService } from 'src/app/services/director.service';
import { CountryService } from 'src/app/services/country.service';
import { GenderService } from 'src/app/services/gender.service';
import { Actor } from 'src/app/models/actor';
import { Director } from 'src/app/models/director';
import { Gender } from 'src/app/models/gender';
import { Country } from 'src/app/models/country';

declare var M: any;

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private movieService: MovieService,
    public categoryService: CategoryService,
    public actorService: ActorService,
    public directorService: DirectorService,
    public countryService: CountryService,
    public genderService: GenderService,
  ) { }

  genders: Gender[];

  ngOnInit() {
    this.getAll();
    this.getAllActors();
    this.getAllCategories();
    this.getAllDirectors();
    this.getAllGenders();
    this.getAllCountries();
  }

  add(form: NgForm) {
    if (form.value._id != "" && form.value._id != null) {
      this.movieService.put(form.value).subscribe(res => {
        this.getAll();
        this.reset(form);
        M.toast({ html: "Successfuly updated" });
      });
    }
    else {
      this.movieService.post(form.value).subscribe(res => {
        this.getAll();
        this.reset(form);
        M.toast({ html: "Successfuly saved" });
      });
    }
  }

  delete(_id: String) {
    if (confirm("Are you sure you want to delete it")) {
      this.movieService.delete(_id).subscribe(res => {
        this.getAll();
        M.toast({ html: "Successfuly deleted" });
      });
    }
  }

  getAll() {
    this.movieService.getAll().subscribe(res => {
      this.movieService.movies = res as Movie[];
    });
  }

  edit(movie: Movie) {
    this.movieService.selected = movie;
    this.genders = this.genderService.genders;
    /*   this.movieService.selected.nationality = movie.nationality; */
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(res => {
      this.categoryService.categories = res as Category[];
    });
  }

  getAllActors() {
    this.actorService.getAll().subscribe(res => {
      this.actorService.actors = res as Actor[];
    });
  }

  getAllDirectors() {
    this.directorService.getAll().subscribe(res => {
      this.directorService.directors = res as Director[];
    });
  }

  getAllGenders() {
    this.genderService.getAll().subscribe(res => {
      this.genderService.genders = res as Gender[];
    });
  }

  getAllCountries() {
    this.countryService.getAll().subscribe(res => {
      this.countryService.countries = res as Country[];
    });
  }

  reset(form: NgForm) {
    if (form) {
      form.reset();
      this.movieService.selected = new Movie();
    }

  }

}
