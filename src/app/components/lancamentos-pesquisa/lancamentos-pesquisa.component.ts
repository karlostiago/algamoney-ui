import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: new Date(2021, 6, 30),
      dataPagamento: null, valor: 4.50, pessoa: 'Padaria do José' },
    { tipo: 'RECEITA', descricao: 'Venda de serviço', dataVencimento: new Date(2021, 6, 15),
      dataPagamento: new Date(2021, 6, 16), valor: 8000, pessoa: 'Atacadão' },
    { tipo: 'DESPESA', descricao: 'Pagamento de boleto', dataVencimento: new Date(2021, 6, 2),
      dataPagamento: null, valor: 14312, pessoa: 'Ministerio da fazenda' },
    { tipo: 'DESPESA', descricao: 'Compra de SSD', dataVencimento: new Date(2021, 6, 1),
      dataPagamento: new Date(2021, 6, 1), valor: 800, pessoa: 'Ibyte' },
    { tipo: 'DESPESA', descricao: 'Mensalidade faculdade', dataVencimento: new Date(2021, 6, 5),
      dataPagamento: new Date(2021, 7, 7), valor: 450, pessoa: 'Unifametro' },
    { tipo: 'RECEITA', descricao: 'Venda da moto CG', dataVencimento: new Date(2021, 6, 10),
      dataPagamento: new Date(2021, 6, 10), valor: 6200, pessoa: 'Everton' },
    { tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: new Date(2021, 6, 28),
      dataPagamento: new Date(2021, 7, 28), valor: 750, pessoa: 'Bosco' },
    { tipo: 'DESPESA', descricao: 'Prestação da moto', dataVencimento: new Date(2021, 6, 19),
      dataPagamento: new Date(2021, 7, 19), valor: 760, pessoa: 'Kawasaki' },
    { tipo: 'DESPESA', descricao: 'Pagamento Internet', dataVencimento: new Date(2021, 6, 17),
      dataPagamento: new Date(2021, 7, 17), valor: 99.56, pessoa: 'Oi Telecom' }
  ];

}
