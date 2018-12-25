import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginViewModel } from '../../../domain/models/signin/sigin';
import { signInservice } from '../../../domain/services/signIn/signIn.service';
import { TostService } from '../../../domain/services/sharedservices/tost.service';
import { UrlParamService } from '../../../domain/services/sharedservices/url-params-service';

@Component({
  selector: 'page-sign-in-1',
  templateUrl: './sign-in-1.component.html',
  styleUrls: ['./sign-in-1.component.scss']
})
export class PageSignIn1Component implements OnInit {
  loginModel: LoginViewModel;
  signInForm: FormGroup;

  constructor(
    private router: Router,
    private _signIn: signInservice,
    private tost: TostService,
    private urlHelper: UrlParamService,
    private formBuilder: FormBuilder) {

    this.createForm();
  }
  ngOnInit() {
    let lastparm =
      this.urlHelper.getlastParameter();
    if (lastparm.includes('logout')) {
      localStorage.clear();
      this.router.navigateByUrl('');
    } else {
      if (localStorage.getItem("user")) {
        this.router.navigate(['/default-layout/dashboard']);
      }
    }
  }
  forgotPage() {
    this.router.navigate(['/default-layout/forgotPassword']);
  }
  createForm() {
    this.signInForm = this.formBuilder.group({
      email: ['',
        [Validators.required, Validators.email]
      ],
      password: ['',
        //[Validators.required,Validators.minLength(6)]
        // Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")]
      ],
      rememberMe: ''
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      // this.tost.info('please wait ......', 'Signing In !');
      this.loginModel = new LoginViewModel();
      this.loginModel.email = this.signInForm.controls["email"].value;
      this.loginModel.password = this.signInForm.controls["password"].value;
      this.loginModel.rememberMe = this.signInForm.controls["rememberMe"].value;
      if (this.loginModel.rememberMe) {
        this.loginModel.rememberMe = true;
      } else {
        this.loginModel.rememberMe = false;
      }

      this._signIn.Login(this.loginModel)
        .subscribe(
          data => {
            if (data) { 
              if (data.isDisable) {
                this.tost.error("your account has disabled.Please contact admin");
                return false;
              }
              this.loginModel = new LoginViewModel();
              if (Number.isInteger(data.userId)) 
              {
                this.loginModel.userId = JSON.stringify(data.userId);   
              }
              if (Number.isInteger(data.roleId)) 
              {
                this.loginModel.roleId = JSON.stringify(data.roleId); 
              }
             
              this.loginModel.email = this.signInForm.controls["email"].value;
              localStorage.setItem("user", JSON.stringify(this.loginModel));
              // localStorage.setItem('role', JSON.stringify(data.roleId));             
              this.router.navigate(['/default-layout/dashboard']);
            } else {
              this.tost.error("Incorrect Email or password.");
            }
          },
          error => {
            this.tost.generalhttpError();
          }
        );
    }

  }
}
