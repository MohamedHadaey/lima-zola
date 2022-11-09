import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  visible: boolean = true;
  changeType: boolean = true;
  checkDir:boolean=true;

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService,
    private _HomesService:HomesService
  ) {
    if(localStorage.getItem("currentLanguage") == "ar"){
      this.checkDir=true;
    }else{
      this.checkDir=false;
    }

  }

  loginForm: FormGroup = new FormGroup({
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{3,50}$/),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
    ]),
  });

  submitLoginForm(loginForm: FormGroup) {
    this._HomesService.showLoader();
    // if user delete [disabled]="registerForm.invalid" from html inspect
    if (loginForm.invalid) {
      return;
    } else {
      this._AuthService.signIn(this.loginForm.value).subscribe((response) => {
        if (response.status == 200) {
          this._AuthService.token_api = response.data.token_api;
          localStorage.setItem('token_api', response.data.token_api);
          this._AuthService.saveUserData();
          this.toastr.success(response.msg);
          this._Router.navigate(['/kids']);
          localStorage.setItem("subscriber",response.data.subscriber);
        } else {
          this._HomesService.hideLoader();
          this.toastr.error(response.msg);
        }
      });
    }
    this.loginForm.reset();
  }

  ngOnInit(): void {}

  // this function to show and hide password
  viewPassword() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
}
