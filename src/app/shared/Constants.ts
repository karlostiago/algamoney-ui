export class Constants {

  static ptBR: any = {
    firstDayOfWeek: 1,
    dayNames: [ 'domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado' ],
    dayNamesShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' ],
    dayNamesMin: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
    monthNames: [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
    monthNamesShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
    today: 'hoje',
    clear: 'Excluir'
  };

  static tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'}
  ];

  static categorias = [
    { label: 'Selecione', value: 0 },
    { label: 'Alimentação', value: 1 },
    { label: 'Transporte', value: 2 }
  ];

  static pessoas = [
    { label: 'Selecione', value: 0 },
    { label: 'João da Silva', value: 1 },
    { label: 'Sebastião Souza', value: 2 },
    { label: 'Maria Abadia', value: 3 }
  ];
}
