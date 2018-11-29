import { Component, OnInit } from '@angular/core';
import { AuthService, EmailPasswordCredentials } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  private DEFAULT_SHOW_ERROR_TIME = 5000; // ms

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

  ngOnInit() {
  }

  public async createAccount() {
    try {
      await this.authService.createAccount(this.model);
      this.router.navigate(['/posts']);
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
