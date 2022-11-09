import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from 'src/app/services/favorites.service';
import { HomesService } from '../../services/homes.service';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  checkDir: boolean = true;
  categoryId: number = 0;
  categoryType: any = '';
  subCategories: any;
  posts: any = [];
  post_id_data: any = { post_id: 5 };
  category_shown: any;
  constructor(
    private _HomesService: HomesService,
    private toastr: ToastrService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _FavoritesService: FavoritesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // categoryId and categoryType coming from kids and moms categories
    this.categoryId = Number(this._ActivatedRoute.snapshot.params?.['categoryId']);
    this.categoryType = this._ActivatedRoute.snapshot.params?.['categoryType'];
    // to check direction according to website language
    if (localStorage.getItem('currentLanguage') == 'ar') {
      this.checkDir = true;
    } else {
      this.checkDir = false;
    }
    this.showSubcategories();
    this.getPostsData();
  }

  // 1- to get subcategories
  showSubcategories() {
    this._HomesService
      .getSubcategories(this.categoryId)
      .subscribe((response) => {
        if (response.status == 200) {
          this.subCategories = response.data;
        } else {
          this.toastr.error(response.msg);
        }
      });
  }

  // 2- to get posts data
  getPostsData() {
    this._HomesService.showLoader();
    if (this.categoryType == 'article') {
      this._HomesService.getPosts(this.categoryId).subscribe((response) => {
        if (response.status == 200) {
          this.posts = response.data.data;
        } else {
          this.toastr.error(response.msg);
        }
        this._HomesService.hideLoader();
      });
    } else if (this.categoryType == 'video') {
      this._HomesService.getPosts(this.categoryId).subscribe((response) => {
        if (response.status == 200) {
          this.posts = response.data.data;
          this.category_shown = this.categoryId;
        } else {
          this.toastr.error(response.msg);
        }
        this._HomesService.hideLoader();
      });
    }
  }

  // 3- to get teacher posts in limazola website
  getTeacherPosts(id: any) {
    this._HomesService.showLoader();
    this._HomesService.getPosts(id).subscribe((response) => {
      if (response.status == 200) {
        this.posts = response.data.data;
        this.category_shown = id;
      } else {
        this.toastr.error(response.msg);
      }
      this._HomesService.hideLoader();
    });
  }

  // 4- showing posts according to subscribtion or no
  showPost(id: any, free: any, url:any) {
    if (free == 0) {
      $('.modals').show();
      $('.sub-modal').show(300);
    } else if (free == 1) {
      localStorage.setItem("categoryId" , JSON.stringify(this.categoryId));
      localStorage.setItem("categoryType" , JSON.stringify(this.categoryType));
      localStorage.setItem("postId" , JSON.stringify(id));
      localStorage.setItem("videoUrl" , url);
      this._Router.navigate([
        `/posts/${this.categoryId}/${this.categoryType}/post`,
        id,
      ]);
    }
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

  // 8- go back button
  goBack(): void {
    this.location.back();
  }

  // 9- make love function
  makeLove(id: any, free: any) {
    if (
      Number(localStorage.getItem('subscriber')) == 0 ||
      !localStorage.getItem('token_api')
    ) {
      $('.modals').show();
      $('.sub-modal').show(300);
    } else {
      this.post_id_data.post_id = id;
      this._FavoritesService
        .addFavourite(this.post_id_data)
        .subscribe((response) => {
          if (response.status == 200) {
            if (this.category_shown == 7) {
              this._HomesService
                .getPosts(this.category_shown)
                .subscribe((response) => {
                  if (response.status == 200) {
                    this.posts = response.data.data;
                  }else{
                    this.toastr.error(response.msg);
                  }
                });
            } else {
              this._HomesService
                .getPosts(this.category_shown)
                .subscribe((response) => {
                  if (response.status == 200) {
                    this.posts = response.data.data;
                  } else {
                    this.toastr.error(response.msg);
                  }
                });
            }
          }else{
            this.toastr.error(response.msg);
          }
        });
    }
  }

  // 10- make like function
  makeLike(id: any, free: any) {
    if (Number(localStorage.getItem('subscriber')) == 0) {
      $('.modals').show();
      $('.sub-modal').show(300);
    } else {
      this.post_id_data.post_id = id;
      this._HomesService.addLike(this.post_id_data).subscribe((response) => {
        if (response.status == 200) {
          if (this.category_shown == 7) {
            this._HomesService
              .getPosts(this.category_shown)
              .subscribe((response) => {
                if (response.status == 200) {
                  this.posts = response.data.data;
                }else{
                  this.toastr.error(response.msg);
                }
              });
          } else {
            this._HomesService
              .getPosts(this.category_shown)
              .subscribe((response) => {
                if (response.status == 200) {
                  this.posts = response.data.data;
                } else {
                  this.toastr.error(response.msg);
                }
              });
          }
        }else{
          this.toastr.error(response.msg);
        }
      });
    }
  }
}
