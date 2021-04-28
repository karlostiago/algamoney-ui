import { NotAuthenticatedError } from './../seguranca/money-http-interceptor';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

enum StatusCode {
  _403 = 'Você não tem permissão para executar esta ação',
  _415 = 'Media type não suportado',
  _401 = 'Não autorizado'
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  handle(errorResponse: any): void {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    }
    else if (errorResponse instanceof NotAuthenticatedError) {
      setTimeout(() => {
        this.router.navigate([ '/login' ]);
      }, 5000);
      msg = 'Sua sessão expirou, aguarde você já esta sendo redirecionado para tela de login.';
    }
    else if (msg) {
      msg = this.message(errorResponse.status);
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

  private message(status: number): string {
    return StatusCode[`_${status}`];
  }
}
