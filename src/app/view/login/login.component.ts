import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequestDTO } from 'src/app/model/dto/authentication/login-request-dto';
import { AuthenticationServiceACI } from 'src/app/service/authentication/authentication.service.aci';
import { take } from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword = true;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationServiceACI,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  showHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authenticationService.signIn(this.loginForm.getRawValue() as LoginRequestDTO).pipe(take(1))
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['']);
        }
      });
    }
  }
}
