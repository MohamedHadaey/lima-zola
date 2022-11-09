import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})

export class PostComponent implements OnInit {
  checkDir: boolean = true;
  postId: number = 0;
  categoryType: any;
  post: any = {};

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _HomesService: HomesService,
    private toastr: ToastrService,
    private location: Location,
    private _Router: Router,
    private _sanitizer:DomSanitizer
  ) {
    if(this._ActivatedRoute.snapshot.params?.['categoryId'] == localStorage.getItem("categoryId") && this._ActivatedRoute.snapshot.params?.['postId'] == localStorage.getItem("postId")){
    }else{
      this._Router.navigate(["/kids"]);
    }
    this.postId = this._ActivatedRoute.snapshot.params?.['postId'];
    this.categoryType = this._ActivatedRoute.snapshot.params?.['categoryType'];
    if (localStorage.getItem('currentLanguage') == 'ar') {
      this.checkDir = true;
    } else {
      this.checkDir = false;
    }
    this.postDetails();
  }

  ngOnInit(): void {

  }

  finalUrl:any= localStorage.getItem("videoUrl");
  videoUrl:any;
  postBody:any;
  // function to get post details
  postDetails() {
    this._HomesService.getPostDetails(this.postId).subscribe((response) => {
      if (response.status == 200) {
        this.post = response.data;
        this.postBody = this._sanitizer.bypassSecurityTrustHtml(this.post.body);
        this._HomesService.hideLoader();
        } else {
        this.toastr.error(response.msg);
        this._HomesService.hideLoader();
      }
    });
  }

  // go back button function
  goBack(): void {
    this.location.back();
  }

 /* video plugin */

 player!: Plyr;

videoSources: Plyr.Source[] = [
  {
    src:  this.finalUrl,
    provider: "html5",
  },
];

played(event: Plyr.PlyrEvent) {
}

play(): void {
  this.player.play(); // or this.plyr.player.play()
}

closeVideo(){
  this.location.back();
}
}
