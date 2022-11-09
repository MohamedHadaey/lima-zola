import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import Observable to be able to make subscribe in any function
import { Observable } from 'rxjs';
// import AuthService to be able to use baseUrl instead or repeet baseUrl
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor(private http: HttpClient, private _AuthService: AuthService) {}

  // 13- this function to get name of cities in registerForm
  getCities(): Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}v1/app/cities`);
  }
}
