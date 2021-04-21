import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from 'src/app/core/models/Pessoa.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

const CODIGO = 'codigo';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private activatedRoute: ActivatedRoute,
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    const codigo = this.activatedRoute.snapshot.params[CODIGO];

    this.title.setTitle('AlgaMoney - Nova pessoa');

    if (codigo) {
      this.carregarPessoa(codigo);
    }
  }

  async carregarPessoa(codigo: number): Promise<void> {
    this.pessoaService.porCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTitulo();
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  async salvar(form: FormControl): Promise<void> {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa(form);
    }
  }

  async atualizarPessoa(): Promise<void> {
    this.pessoaService.atualizar(this.pessoa)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Pessoa atualizada com sucesso.'
        });
        this.atualizarTitulo();
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  async adicionarPessoa(form: FormControl): Promise<void> {
    this.pessoa.ativo = true;
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoa => {
        this.messageService.add({
          severity: 'success',
          summary: 'Pessoa adicionada com sucesso.'
        });

        this.router.navigate(['pessoas', pessoa.codigo]);
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  async novo(form: FormControl): Promise<void> {
    form.reset();

    setTimeout(() => {
      this.pessoa = new Pessoa();
    }, 1);

    this.router.navigate(['/pessoas/nova']);
  }

  get editando(): boolean {
    return Boolean(this.pessoa.codigo);
  }

  private atualizarTitulo(): void {
    this.title.setTitle(`AlgaMoney - Ediçao de pessoas.: ${this.pessoa.nome}`);
  }
}
