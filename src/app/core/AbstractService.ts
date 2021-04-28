import { HttpHeaders, HttpParams } from '@angular/common/http';

export abstract class AbstractService {

  constructor() { }

  httpOptions(params: HttpParams = new HttpParams()): any {
    return {
      headers: this.getHttpHeaders(),
      params
    };
  }

  private getHttpHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');

    headers = headers.append('Authorization', `Bearer ${token}`);
    headers = headers.append('Content-Type', 'application/json');

    return headers;
  }
}
