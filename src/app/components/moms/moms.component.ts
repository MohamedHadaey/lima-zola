import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';

@Component({
  selector: 'app-moms',
  templateUrl: './moms.component.html',
  styleUrls: ['./moms.component.scss'],
})
export class MomsComponent implements OnInit {
  momsCategories: any = [];
  constructor(
    private _HomesService: HomesService,
    private toastr: ToastrService
  ) {
    this.getMoms();
  }

  ngOnInit(): void {}

  // 1- show moms categories
  getMoms() {
    this._HomesService.showLoader();
    this._HomesService.getMomsCategories().subscribe((response) => {
      if (response.status == 200) {
        this.momsCategories = response.data.categories;
        localStorage.setItem('subscriber', response.data.subscriber);
        this._HomesService.hideLoader();
      } else {
        this.toastr.error(response.msg, 'Failed!');
        this._HomesService.hideLoader();
      }
    });
  }
}
