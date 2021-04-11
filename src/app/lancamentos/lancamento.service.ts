import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina = 0;
  itensPorPagina = 2;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  url = 'http://localhost:8080/lancamentos';

  constructor( private http: HttpClient ) { }

  async pesquisar(lancamentoFiltro: LancamentoFiltro): Promise<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic YWRtaW5AZW1haWwuY29tOmFkbWlu'
      }),
      params: this.validarParametro(lancamentoFiltro)
    };

    return this.http.get(`${this.url}?resumo`, httpOptions)
      .toPromise()
      .then(response => {
        const lancamentos = (response as any).content;
        const resultado = {
          lancamentos,
          total: (response as any).totalElements
        };

        return resultado;
      });
  }

  private validarParametro(lancamentoFiltro: LancamentoFiltro): HttpParams {
    let params = new HttpParams();

    params = params.set('page', lancamentoFiltro.pagina.toString());
    params = params.set('size', lancamentoFiltro.itensPorPagina.toString());

    if (lancamentoFiltro.descricao) {
      params = params.set('descricao', lancamentoFiltro.descricao);
    }

    if (lancamentoFiltro.dataVencimentoDe) {
      params = params.set('dataVencimentoDe', moment(lancamentoFiltro.dataVencimentoDe).format('YYYY-MM-DD'));
    }

    if (lancamentoFiltro.dataVencimentoAte) {
      params = params.set('dataVencimentoAte', moment(lancamentoFiltro.dataVencimentoAte).format('YYYY-MM-DD'));
    }

    return params;
  }
}
