import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  url = 'http://localhost:8080/tokens/revoke';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  async logout(): Promise<void> {
    return this.http.delete(this.url, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.authService.limparAccessToken();
      });
  }
}
