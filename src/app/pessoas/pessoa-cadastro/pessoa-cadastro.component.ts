import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from 'src/app/core/models/Pessoa.model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
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

}
