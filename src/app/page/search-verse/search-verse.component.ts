import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Verse } from 'src/app/model/verse';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-search-verse',
  templateUrl: './search-verse.component.html',
  styleUrls: ['./search-verse.component.scss']
})
export class SearchVerseComponent implements OnInit {
  searchWord = '';

  verseData!: any;
  Object: any;

  constructor(
    private baseService: BaseService,
  ) { }

  ngOnInit() {
  }

  search(word: string) {
    this.verseData = '';
    this.baseService.getSearchedVerses(word).subscribe({
      next: (data: any) => {
        // A visszakapott adatokat itt kezeljük (pl. megjelenítjük a felhasználó számára)
        this.verseData = JSON.parse(JSON.stringify(data.fullTextResult.results));
      },
      error: (e) => console.error(e),
    });
  }
}
