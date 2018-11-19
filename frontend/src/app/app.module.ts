import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MyOwnCustomMaterialModule} from '../app/material.config';

import { AppComponent } from './app.component';
import { ActorComponent } from './components/actor/actor.component';
import { NationalityComponent } from './components/nationality/nationality.component';
import { CategoryComponent } from './components/category/category.component';
import { CountryComponent } from './components/country/country.component';
import { DirectorComponent } from './components/director/director.component';
import { GenderComponent } from './components/gender/gender.component';
import { MovieComponent } from './components/movie/movie.component';
import { UserComponent } from './components/user/user.component';   


@NgModule({
  declarations: [
    AppComponent,
    ActorComponent,
    NationalityComponent,
    CategoryComponent,
    CountryComponent,
    DirectorComponent,
    GenderComponent,
    MovieComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    MyOwnCustomMaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
