import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

 
@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  getAll() {
    return { id: "assets/data/db.json", name: 'Quiz' }
    
  }

}
