import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: '30/06/2021',
      dataPagamento: null, valor: 4.50, pessoa: 'Padaria do José' },
    { tipo: 'RECEITA', descricao: 'Venda de serviço', dataVencimento: '15/06/2021',
      dataPagamento: '16/06/2021', valor: 8000, pessoa: 'Atacadão' },
    { tipo: 'DESPESA', descricao: 'Pagamento de boleto', dataVencimento: '02/06/2021',
      dataPagamento: null, valor: 14312, pessoa: 'Ministerio da fazenda' },
    { tipo: 'DESPESA', descricao: 'Compra de SSD', dataVencimento: '01/06/2021',
      dataPagamento: '01/06/2021', valor: 800, pessoa: 'Ibyte' },
    { tipo: 'DESPESA', descricao: 'Mensalidade faculdade', dataVencimento: '05/06/2021',
      dataPagamento: '07/07/2021', valor: 450, pessoa: 'Unifametro' },
    { tipo: 'RECEITA', descricao: 'Venda da moto CG', dataVencimento: '10/06/2021',
      dataPagamento: '10/06/2021', valor: 6200, pessoa: 'Everton' },
    { tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: '28/06/2021',
      dataPagamento: '28/07/2021', valor: 750, pessoa: 'Bosco' },
    { tipo: 'DESPESA', descricao: 'Prestação da moto', dataVencimento: '19/06/2021',
      dataPagamento: '19/07/2021', valor: 760, pessoa: 'Kawasaki' },
    { tipo: 'DESPESA', descricao: 'Pagamento Internet', dataVencimento: '17/06/2021',
      dataPagamento: '17/07/2021', valor: 99.56, pessoa: 'Oi Telecom' }
  ];

}
