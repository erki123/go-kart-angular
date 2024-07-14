import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private baseUrl = 'http://localhost:8080/track';

  constructor(private http: HttpClient) { }

  getTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.baseUrl}/all`);
  }

  addTrack(track: Track): Observable<Track> {
    return this.http.post<Track>(`${this.baseUrl}/add`, track);
  }

  updateTrack(track: Track): Observable<Track> {
    return this.http.put<Track>(`${this.baseUrl}/update`, track);
  }

  deleteTrack(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
