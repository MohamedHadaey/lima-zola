import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import Observable to be able to make subscribe in any function
import { Observable } from 'rxjs';
// import AuthService to be able to use baseUrl instead or repeet baseUrl
import { AuthService } from './auth.service';
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class HomesService {
  constructor(private http: HttpClient, private _AuthService: AuthService) {}

  // 14- this function to get kids categories
  getKidsCategories(): Observable<any> {
    return this.http.get(
      `${this._AuthService.baseUrl}v1/app/home/categories/1`
    );
  }

  // 15- this function to get moms categories
  getMomsCategories(): Observable<any> {
    return this.http.get(
      `${this._AuthService.baseUrl}v1/app/home/categories/2`
    );
  }

  // 16- this function to get posts
  getPosts(categoryId: number): Observable<any> {
    return this.http.get<string>(
      `${this._AuthService.baseUrl}v1/app/category/posts/${categoryId}`
    );
  }

  // 17- this function to get sub categories
  getSubcategories(categoryId: any): Observable<any> {
    return this.http.get(
      `${this._AuthService.baseUrl}v1/app/category/sub_categories/${categoryId}`
    );
  }

  // 18- this function to get post details
  getPostDetails(postId: number): Observable<any> {
    return this.http.get(
      `${this._AuthService.baseUrl}v1/app/post/details/${postId}`
    );
  }

  // 19- this function to make like
  addLike(post_id_data: any): Observable<any> {
    return this.http.post(
      `${this._AuthService.baseUrl}v1/user/post/like/store`,
      post_id_data
    );
  }

  // 20- this functions to show and hide loader
  showLoader() {
    $('.loader').css({ display: 'flex', transition: 'all 0.5s' });
  }
  hideLoader() {
    $('.loader').css({ display: 'none', transition: 'all 0.5s' });
  }
}
