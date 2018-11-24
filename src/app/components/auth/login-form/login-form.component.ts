import { Component, OnInit } from '@angular/core';
import { AuthService, EmailPasswordCredentials } from 'src/app/services/auth/auth.service';
import { TouchSequence } from 'selenium-webdriver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  private DEFAULT_SHOW_ERROR_TIME = 4000; // ms

  error = {
    hasError: false,
    message: '',
  };
  model: EmailPasswordCredentials = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() { }

  protected async loginWithEmail(): Promise<any> {
    try {
      const result = await this.authService.loginWithEmail(this.model);
      this.goToGallery();
      console.log(result);
    } catch (error) {
      this.showErrorMessageForMiliseconds(error.message);
    }
  }

  protected async loginWithFacebook(): Promise<any> {
    try {
      const result = await this.authService.loginWithFacebook();
      console.log(result);
      this.goToGallery();
    } catch (error) {
      this.showErrorMessageForMiliseconds(error.message);
    }
  }

  protected async loginWithGoogle(): Promise<any> {
    try {
      const result = await this.authService.loginWithGoogle();
      console.log(result);
      this.goToGallery();
    } catch (error) {
      this.showErrorMessageForMiliseconds(error.message);
    }
  }

  private showErrorMessageForMiliseconds(message: string, ms: number = this.DEFAULT_SHOW_ERROR_TIME): void {
    this.error = { hasError: true, message };

    setTimeout((): void => {
      this.error = { ...this.error, hasError: false };
    }, ms);
  }

  private goToGallery = () => this.router.navigate(['gallery'])

}
