import { HttpHeaders, HttpParams } from '@angular/common/http';

export abstract class AbstractService {

  constructor() { }

  httpOptions(params: HttpParams = new HttpParams()): any {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YWRtaW5AZW1haWwuY29tOmFkbWlu');
    headers = headers.append('Content-Type', 'application/json');

    return {
      headers,
      params
    };
  }
}
