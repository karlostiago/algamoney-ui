import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
  }

  async login(usuario: string, senha: string): Promise<void> {

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.url, body, { headers: this.getHttpHeader(), withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken((response as any).access_token);
      })
      .catch(response => {
        const httpResponse = (response as any);

        if (httpResponse.status === 400 && httpResponse.error.error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválida!');
        }

        return Promise.reject(httpResponse);
      });
  }

  async obterNovoAccessToken(): Promise<void> {
    const body = 'grant_type=refresh_token';

    return this.http.post(this.url, body, { headers: this.getHttpHeader(), withCredentials: true })
      .toPromise()
      .then(response => {
        const httpResponse = (response as any);
        this.armazenarToken(httpResponse.access_token);
        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  limparAccessToken(): void {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  temPermissao(permissao: string): boolean {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(permissoes: any): boolean {
    for (const permissao of permissoes) {
      if (this.temPermissao(permissao)) {
        return true;
      }
    }
    return false;
  }

  isAccessTokenInvalido(): boolean {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  private getHttpHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  private armazenarToken(token: string): void {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}
