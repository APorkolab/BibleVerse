import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { RandomVerseComponent } from './page/random-verse/random-verse.component';
import { SelectVerseComponent } from './page/select-verse/select-verse.component';
import { SearchVerseComponent } from './page/search-verse/search-verse.component';
import { ContactComponent } from './page/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RandomVerseComponent,
    SelectVerseComponent,
    SearchVerseComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
