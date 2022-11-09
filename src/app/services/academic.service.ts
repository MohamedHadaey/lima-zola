import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AcademicService {

  constructor(private http: HttpClient, private _AuthService: AuthService) { };

  // get acadimc year api
  getAcademicYears() : Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}v1/app/academic-years`);
  }

  // get subjects by year id
  getYearSubjects(yearId:any) : Observable<any>{
    return this.http.get(`${this._AuthService.baseUrl}v1/app/subject/${yearId}`)
  }

  // get lessons by subject id
  getSubjectLessons(subjectId:any) : Observable<any>{
    return this.http.get(`${this._AuthService.baseUrl}v1/app/lessons/${subjectId}`)
  }

}
