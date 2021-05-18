import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: any;
  loginForm: FormGroup;
  hide: boolean;
  constructor() {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email]) ,
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25),
        Validators.pattern('^[\\w]*$')]),
    });
    this.hide = true;
  }

  ngOnInit(): void {
  }

  changeHideValue(): void {
    this.hide = !this.hide;
  }
  // convenience getter for easy access to form fields
  public loginNow(): void {
  }

  get input(): any {
    return this.loginForm.get('email');
  }

}
