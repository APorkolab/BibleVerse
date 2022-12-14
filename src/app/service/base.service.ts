import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Verse } from '../model/verse';
import * as allBook from './../../assets/json/bible.json';
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  apiUrl: string = 'https://szentiras.hu/api/ref';
  entity: string = '';
  // list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  randomItem: any | number | string;
  allBook: any = (allBook as any).default;

  constructor(private http: HttpClient) { }

  getAllVerse(book: string): Observable<Verse> {
    return this.http.get<Verse>(`https://szentiras.hu/KNB/${book}`);
  }

  getOneVerse(book: string | number, fromVerse: string | number, toVerse: string | number): Observable<Verse> {
    return this.http.get<Verse>(`${this.apiUrl}/${book} ${fromVerse}-${toVerse}`);
  }

  getRandomVerse(): Observable<Verse> {
    // Előzetes betöltés
    const allBook = this.allBook;
    const apiUrl = this.apiUrl;

    // Változók előzetes betöltése
    const randomItem = allBook[Math.floor(Math.random() * allBook.length)];
    const randomChapter = Math.floor((Math.random() * randomItem.totalChapterNumber) + 1);
    const totalVerseInThisChapter = randomItem.chapterVersesNumber[randomChapter - 1]?.total;

    // Változók előzetes beállítása
    let firstVerse = Math.floor((Math.random() * totalVerseInThisChapter) + 1);
    let lastVerse = firstVerse;

    // While ciklus használata
    while (lastVerse <= firstVerse) {
      lastVerse = Math.floor((Math.random() * totalVerseInThisChapter) + 1);
    }

    // HTTP hívás
    return this.http.get<Verse>(`${apiUrl}/${randomItem.bookName}${randomChapter},${firstVerse}-${randomChapter}.${lastVerse}`)
  }

  getSearchedVerses(word: string): Observable<Verse> {
    return this.http.get<Verse>(`https://szentiras.hu/api/search/${word}`);
  }

  getSelectedVerses(book: string | number, fromChapter: string | number, fromVerse: string | number, toChapter?: string | number, toVerse?: string | number): Observable<Verse> {
    let query = `${this.apiUrl}/${book}${fromChapter},${fromVerse}`;

    if (toChapter && toVerse) {
      query += `-${toChapter},${toChapter}`;
    }

    return this.http.get<Verse>(query);
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