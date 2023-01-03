import { SelectVerseComponent } from './page/select-verse/select-verse.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomVerseComponent } from './page/random-verse/random-verse.component';
import { SearchVerseComponent } from './page/search-verse/search-verse.component';
import { ContactComponent } from './page/contact/contact.component';

const routes: Routes = [{
  path: '',
  component: RandomVerseComponent,
},
{
  path: 'randomVerse',
  component: RandomVerseComponent,
},
{
  path: 'selectVerse',
  component: SelectVerseComponent,
},
{
  path: 'searchVerse',
  component: SearchVerseComponent,
},
{
  path: 'contact',
  component: ContactComponent,
},
{
  path: '**',
  component: RandomVerseComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
