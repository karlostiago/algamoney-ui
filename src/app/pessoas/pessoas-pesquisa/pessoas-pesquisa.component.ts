import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  pessoas = [];
  filtro = new PessoaFiltro();
  @ViewChild('tabela') grid: Table;

  constructor(
      private pessoaService: PessoaService,
      private confirmationService: ConfirmationService,
      private messageService: MessageService,
      private errorHandlerService: ErrorHandlerService,
      private title: Title,
      public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('AlgaMoney - Pesquisa de pessoas');
  }

  pesquisar(pagina = 0, recarregar = true): any {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        if (recarregar === true) {
          this.grid.reset();
        }
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      });
  }

  aoMudarPagina(event: LazyLoadEvent): void {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina, false);
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
      if (this.grid.first === 0) {
        this.pesquisar();
      }
      else {
        this.grid.reset();
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Pessoa excluída com sucesso.'
      });
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }
}
