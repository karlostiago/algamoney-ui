import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from 'src/app/core/models/Pessoa.model';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigo = this.route.snapshot.params[CODIGO];

    this.title.setTitle('AlgaMoney - Cadastro de pessoas');

    if (codigo) {
      this.carregarPessoa(codigo);
    }
  }

  async carregarPessoa(codigo: number): Promise<void> {
    this.pessoaService.porCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizaTitle();
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  async salvar(form: FormControl): Promise<void> {
    this.pessoa.ativo = true;
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Pessoa adicionada com sucesso.'
        });

        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  private atualizaTitle(): void {
    this.title.setTitle(`AlgaMoney - Ediçao de pessoas.: ${this.pessoa.nome}`);
  }
}
