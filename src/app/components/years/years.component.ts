import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AcademicService } from 'src/app/services/academic.service';
import { HomesService } from 'src/app/services/homes.service';

@Component({
  selector: 'app-years',
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.scss'],
})
export class YearsComponent implements OnInit {
  academicYears: any[] = [];
  constructor(
    private _AcademicService: AcademicService,
    private toastr: ToastrService,
    private _HomesService: HomesService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.getAcademicYears();
  }

  // get acadimic years
  getAcademicYears() {
    this._HomesService.showLoader();
    this._AcademicService.getAcademicYears().subscribe(
      (response) => {
        if (response.status == 200) {
          this.academicYears = response.data.data;
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

  // get year subjects
  getYear(id: any) {
    this._Router.navigate(['/years/subjects', id]);
  }
}
