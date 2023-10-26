import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "../../service/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //verification si le visiteur est authentifié
    if (this.authService.isAuthenticated()){

      //si l'utilisateur souhaite aller sur la page admin
      if(state.url == '/admin'){
        if (this.authService.isAdmin()){
          return true;
        } else {
          this.router.navigate(['/home']);
        }
      }
    }
  }

}
