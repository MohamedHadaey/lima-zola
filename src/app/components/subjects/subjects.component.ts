import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicService } from 'src/app/services/academic.service';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit {
  checkDir: boolean = true;
  yearId!: number;
  subjects: any[] = [];
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

    // yearId coming from years categories
    this.yearId = Number(this._ActivatedRoute.snapshot.params?.['yearId']);
    this.getYearSubjects();
  }

  ngOnInit(): void {
  
  }

  // get year subjects
  getYearSubjects() {
    this._HomesService.showLoader();
    this._AcademicService.getYearSubjects(this.yearId).subscribe(
      (response) => {
        if (response.status == 200) {
          this.subjects = response.data.data;
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

  // get subject lessons
  getSubject(id: any) {
    this._Router.navigate([`years/subjects/${this.yearId}/subject`, id]);
  }
}
