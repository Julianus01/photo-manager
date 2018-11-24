import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/take';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // constructor(
  //   public authService: AuthService,
  //   private router: Router
  // ) { }

  // canActivate(): boolean {
  //   if (!this.authService.user) {
  //     console.log(this.authService.user);
  //     console.log('not logged in');
  //     this.router.navigate(['/login']);
  //     return false;
  //   }

  //   console.log('logged in');
  //   return true;
  // }

  constructor(private afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    //   return this.afAuth.authState.map((auth) => {
    //     if (!auth) {
    //       this.router.navigateByUrl('login');
    //       return false;
    //     }
    //     return true;
    // }).take(1);

    console.log(this.authService.user)
    if (this.authService.user) { return true };

    this.router.navigate(['/login']);
    return false;
  }

}
