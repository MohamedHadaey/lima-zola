import { Component, OnInit } from '@angular/core';
import { AcademicService } from 'src/app/services/academic.service';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent implements OnInit {
  checkDir: boolean = true;
  subjectId!: number;
  yearId!: number;
  lessons: any[] = [];
  constructor(
    private _AcademicService: AcademicService,
    private toastr: ToastrService,
    private _HomesService: HomesService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    if (localStorage.getItem('currentLanguage') == 'ar') {
      this.checkDir = true;
    } else {
      this.checkDir = false;
    }

    // subjectId coming from years categories
    this.subjectId = Number(this._ActivatedRoute.snapshot.params?.['subjectId']);
    this.yearId = Number(this._ActivatedRoute.snapshot.params?.['yearId']);
  }

  ngOnInit(): void {
    this.getSubjectLessons();
  }

  // get subject lessons
  getSubjectLessons() {
    this._HomesService.showLoader();
    this._AcademicService.getSubjectLessons(this.subjectId).subscribe(
      (response) => {
        if (response.status == 200) {
          this.lessons = response.data.data;
          this._HomesService.hideLoader();
        } else {
          this._HomesService.hideLoader();
          this.toastr.error(response.msg);
        }
      },
      (error) => {
        this._HomesService.hideLoader();
        this.toastr.error(error.statusText);
      }
    );
  }

  getLisson(free:any ,link: any) {
    if (free == 0) {
      $('.modals').show();
      $('.sub-modal').show(300);
    } else if (free == 1) {
    localStorage.setItem('lessonUrl', link);
    this._Router.navigate(['lesson']);
    }
  }

  goBack() {
    this._Router.navigate([`/years/subjects/${this.yearId}`]);
  }

  // 5- if user try to open lock above posts
  openLock() {
    $('.modals').show();
    $('.sub-modal').show(300);
  }

  // 6- this function to send user to subscribe to ba able to use advantages of this website
  subNow() {
    $('.modals').hide();
    $('.sub-modal').hide(300);
    if (localStorage.getItem('token_api')) {
      this._Router.navigate(['/account/subscribe']);
    } else {
      this._Router.navigate(['/account/login']);
    }
  }

  // 7- to close modal
  closeModal() {
    $('.sub-modal').hide(300);
    $('.modals').hide();
  }
}
