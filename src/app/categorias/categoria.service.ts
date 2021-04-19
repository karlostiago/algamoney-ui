import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../core/AbstractService';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends AbstractService {

  url = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { super(); }

  async todas(): Promise<any> {
    return this.http.get(this.url, this.httpOptions())
      .toPromise()
      .then(response => response);
  }
}
