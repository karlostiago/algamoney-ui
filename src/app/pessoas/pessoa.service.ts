import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 2;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  url = 'http://localhost:8080/pessoas';

  constructor( private http: HttpClient ) { }

  async pesquisar(pessoaFiltro: PessoaFiltro): Promise<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic YWRtaW5AZW1haWwuY29tOmFkbWlu'
      }),
      params: this.validarParametro(pessoaFiltro)
    };

    return this.http.get(this.url, httpOptions)
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
