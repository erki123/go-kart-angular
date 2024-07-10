import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Race } from '../models/race';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private apiUrl = 'http://localhost:8080/race';

  constructor(private http: HttpClient) { }

  getRaces(): Observable<Race[]> {
    return this.http.get<Race[]>(`${this.apiUrl}/all`);
  }

  addRace(race: Race): Observable<Race> {
    return this.http.post<Race>(`${this.apiUrl}/add`, race);
  }

  updateRace(race: Race): Observable<Race> {
    return this.http.put<Race>(`${this.apiUrl}/update`, race);
  }

  deleteRace(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
