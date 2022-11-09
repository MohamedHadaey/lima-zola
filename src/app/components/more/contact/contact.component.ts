import { Component, OnInit } from '@angular/core';
import { HomesService } from 'src/app/services/homes.service';
import { PagesService } from 'src/app/services/pages.service';
declare var $: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  links: any = [];
  constructor(private _PagesService: PagesService,private _HomesService:HomesService) {
    this.getContactLinks();
  }

  ngOnInit(): void {}

  // 1- to get links to contact
  getContactLinks() {
    this._HomesService.showLoader();
    this._PagesService.getLinks().subscribe((response) => {
      this.links = response.data;
      this._HomesService.hideLoader();
    });
  }
}
