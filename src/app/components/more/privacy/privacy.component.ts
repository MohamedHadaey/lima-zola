import { Component, OnInit } from '@angular/core';
import { HomesService } from 'src/app/services/homes.service';
import { PagesService } from 'src/app/services/pages.service';
declare var $: any;

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {
  Privacy: any = [];
  constructor(
    private _PagesService: PagesService,
    private _HomesService: HomesService
  ) {
    this.getPrivacyData();
  }

  ngOnInit(): void {}

  // 1- to get text of privacy
  getPrivacyData() {
    this._HomesService.showLoader();
    this._PagesService.getPrivacy().subscribe((response) => {
      this.Privacy = response.data;
      this._HomesService.hideLoader();
    });
  }
}
