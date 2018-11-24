import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }


  canActivate = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean =>
    this.afAuth.authState.pipe(take(1), map((auth) => {
      if (!auth) {
        this.router.navigate(['/login']);
        return false;
      }

      if (state.url === '/login') {
        this.router.navigate(['/gallery']);
        return false;
      }

      return true;
    }))

}
