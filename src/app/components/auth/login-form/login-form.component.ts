import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() { }

  protected async createAccount(formData) {
    try {
      const result = await this.authService.createAccount(formData);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  protected async loginWithFacebook(): Promise<any> {
    try {
      const result = await this.authService.loginWithFacebook();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  protected async loginWithGoogle(): Promise<any> {
    try {
      const result = await this.authService.loginWithGoogle();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

}
