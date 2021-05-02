import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { LancamentoService } from './../lancamento.service';
import { PessoaService, PessoaFiltro } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Constants } from './../../shared/Constants';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

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
  formulario: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configFormulario();

    const codigo = this.activatedRoute.snapshot.params[CODIGO];
    this.carregarCategorias();
    this.carregarPessoas();

    this.title.setTitle('AlgaMoney - Novo lançamento');

    if (codigo) {
      this.carregarLancamento(codigo);
    }
  }

  configFormulario(): void  {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: [ 'RECEITA', Validators.required ],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [ null, [ Validators.required, Validators.minLength(5) ] ],
      valor: [ null, Validators.required ],
      pessoa: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      observacao: []
    });
  }

  get editando(): boolean {
    return Boolean(this.formulario.get('codigo').value);
  }

  async carregarLancamento(codigo: number): Promise<void> {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
          this.formulario.patchValue(lancamento);
          this.atualizarTitulo();
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  async salvar(): Promise<void> {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  async atualizarLancamento(): Promise<void> {
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento => {
        this.messageService.add({
          severity: 'success',
          summary: 'Lançamento atualizado com sucesso.'
        });

        this.formulario.setValue(lancamento);
        this.atualizarTitulo();
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  async adicionarLancamento(): Promise<void> {
    this.lancamentoService.adicionar(this.formulario.value)
      .then(lancamento => {
        this.messageService.add({
          severity: 'success',
          summary: 'Lançamento adicionado com sucesso.'
        });

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

  async novo(): Promise<void> {
    this.formulario.reset();
    this.router.navigate(['/lancamentos/novo']);
  }

  private comboConverter(o: any): any {
    return { label: o.nome, value:  o.codigo };
  }

  private atualizarTitulo(): void {
    this.title.setTitle(`AlgaMoney - Edição de lançamento.: ${this.formulario.get('descricao').value}`);
  }
}
