import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss'],
})
export class NewpasswordComponent implements OnInit {
  visible: boolean = true;
  changeType: boolean = true;
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService,
    private _HomesService: HomesService
  ) {}

  newPasswordForm: FormGroup = new FormGroup({
    phone: new FormControl(this._AuthService.phoneChangePass, [
      Validators.required,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
    ]),
    password_confirmation: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
    ]),
  });

  changeUserPassword(newPasswordForm: FormGroup) {
    this._HomesService.showLoader();
    // if user delete [disabled]="registerForm.invalid" from html inspect
    if (newPasswordForm.invalid) {
      return;
    } else {
      this._AuthService
        .changePassword(this.newPasswordForm.value)
        .subscribe((response) => {
          if (response.status == 200) {
            this.toastr.success(response.msg);
            this._Router.navigate(['/account/login']);
          } else {
            this._HomesService.hideLoader();
            this.toastr.error(response.msg);
          }
        });
    }
    this.newPasswordForm.reset();
  }

  ngOnInit(): void {}


  // this function to show and hide password
  viewPassword() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
}
