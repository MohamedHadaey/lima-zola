import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';
declare var $: any;

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent implements OnInit {
  currentLanguage: any = '';
  checkDir: boolean = true;
  posts: any = [];
  constructor(
    private _FavoritesService: FavoritesService,
    private toastr: ToastrService,
    private _HomesService: HomesService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentLanguage') == 'ar') {
      this.checkDir = true;
    } else {
      this.checkDir = false;
    }
    this.showFavourites();
  }

  // show favourite posts
  showFavourites() {
    this._HomesService.showLoader();
    this._FavoritesService.getFavourites().subscribe((response) => {
      if (response.status == 200) {
        this.posts = response.data.data;
        this._HomesService.hideLoader();
      } else {
        this.toastr.error(response.msg);
      }
    });
  }

  // if you want to make disLove on post
  post_id_data: any = { post_id: 5 };
  makeLove(id: any) {
    this.post_id_data.post_id = id;
    this._FavoritesService
      .addFavourite(this.post_id_data)
      .subscribe((response) => {
        if (response.status == 200) {
          this.toastr.success(response.msg);
          this._FavoritesService.getFavourites().subscribe((response) => {
            if (response.status == 200) {
              this.posts = response.data.data;
            } else {
              this.toastr.error(response.msg);
            }
          });
        } else {
          this.toastr.error(response.msg);
        }
      });
  }

  // if you want to make disLike on post
  makeLike(id: any) {
      this.post_id_data.post_id = id;
      this._HomesService.addLike(this.post_id_data).subscribe((response) => {
        if (response.status == 200) {
          this.toastr.success(response.msg);
          this._FavoritesService.getFavourites().subscribe((response) => {
            if (response.status == 200) {
              this.posts = response.data.data;
            } else {
              this.toastr.error(response.msg);
            }
          });
        }else{
          this.toastr.error(response.msg);
        }
      });
  }

}
