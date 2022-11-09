import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.scss']
})
export class ForgetpassComponent implements OnInit {

  public data: Array<any> = [];
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService,
    private _HomesService:HomesService
  ) {
  }

  forgetPassForm: FormGroup = new FormGroup({
    phone: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(5)
    ])
  });

  submitforgetPassForm(forgetPassForm: FormGroup) {
    this._HomesService.showLoader();
    // if user delete [disabled]="forgetPassForm.invalid" from html inspect
    if (forgetPassForm.invalid) {
      return;
    } else {
      this._AuthService.phoneChangePass = this.forgetPassForm.value.phone;
      this._AuthService
        .forgetPassword(this.forgetPassForm.value)
        .subscribe((response) => {
          if (response.status == 200) {
            this.toastr.success(response.msg);
            this._Router.navigate(['/account/varifypassword']);
          }else {
            this._HomesService.hideLoader();
            this.toastr.error(response.msg);
          }
        });
        this.forgetPassForm.reset()
    }
  }

  ngOnInit(): void {}
}
