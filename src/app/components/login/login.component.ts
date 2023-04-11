import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'td-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  ngOnInit() {

  }

  fieldsValidation() {
    const form = this.loginForm;
    console.log(form);
    debugger;
    if (form.valid) {
      alert('good');
    } else {
      alert('bad');
    }
  }
}
