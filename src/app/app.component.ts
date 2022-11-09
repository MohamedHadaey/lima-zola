import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './services/translation.service';
import disableDevtool from 'disable-devtool';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LimaZola';
  currentLanguage: any = '';
  constructor(
    public translate: TranslateService,
    private _TranslationService: TranslationService
  ) {
    this.currentLanguage = localStorage.getItem('currentLanguage') || 'ar';
    this.translate.use(this.currentLanguage);
    this._TranslationService.currentLang(this.currentLanguage);
    const body = document.getElementsByTagName('body');
    this._TranslationService.currentlang.subscribe((lang) => {
      // this if condition to check direction of all project according to current language
      if (lang == 'ar') {
        body[0].setAttribute('dir', 'rtl');
      } else {
        body[0].setAttribute('dir', 'ltr');
      }
    });

    // to disable inspect element, f12 button and developer tools
    disableDevtool();
  }
  ngOnInit(): void {
    $('.loading-screen').fadeOut(5000);
  }
}
