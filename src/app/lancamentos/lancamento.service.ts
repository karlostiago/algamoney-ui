import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  url = 'http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient
  ) { }

  pesquisar(): Promise<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic YWRtaW5AZW1haWwuY29tOmFkbWlu'
      })
    };

    return this.http.get(`${this.url}?resumo`, httpOptions)
      .toPromise()
      .then(response => response);
  }
}
