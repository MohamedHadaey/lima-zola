import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';

@Component({
  selector: 'app-varifypassword',
  templateUrl: './varifypassword.component.html',
  styleUrls: ['./varifypassword.component.scss'],
})
export class VarifypasswordComponent implements OnInit {
  numbers = new Array(4);
  code: any = '';
  data: any = { phone: this._AuthService.phoneChangePass, code: 2 };
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService,
    private _HomesService: HomesService
  ) {}

  ngOnInit(): void {}

  varifyForm: FormGroup = new FormGroup({
    code1: new FormControl(null, [Validators.required]),
    code2: new FormControl(null, [Validators.required]),
    code3: new FormControl(null, [Validators.required]),
    code4: new FormControl(null, [Validators.required]),
  });

  submitVarifyForm(varifyForm: FormGroup) {
    this._HomesService.showLoader();
    this.code = Number(
      `${varifyForm.value.code1}${varifyForm.value.code2}${varifyForm.value.code3}${varifyForm.value.code4}`
    );

    this.varify(this.code);
    this._AuthService.confirmCode(this.data).subscribe((response) => {
      if (response.status == 200) {
        this.toastr.success(response.msg);
        this._Router.navigate(['/account/newpassword']);
      } else {
        this._HomesService.hideLoader();
        this.toastr.error(response.msg);
      }
    });
    this.varifyForm.reset();
  }

  varify(code: any) {
    this.data.code = code;
  }

  // this is the best method to handle the code inputs in angular
  move(e: any, p: any, c: any, n: any) {
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if (length == maxlength) {
      if (n != '') {
        n.focus();
      }
    }
    if (e.key == 'Backspace') {
      if (p != '') {
        p.focus();
      }
    }
  }
}
