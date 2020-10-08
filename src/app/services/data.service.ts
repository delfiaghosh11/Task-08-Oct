import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'https://jsonblob.com/api/f0b33ee5-03a8-11eb-909d-27a9d4f5c8fa';
  private students: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private deletedStudents: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  getJSON() {
    return this.http.get(this.url);
  }

  getStudents() {
    return this.students.value;
  }

  setStudents(sArray) {
    this.students.next(sArray);
  }

  getDeletedStudents() {
    return this.deletedStudents.value;
  }

  setDeletedStudents(dArray) {
    this.deletedStudents.next(dArray);
  }
}
