import { Categoria } from './Categoria.model';
import { Pessoa } from './Pessoa.model';
import { TipoLancamento } from './TipoLancamento.model';

export class Lancamento {
  codigo: number;
  tipo = TipoLancamento.RECEITA;
  descricao: string;
  valor: number;
  dataVencimento: Date;
  dataPagamento: Date;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}
