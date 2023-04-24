import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'td-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  isRegistr: boolean = false;

  showPassword: boolean = false;
  showConfPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get fc(): any { return this.loginForm.controls; }

  isFieldInvalid(field: string) {
    const formField: any = this.loginForm.get(field);
    return (
      (!formField.valid && formField.touched && !formField.pristine) ||
      (!formField.valid && formField.dirty && !formField.pristine)
    );
  }

  displayFieldClass(field: string) {
    return { 'is-invalid': this.isFieldInvalid(field) };
  }

  fieldsValidation() {
    const form = this.loginForm;
    if (form.valid) {
      this.sendToAuthorize();

    } else {
      const fields = form.controls;
      for (let fieldsKey in fields) {
        if (!fields[fieldsKey].valid) {
          fields[fieldsKey].markAsTouched();
          fields[fieldsKey].markAsDirty();
        }
      }
    }
  }

  sendToAuthorize() {
    const { username, password, confPassword } = this.loginForm.value;

    if (this.isRegistr) {
      this.loginService.login(username, password).subscribe({
        next: value => {
          console.log(value);
          debugger
        }, error: err => {
          console.log(err);
          debugger;
        }
      });
    } else {
      this.loginService.login(username, password).subscribe({
        next: value => {
          console.log(value);
          debugger
        }, error: err => {
          console.log(err);
          debugger;
        }
      });
    }
  }

  onLogin() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.isRegistr = false;
  }

  onRegistration() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confPassword: ['', Validators.required],
    });
    this.isRegistr = true;
  }

  isAlreadyHasAccount() {
    this.isRegistr = !this.isRegistr;
    if (this.isRegistr) {
      this.onRegistration();
    } else {
      this.onLogin();
    }
  }
}
