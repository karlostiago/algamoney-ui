import { LancamentoService } from './../lancamento.service';
import { FormControl } from '@angular/forms';
import { PessoaService, PessoaFiltro } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Constants } from './../../shared/Constants';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/models/Lancamento.model';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

const CODIGO = 'codigo';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  pt = Constants.ptBR;
  tipos = Constants.tipos;
  categorias = Constants.categorias;
  pessoas = Constants.pessoas;
  pessoaFilter = new PessoaFiltro();
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigo = this.activatedRoute.snapshot.params[CODIGO];
    this.carregarCategorias();
    this.carregarPessoas();

    this.title.setTitle('AlgaMoney - Novo lançamento');

    if (codigo) {
      this.carregarLancamento(codigo);
    }
  }

  get editando(): boolean {
    return Boolean(this.lancamento.codigo);
  }

  async carregarLancamento(codigo: number): Promise<void> {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
          this.lancamento = lancamento;
          this.atualizarTitulo();
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  async salvar(form: FormControl): Promise<void> {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento(form);
    }
  }

  async atualizarLancamento(): Promise<void> {
    this.lancamentoService.atualizar(this.lancamento)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Lançamento atualizado com sucesso.'
        });
        this.atualizarTitulo();
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  async adicionarLancamento(form: FormControl): Promise<void> {
    this.lancamentoService.adicionar(this.lancamento)
      .then(lancamento => {
        this.messageService.add({
          severity: 'success',
          summary: 'Lançamento adicionado com sucesso.'
        });

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamento.codigo]);
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  async carregarCategorias(): Promise<void> {
    return this.categoriaService.todas()
      .then(response => {
        const categorias = [{ label: 'Selecione', value: 0 }];

        for (const categoria of (response as any)) {
          categorias.push(this.comboConverter(categoria));
        }

        this.categorias = categorias;
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  async carregarPessoas(): Promise<void> {
    this.pessoaFilter.itensPorPagina = 999;

    return this.pessoaService.pesquisar(this.pessoaFilter)
      .then(response => {
        this.pessoas = [];
        const pessoas = [{ label: 'Selecione', value: 0}];

        for (const pessoa of (response as any).pessoas) {
          pessoas.push(this.comboConverter(pessoa));
        }

        this.pessoas = pessoas;
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  async novo(form: FormControl): Promise<void> {
    form.reset();

    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  private comboConverter(o: any): any {
    return { label: o.nome, value:  o.codigo };
  }

  private atualizarTitulo(): void {
    console.log(this.lancamento);
    this.title.setTitle(`AlgaMoney - Edição de lançamento.: ${this.lancamento.descricao}`);
  }
}
