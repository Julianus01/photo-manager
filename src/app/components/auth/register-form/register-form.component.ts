import { Component, OnInit } from '@angular/core';
import { AuthService, EmailPasswordCredentials } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
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
  ) { }

  ngOnInit() {
  }

  protected async createAccount() {
    try {
      const result = await this.authService.createAccount(this.model);
      console.log(result);
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

}
