import { CategoriaService } from './../../categorias/categoria.service';
import { Constants } from './../../shared/Constants';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

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

  constructor(
    private categoriaService: CategoriaService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): Promise<void> {
    return this.categoriaService.todas()
      .then(categorias => {
        this.categorias = categorias;
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }
}
