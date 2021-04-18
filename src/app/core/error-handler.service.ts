import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any): void {
    let msg: string;

    if (errorResponse.status === 415) {
      msg = 'Media type não suportado';
    }
    else if (errorResponse.status === 400) {
      msg = errorResponse.error[0].mensagemUsuario;
    }
    else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
    }

    this.messageService.add({
      severity: 'error',
      summary: msg
    });
  }
}
