import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Verse } from '../model/verse';
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  apiUrl: string = 'https://szentiras.hu/api/ref';
  entity: string = '';
  allBook = [{
    "bookName": "Ter",
    "totalChapterNumber": 50,
    "chapterVersesNumber": [
      {
        "num": 1,
        "total": 31
      },
      {
        "num": 2,
        "total": 25
      },
      {
        "num": 3,
        "total": 24
      },
      {
        "num": 4,
        "total": 26
      },
      {
        "num": 5,
        "total": 32
      },
      {
        "num": 6,
        "total": 22
      },
      {
        "num": 7,
        "total": 24
      },
      {
        "num": 8,
        "total": 22
      },
      {
        "num": 9,
        "total": 29
      },
      {
        "num": 10,
        "total": 32
      }
    ]
  }]
  // list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  randomItem: any | number | string;

  constructor(private http: HttpClient) { }

  getAllVerse(book: string): Observable<Verse> {
    return this.http.get<Verse>(`https://szentiras.hu/KNB/${book}`);
  }

  getOneVerse(book: string | number, fromVerse: string | number, toVerse: string | number): Observable<Verse> {
    return this.http.get<Verse>(`${this.apiUrl}/${book} ${fromVerse}-${toVerse}`);
  }

  getRandomVerse(): Observable<Verse> {
    let randomItem = this.allBook[Math.floor(Math.random() * this.allBook.length)];
    let randomChapter = Math.floor((Math.random() * randomItem.totalChapterNumber) + 1);
    let randomVerse = randomItem.chapterVersesNumber.map(obj => ({
      key: `${obj.num}`, value: `${obj.total}`
    }));
    let totalVerseInThisChapter = randomVerse.find(el => randomChapter === Number(el.key) || 1);
    console.log(totalVerseInThisChapter);


    let firstVerse = Math.floor((Math.random() * Number(totalVerseInThisChapter?.value)) + 1);
    let lastVerse = 0;
    do {
      lastVerse = Math.floor((Math.random() * Number(totalVerseInThisChapter?.value)) + 1);
    } while (lastVerse < firstVerse);

    return this.http.get<Verse>(`${this.apiUrl}/${randomItem.bookName}${randomChapter},${firstVerse}-${randomChapter}.${lastVerse}`)

  }

  getSearchedVerses(word: string): Observable<Verse> {
    return this.http.get<Verse>(`${this.apiUrl}/${word}`);
  }

  getSelectedVerses(book: string | number, fromChapter: string | number, fromVerse: string | number, toChapter: string | number, toVerse: string | number): Observable<Verse> {
    return this.http.get<Verse>(`${this.apiUrl}/${book}${fromChapter},${fromVerse}-${toChapter}.${toChapter}`);
  }


  // A program elvileg képes lenne teljes mértékben, közvetlenül kezelni az adatbázis CRUD műveleteit. Jelenleg csupán a lekérést használjuk.
  // create(entity: T): Observable<T> {
  //   const newEntity = { ...entity, _id: null };
  //   return this.http.post<T>(`${this.apiUrl}/${this.entity}`, newEntity);
  // }

  // update(entity: T): Observable<T> {
  //   return this.http.patch<T>(
  //     `${this.apiUrl}/${this.entity}/select/${entity._id}`,
  //     entity
  //   );
  // }

  // delete(entity: T): Observable<T> {
  //   return this.http.delete<T>(`${this.apiUrl}/${this.entity}/${entity._id}`);
  // }
}