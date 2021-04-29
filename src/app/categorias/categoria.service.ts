import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../core/AbstractService';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends AbstractService {

  url: string;

  constructor( private http: HttpClient ) {
    super();
    this.url = `${environment.apiURL}/categorias`;
  }

  async todas(): Promise<any> {
    return this.http.get(this.url, this.httpOptions())
      .toPromise()
      .then(response => response);
  }
}
