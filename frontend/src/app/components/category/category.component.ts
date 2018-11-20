import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category.service';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category';

declare var M: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAll();
  }

  add(form: NgForm) {
    if (form.value._id != "" && form.value._id != null) {
      this.categoryService.put(form.value).subscribe(res => {
        this.getAll();
        this.reset(form);
        M.toast({ html: "Successfuly updated" });
      });
    }
    else {
      this.categoryService.post(form.value).subscribe(res => {
        this.getAll();
        this.reset(form);
        M.toast({ html: "Successfuly saved" });
      });
    }
  }

  delete(_id: String) {
    if (confirm("Are you sure you want to delete it")) {
      this.categoryService.delete(_id).subscribe(res => {
        this.getAll();
        M.toast({ html: "Successfuly deleted" });
      });
    }
  }

  getAll() {
    this.categoryService.getAll().subscribe(res => {
      this.categoryService.categories = res as Category[];
    });
  }

  edit(category: Category) {
    this.categoryService.selected = category;
  /*   this.categoryService.selected.nationality = category.nationality; */
  }

  reset(form: NgForm) {
    if (form) {
      form.reset();
      this.categoryService.selected = new Category();
    }

  }

}
