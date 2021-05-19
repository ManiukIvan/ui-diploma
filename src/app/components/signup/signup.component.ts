import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  message: any;
  registerForm: FormGroup;
  hidePassword: boolean;
  hideConfirmPassword: boolean;
  constructor() {
    this.registerForm = new FormGroup({
        login: new FormControl('', [ Validators.required, Validators.email]),
        firstName: new FormControl('', [ Validators.required, Validators.maxLength(25)]),
        lastName: new FormControl('', [ Validators.required, Validators.maxLength(25)]),
        password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(25),
          Validators.pattern('^[\\w]*$')]),
        confirmPassword: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
      }, MustMatch('password', 'confirmPassword')
    );
    this.hidePassword = true;
    this.hideConfirmPassword = true;
  }

  ngOnInit(): void {
  }

  public registerNow(): void {
    // clear field
    this.message = null;
  }

  changeHidePasswordValue(): void {
    this.hidePassword = !this.hidePassword;
  }

  changeHideConfirmPasswordValue(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

}

// return null or set error if passwords don't match
function MustMatch(controlName: string, matchingControlName: string): any {
  // @ts-ignore
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return null;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
