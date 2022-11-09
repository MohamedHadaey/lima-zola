import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import Observable to be able to make subscribe in any function
import { Observable } from 'rxjs';
// import AuthService to be able to use baseUrl instead or repeet baseUrl
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private http: HttpClient, private _AuthService: AuthService) {}

  // 11- this function to add favourite posts
  addFavourite(post_id_data: any): Observable<any> {
    return this.http.post(
      `${this._AuthService.baseUrl}v1/user/favorite/store`,
      post_id_data
    );
  }

  // 12- this function to get favourite
  getFavourites(): Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}v1/user/favorites`);
  }
}
