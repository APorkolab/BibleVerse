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
      },
      {
        "num": 11,
        "total": 32
      },
      {
        "num": 12,
        "total": 20
      },
      {
        "num": 13,
        "total": 18
      },
      {
        "num": 14,
        "total": 24
      },
      {
        "num": 15,
        "total": 21
      },
      {
        "num": 16,
        "total": 16
      },
      {
        "num": 17,
        "total": 27
      },
      {
        "num": 18,
        "total": 33
      },
      {
        "num": 19,
        "total": 38
      },
      {
        "num": 20,
        "total": 18
      },
      {
        "num": 21,
        "total": 34
      },
      {
        "num": 22,
        "total": 24
      },
      {
        "num": 23,
        "total": 20
      },
      {
        "num": 24,
        "total": 67
      },
      {
        "num": 25,
        "total": 34
      },
      {
        "num": 26,
        "total": 35
      },
      {
        "num": 27,
        "total": 46
      },
      {
        "num": 28,
        "total": 22
      },
      {
        "num": 29,
        "total": 35
      },
      {
        "num": 30,
        "total": 43
      },
      {
        "num": 31,
        "total": 55
      },
      {
        "num": 32,
        "total": 32
      },
      {
        "num": 33,
        "total": 20
      },
      {
        "num": 34,
        "total": 31
      },
      {
        "num": 35,
        "total": 29
      },
      {
        "num": 36,
        "total": 43
      },
      {
        "num": 37,
        "total": 36
      },
      {
        "num": 38,
        "total": 30
      },
      {
        "num": 39,
        "total": 23
      },
      {
        "num": 40,
        "total": 23
      },
      {
        "num": 41,
        "total": 57
      },
      {
        "num": 42,
        "total": 38
      },
      {
        "num": 43,
        "total": 34
      },
      {
        "num": 44,
        "total": 34
      },
      {
        "num": 45,
        "total": 28
      },
      {
        "num": 46,
        "total": 34
      },
      {
        "num": 47,
        "total": 31
      },
      {
        "num": 48,
        "total": 22
      },
      {
        "num": 49,
        "total": 33
      },
      {
        "num": 50,
        "total": 26
      }
    ]
  },
  {
    "bookName": "Kiv",
    "totalChapterNumber": 40,
    "chapterVersesNumber": [
      {
        "num": 1,
        "total": 22
      },
    ]
  },
  ]
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