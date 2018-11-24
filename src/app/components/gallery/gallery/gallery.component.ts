import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthService,
  ) {
    console.log(authService.user);
  }

  ngOnInit() {
  }

}
