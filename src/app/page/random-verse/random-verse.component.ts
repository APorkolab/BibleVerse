
import { Component, Input, OnInit } from '@angular/core';
import { Verse } from 'src/app/model/verse';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-random-verse',
  templateUrl: './random-verse.component.html',
  styleUrls: ['./random-verse.component.scss']
})
export class RandomVerseComponent implements OnInit {

  @Input()
  randVerse!: Verse;

  constructor(
    private baseService: BaseService,
  ) { }

  ngOnInit(): void {
    this.baseService.getRandomVerse().subscribe({
      next: (data: Verse) => {
        this.randVerse = data;

      },
      error: (e) => console.error(e),
    });
  }
}