import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../core/AbstractService';
import { Pessoa } from '../core/models/Pessoa.model';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 2;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService extends AbstractService {

  url = 'http://localhost:8080/pessoas';

  constructor( private http: HttpClient ) { super(); }

  async adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this.url, JSON.stringify(pessoa), this.httpOptions())
      .toPromise()
      .then(response => (response as any));
  }

  async status(pessoa: any): Promise<void> {
    return this.http.put(`${this.url}/${pessoa.codigo}/ativo`, !pessoa.ativo, this.httpOptions())
      .toPromise()
      .then(() => null);
  }

  async excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.url}/${codigo}`, this.httpOptions())
      .toPromise()
      .then(() => null);
  }

  async pesquisar(pessoaFiltro: PessoaFiltro): Promise<any> {
    return this.http.get(this.url, this.httpOptions(this.validarParametro(pessoaFiltro)))
      .toPromise()
      .then(response => {
        const pessoas = (response as any).content;
        const resultado = {
          pessoas,
          total: (response as any).totalElements
        };

        return  resultado;
      });
  }

  private validarParametro(pessoaFiltro: PessoaFiltro): HttpParams {
    let params = new HttpParams();

    params = params.set('page', pessoaFiltro.pagina.toString());
    params = params.set('size', pessoaFiltro.itensPorPagina.toString());

    if (pessoaFiltro.nome) {
      params = params.set('nome', pessoaFiltro.nome);
    }

    return params;
  }
}
