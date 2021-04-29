import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  clicou = false;

  @ViewChild('tabela') grid: Table;

  constructor(
    private lancamentoService: LancamentoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('AlgaMoney - Pesquisa de lançamentos');
  }

  pesquisar(pagina = 0, recarregar = true): any {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        if (recarregar === true) {
          this.grid.reset();
        }
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent): void {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina, false);
  }

  confirmarExclusao(lancamento: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  private excluir(lancamento: any): void {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {

        if (this.grid.first === 0) {
          this.pesquisar();
        }
        else {
          this.grid.reset();
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Lançamento excluído com sucesso.'
        });
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }
}
