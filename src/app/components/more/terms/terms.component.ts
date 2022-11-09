import { Component, OnInit } from '@angular/core';
import { HomesService } from 'src/app/services/homes.service';
import { PagesService } from 'src/app/services/pages.service';
declare var $: any;

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {
  Terms: any = [];
  constructor(private _PagesService: PagesService,private _HomesService:HomesService) {
    this.getTermsData();
  }

  ngOnInit(): void {}

  // 1- to get text of terms
  getTermsData() {
    this._HomesService.showLoader();
    this._PagesService.getTerms().subscribe((response) => {
      this.Terms = response.data;
      this._HomesService.hideLoader();
    });
  }
}
