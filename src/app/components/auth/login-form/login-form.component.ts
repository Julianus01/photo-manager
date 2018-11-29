import { Component, OnInit } from '@angular/core';
import { AuthService, EmailPasswordCredentials } from 'src/app/services/auth/auth.service';
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

  public async loginWithEmail(): Promise<any> {
    try {
      await this.authService.loginWithEmail(this.model);
      this.goToPosts();
    } catch (error) {
      this.showErrorMessageForMiliseconds(error.message);
    }
  }

  public async loginWithFacebook(): Promise<any> {
    try {
      await this.authService.loginWithFacebook();
      this.goToPosts();
    } catch (error) {
      this.showErrorMessageForMiliseconds(error.message);
    }
  }

  public async loginWithGoogle(): Promise<any> {
    try {
      await this.authService.loginWithGoogle();
      this.goToPosts();
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

  private goToPosts = () => this.router.navigate(['posts'])

}
