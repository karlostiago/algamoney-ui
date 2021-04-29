import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  url: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.url = `${environment.apiURL}/tokens/revoke`;
  }

  async logout(): Promise<void> {
    return this.http.delete(this.url, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.authService.limparAccessToken();
      });
  }
}
