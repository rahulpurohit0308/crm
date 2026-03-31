import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deal } from '../models/deal.model';

@Injectable({ providedIn: 'root' })
export class DealService {

  private apiUrl = 'http://localhost:8080/api/deals';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Deal[]> {
    return this.http.get<Deal[]>(this.apiUrl);
  }

  getById(id: number): Observable<Deal> {
    return this.http.get<Deal>(`${this.apiUrl}/${id}`);
  }

  create(deal: Deal): Observable<Deal> {
    return this.http.post<Deal>(this.apiUrl, deal);
  }

  update(id: number, deal: Deal): Observable<Deal> {
    return this.http.put<Deal>(`${this.apiUrl}/${id}`, deal);
  }

  updateStage(id: number, stage: string): Observable<Deal> {
    const params = new HttpParams().set('stage', stage);
    return this.http.patch<Deal>(`${this.apiUrl}/${id}/stage`, {}, { params });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}