import { AuthService } from './../seguranca/auth.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';

export abstract class AbstractService {

  constructor() { }

  httpOptions(params: HttpParams = new HttpParams()): any {
    return {
      headers: this.getHttpHeaders(),
      params
    };
  }

  isAccessTokenValido(authService: AuthService): boolean {
    if (authService.isAccessTokenInvalido()) {
      authService.obterNovoAccessToken()
        .then(() => {
          return true;
        });

      return true;
    }

    return false;
  }

  private getHttpHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');

    headers = headers.append('Authorization', `Bearer ${token}`);
    headers = headers.append('Content-Type', 'application/json');

    return headers;
  }
}
