import { Injectable } from '@angular/core';
import { Article } from '../article';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  public data: Article[];

  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get('assets/articles.json');
  }
}
