import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() { 
    console.log(this.authService.user.subscribe(user => console.log(user.photoURL)))
  }

  protected showNav = (): boolean =>
    window.location.href.includes('login') ? false : true;

}
