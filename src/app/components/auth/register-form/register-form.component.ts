import { Component, OnInit } from '@angular/core';
import { AuthService, EmailPasswordCredentials } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  model: EmailPasswordCredentials = {
    email: '',
    password: '',
  }

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  protected async createAccount(formData: EmailPasswordCredentials) {
    console.log('here');
    return;

    try {
      const result = await this.authService.createAccount(formData);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

}
