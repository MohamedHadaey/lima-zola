import { Component, OnInit } from '@angular/core';
import { HomesService } from 'src/app/services/homes.service';
import { PagesService } from 'src/app/services/pages.service';
declare var $: any;
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  aboutApp: any = [];
  constructor(
    private _PagesService: PagesService,
    private _HomesService: HomesService
  ) {
    this.getAboutAppData();
  }

  ngOnInit(): void {}

  // 1- to get about application text
  getAboutAppData() {
    this._HomesService.showLoader();
    this._PagesService.getAboutApp().subscribe((response) => {
      this.aboutApp = response.data;
      this._HomesService.hideLoader();
    });
  }
}
