import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private messegeService: MessageService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAccessTokenInvalido()) {
      return this.authService.obterNovoAccessToken()
        .then(() => {
          if (this.authService.isAccessTokenInvalido()) {
            this.router.navigate([ '/login' ]);
            return false;
          }
          return true;
        });
    }
    else if (route.data.roles && !this.authService.temQualquerPermissao(route.data.roles)) {
      this.messegeService.add({
        severity: 'error',
        summary: 'Acesso negado!'
      });

      return false;
    }

    return true;
  }

}
