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
  hitCount = 0;
  verseData!: any;
  Object: any;

  constructor(
    private baseService: BaseService,
  ) { }

  ngOnInit() {
  }

  search(word: string) {
    this.verseData = '';
    this.hitCount = 0;
    this.baseService.getSearchedVerses(word).subscribe({
      next: (data: any) => {
        // A visszakapott adatokat itt kezeljük (pl. megjelenítjük a felhasználó számára)
        this.verseData = JSON.parse(JSON.stringify(data.fullTextResult.results));
        this.hitCount = data.fullTextResult.hitCount;
      },
      error: (e) => console.error(e),
    });
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }


}
