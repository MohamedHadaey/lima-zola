import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import Observable to be able to make subscribe in any function
import { Observable } from 'rxjs';
// import AuthService to be able to use baseUrl instead or repeet baseUrl
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class PagesService {
  constructor(private http: HttpClient, private _AuthService: AuthService) {}

  // 21- this function to get about us (80 fekra) text
  getAboutUs(): Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}v1/app/pages/idea`);
  }

  // 22- this function to get about application text
  getAboutApp(): Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}v1/app/pages/about`);
  }

  // 23- this function to get members of team
  getTeam(): Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}v1/app/teams`);
  }

  // 24- this function to get links to contact with us
  getLinks(): Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}v1/app/links`);
  }

  // 25- this function to get privacy policy text
  getPrivacy(): Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}v1/app/pages/privacy`);
  }

  // 26- this function to get terms and condition text
  getTerms(): Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}v1/app/pages/terms`);
  }
}
