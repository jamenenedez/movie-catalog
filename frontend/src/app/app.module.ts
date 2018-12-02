import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MyOwnCustomMaterialModule } from '../app/material.config';

import { AppComponent } from './app.component';
import { ActorComponent } from './components/actor/actor.component';
import { NationalityComponent } from './components/nationality/nationality.component';
import { CategoryComponent } from './components/category/category.component';
import { CountryComponent } from './components/country/country.component';
import { DirectorComponent } from './components/director/director.component';
import { GenderComponent } from './components/gender/gender.component';
import { MovieComponent } from './components/movie/movie.component';
import { UserComponent } from './components/user/user.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {
    path: 'actor',
    component: ActorComponent
  },
  {
    path: 'country',
    component: CountryComponent
  },
  {
    path: 'gender',
    component: GenderComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'movie',
    component: MovieComponent
  },
  {
    path: 'nationality',
    component: NationalityComponent
  },
  {
    path: 'director',
    component: DirectorComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  }
];

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
    UserComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    MyOwnCustomMaterialModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
