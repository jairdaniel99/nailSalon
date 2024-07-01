import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inquiry } from '../../models/inquiry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyDataService {
  private _inquiriesURL = 'http://localhost:3000/inquiries';
  constructor(private http: HttpClient) {}
  getInquiries(): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(this._inquiriesURL);
  }
  postInquiries(inquiriesObj: Inquiry): Observable<Inquiry[]> {
    return this.http.post<Inquiry[]>(this._inquiriesURL, inquiriesObj);
  }
}
