import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService<
  T extends { _id: string | number;[key: string]: any }
> {
  apiUrl: string = 'https://szentiras.hu/api/ref/';
  entity: string = '';
  list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor(private http: HttpClient) { }

  getAllVerse(book: string): Observable<T[]> {
    return this.http.get<T[]>(`https://szentiras.hu/KNB/${book}`);
  }

  getOneVerse(book: string | number, fromVerse: string | number, toVerse: string | number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${book} ${fromVerse}-${toVerse}`);
  }

  getSearchedVerses(word: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${word}`);
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