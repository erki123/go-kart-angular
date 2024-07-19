import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registration } from '../models/registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl = 'http://localhost:8080/registrations';

  constructor(private http: HttpClient) { }

  getRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.baseUrl}/all`);
  }

  addRegistration(registration: Registration): Observable<Registration> {
    return this.http.post<Registration>(`${this.baseUrl}/add`, registration);
  }

  deleteRegistration(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
