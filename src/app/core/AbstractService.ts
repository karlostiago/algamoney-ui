import { HttpHeaders, HttpParams } from '@angular/common/http';

export abstract class AbstractService {

  constructor() { }

  httpOptions(params: HttpParams = new HttpParams()): any {
    return {
      headers: new HttpHeaders({
        Authorization: 'Basic YWRtaW5AZW1haWwuY29tOmFkbWlu'
      }),
      params
    };
  }
}
