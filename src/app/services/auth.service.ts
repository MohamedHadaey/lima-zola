import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// to decode the token of user data
import jwtDecode from 'jwt-decode';
// import Observable to be able to make subscribe in any function
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl:any = "https://limazola.com/api/";
  // baseUrl: any = 'https://sublima.limazola.com/api/';
  // user token and recorded in localstorage
  token_api: any;
  // use This array of objects when you create an account and move to login form
  data: any = [];
  // use this value (phoneChangePass) if you forget your password
  phoneChangePass: any;
  // use this value to get subscriber value
  subscriber: any = localStorage.getItem('subscriber');
  constructor(private http: HttpClient) {
    // to keep user logged in while making refresh
    if (localStorage.getItem('token_api') != null) {
      this.saveUserData();
    }
  }

  // userData of type of BehaviorSubject to make data listen in all project
  userData = new BehaviorSubject(null);

  saveUserData() {
    let encodedUserData = JSON.stringify(localStorage.getItem('token_api'));
    this.userData.next(jwtDecode(encodedUserData));
  }

  // 1- signup function
  signUp(registerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}v1/auth/register`, registerData);
  }

  // 2- varify phone function
  varifyPhone(varifyData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}v1/auth/verify_phone`, varifyData);
  }

  // 3- signin function
  signIn(loginData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}v1/auth/login`, loginData);
  }

  // 4- logOut function
  logOut(Authorization: any): Observable<any> {
    return this.http.post(`${this.baseUrl}v1/user/logout`, Authorization);
  }

  // 5- get profile data function
  getProfileData(): Observable<any> {
    return this.http.get(`${this.baseUrl}v1/user/profile`);
  }

  // 6- update profile data function
  updateProfile(profileData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}v1/user/profile/update`, profileData);
  }

  // 7- update password function
  updatePassword(profilePassword: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}v1/user/profile/update_password`,
      profilePassword
    );
  }

  // 8- this function to give code when you forget password
  forgetPassword(forgetPassFormData: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}v1/auth/forget-password`,
      forgetPassFormData
    );
  }

  // 9- this function to confirm code coming in your mobile to change password
  confirmCode(confirmingCodeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}v1/auth/verify`, confirmingCodeData);
  }

  // 10- now you can change password by this function
  changePassword(passwordData: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}v1/auth/change-password`,
      passwordData
    );
  }
}
