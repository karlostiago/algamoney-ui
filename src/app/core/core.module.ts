import { RouterModule } from '@angular/router';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { LancamentosModule } from './../lancamentos/lancamentos.module';
import { PessoasModule } from './../pessoas/pessoas.module';

import { AuthService } from './../seguranca/auth.service';
import { LoaderService } from './../components/loader/loader.service';
import { LoaderModule } from './../components/loader/loader.module';
import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { SegurancaModule } from '../seguranca/seguranca.module';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
    RouterModule,
    PessoasModule
  ],
  exports: [
    NavbarComponent,
    ConfirmDialogModule,
    ToastModule,
    LancamentosModule,
    PessoasModule,
    LoaderModule,
    SegurancaModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    MessageService,
    LoaderService,
    AuthService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
