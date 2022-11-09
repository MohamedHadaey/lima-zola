import { Component, OnInit } from '@angular/core';
import { HomesService } from 'src/app/services/homes.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.scss'],
})
export class KidsComponent implements OnInit {
  kidsCategories: any = [];
  kidsRoute: any = [
    { name: 'cartoon' },
    { name: 'tales' },
    { name: 'stories' },
    { name: 'articles' },
  ];
  constructor(
    private _HomesService: HomesService,
    private toastr: ToastrService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.getKids();
  }

  // 1- show kids categories
  getKids() {
    this._HomesService.showLoader();
    this._HomesService.getKidsCategories().subscribe((response) => {
      if (response.status == 200) {
        this.kidsCategories = response.data.categories;
        localStorage.setItem('subscriber', response.data.subscriber);
        this._HomesService.hideLoader();
      } else {
        this.toastr.error(response.msg, 'Failed!');
        this._HomesService.hideLoader();
      }
    });
  }

  // 2- get kids categories
  getCategory(id: any, type: any) {
    if (id == 4) {
      $('.modals').show();
      $('.sub-modal').show(300);
    } else {
      this._Router.navigate(['/posts', id, type]);
    }
  }

  // 3- to close modal
  closeModal() {
    $('.sub-modal').hide(300);
    $('.modals').hide();
  }

  // 4- after shownig mothers pop up message
  continueBrowsing() {
    this.closeModal();
    this._Router.navigate(['/posts', 4, 'video']);
  }
}
