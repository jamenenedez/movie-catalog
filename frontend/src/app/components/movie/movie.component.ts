import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../services/movie.service';
import { NgForm } from '@angular/forms';
import { Movie } from 'src/app/models/movie';

declare var M: any;

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getAll();
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
  /*   this.movieService.selected.nationality = movie.nationality; */
  }

  reset(form: NgForm) {
    if (form) {
      form.reset();
      this.movieService.selected = new Movie();
    }

  }

}
