import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../Services/user/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AsgardGuard implements CanActivate {
  constructor(private us: UserService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.us.authState.pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/sign-in'], {
            queryParams: {
              redirectTo: state.url,
            },
            queryParamsHandling: 'merge'
          });
        }
        return !!user;
      })
    );
  }
}
