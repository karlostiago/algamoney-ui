import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { PessoaService, PessoaFiltro } from './../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  pessoas = [];
  filtro = new PessoaFiltro();
  @ViewChild('tabela') tabela: any;

  constructor(
      private pessoaService: PessoaService,
      private confirmationService: ConfirmationService,
      private messageService: MessageService,
      private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  pesquisar(pagina = 0): any {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      });
  }

  aoMudarPagina(event: LazyLoadEvent): void {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  atualizaStatus(pessoa: any): void {
    this.pessoaService.status(pessoa)
      .then(() => {
        pessoa.ativo = !pessoa.ativo;

        this.messageService.add({
          severity: 'success',
          summary: `Pessoa ${pessoa.ativo ? 'ativada' : 'desativada'} com sucesso.`
        });
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  private excluir(pessoa: any): void {
    this.pessoaService.excluir(pessoa.codigo)
    .then(() => {
      this.tabela.first = 0;
      this.pesquisar();

      this.messageService.add({
        severity: 'success',
        summary: 'Pessoa excluída com sucesso.'
      });
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }
}
