import { environment } from './../../environments/environment';
import { AuthService } from './../seguranca/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as moment from 'moment';
import { AbstractService } from '../core/AbstractService';
import { Lancamento } from '../core/models/Lancamento.model';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina = 0;
  itensPorPagina = 4;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService extends AbstractService {

  url: string;

  constructor( private http: HttpClient, private authService: AuthService ) {
    super();
    this.url = `${environment.apiURL}/lancamentos`;
  }

  async adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post(this.url, this.getLancamentoDto(lancamento), this.httpOptions())
      .toPromise()
      .then(response => (response as any));
  }

  async pesquisar(lancamentoFiltro: LancamentoFiltro): Promise<any> {
    return this.http.get(`${this.url}?resumo`, this.httpOptions(this.validarParametro(lancamentoFiltro)))
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

  async excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.url}/${codigo}`, this.httpOptions())
      .toPromise()
      .then(() => null);
  }

  async buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get(`${this.url}/${codigo}`, this.httpOptions())
      .toPromise()
      .then(response => {
          const result = (response as any) as Lancamento;
          const lancamento = result;

          lancamento.dataPagamento = result.dataPagamento ? moment(result.dataPagamento, 'YYYY-MM-DD').toDate() : null;
          lancamento.dataVencimento = result.dataVencimento ? moment(result.dataVencimento, 'YYYY-MM-DD').toDate() : null;

          return lancamento;
        }
      );
  }

  async atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put(`${this.url}/${lancamento.codigo}`, this.getLancamentoDto(lancamento), this.httpOptions())
      .toPromise()
      .then(response => {
        return (response as any) as Lancamento;
      });
  }

  private getLancamentoDto(lancamento: Lancamento): any {
    return {
      descricao: lancamento.descricao,
      dataVencimento: lancamento.dataVencimento,
      dataPagamento: lancamento.dataPagamento,
      valor: lancamento.valor,
      observacao: lancamento.observacao,
      tipo: lancamento.tipo,
      categoria: lancamento.categoria.codigo,
      pessoa: lancamento.pessoa.codigo
    };
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
