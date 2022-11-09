import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AcademicService } from 'src/app/services/academic.service';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  mapURL!: SafeResourceUrl;
  finalUrl:any="";
  constructor(private _AcademicService:AcademicService, private toastr: ToastrService, private _HomesService: HomesService, private _Router: Router, private _ActivatedRoute: ActivatedRoute, private location: Location, public sanitizer: DomSanitizer) {
   }

  ngOnInit(): void {
  }


lessonUrl:any= localStorage.getItem("lessonUrl");
  // or get it from plyrInit event
player!: Plyr;

videoSources: Plyr.Source[] = [
  {
    src:  this.lessonUrl,
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
