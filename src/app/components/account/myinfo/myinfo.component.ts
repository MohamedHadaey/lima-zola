import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HelpersService } from 'src/app/services/helpers.service';
import { HomesService } from 'src/app/services/homes.service';

@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.component.html',
  styleUrls: ['./myinfo.component.scss'],
})
export class MyinfoComponent implements OnInit {
  decoded: any;
  public data: Array<any> = [];
  cities: any = [];

  constructor(
    private _AuthService: AuthService,
    private toastr: ToastrService,
    private _HelpersService: HelpersService,
    private _HomesService: HomesService
  ) {
    this.getUserData();
  }

  // this method to get data of user directly
  getUserData() {
    this._HomesService.showLoader();
    this._AuthService.getProfileData().subscribe((response) => {
      this.profileForm.patchValue({ name: response.data.name });
      this.profileForm.patchValue({ phone: response.data.phone });
      this.profileForm.patchValue({ city_id: response.data.city_id });
      this._HomesService.hideLoader();
    });
  }

  profileForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(255),
    ]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    city_id: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(200),
    ]),
  });

  submitProfileForm(profileForm: FormGroup) {
    this._HomesService.showLoader();
    // if user delete [disabled]="registerForm.invalid" from html inspect
    if (profileForm.invalid) {
      this._HomesService.hideLoader();
      return;
    } else {
      this._AuthService
        .updateProfile(this.profileForm.value)
        .subscribe((response) => {
          if (response.status == 200) {
            this._HomesService.hideLoader();
            this.toastr.success(response.msg);
          } else {
            this._HomesService.hideLoader();
            this.toastr.error(response.msg);
          }
        });
    }
  }

  ngOnInit(): void {
    // to get name of cities
    this._HelpersService.getCities().subscribe((response) => {
      this.cities = response.data;
    });
  }
}
