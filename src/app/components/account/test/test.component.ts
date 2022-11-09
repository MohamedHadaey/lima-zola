import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslationService } from 'src/app/services/translation.service';
declare var $: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  currentLanguage: any = '';
  checkDir: boolean = true;
  constructor(
    public translate: TranslateService,
    public _TranslationService: TranslationService
  ) {}

  ngOnInit(): void {}

  languagesForm: FormGroup = new FormGroup({
    language: new FormControl(localStorage.getItem('currentLanguage')),
  });

  submitLanguagesForm(languagesForm: FormGroup) {
    this._TranslationService.currentLang(languagesForm.value.language);
    if (languagesForm.value.language == 'en') {
      this._TranslationService.currentLang('en');
    } else {
      this._TranslationService.currentLang('ar');
    }
    if (localStorage.getItem('currentLanguage') == 'ar') {
      this.checkDir = true;
    } else {
      this.checkDir = false;
    }
  }
}
