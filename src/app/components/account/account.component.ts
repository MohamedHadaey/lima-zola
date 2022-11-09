import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  isLogin: boolean = false;
  userDetails: any = {};
  checkDir: boolean = true;
  subscriber: any = localStorage.getItem('subscriber');
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService
  ) {
    if (localStorage.getItem('currentLanguage') == 'ar') {
      this.checkDir = true;
    } else {
      this.checkDir = false;
    }
  }

  ngOnInit(): void {
    // this method used to watch userData contenously
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
        this.userDetails = this._AuthService.userData.value;
      } else {
        this.isLogin = false;
      }
    });
  }

  // 1- to get logout
  getOut() {
    this._AuthService
      .logOut(`Bearer ${localStorage.getItem('token_api')}`)
      .subscribe((response) => {
        if (response.status == 200) {
          this.toastr.success(response.msg);
          localStorage.removeItem('token_api');
          this._AuthService.userData.next(null);
          this._Router.navigate(['/account']);
        } else {
          this.toastr.error(response.msg);
        }
      });
  }
}
