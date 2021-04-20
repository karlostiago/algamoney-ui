import { RouterModule } from '@angular/router';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { LancamentosModule } from './../lancamentos/lancamentos.module';
import { PessoasModule } from './../pessoas/pessoas.module';

import { LoaderService } from './../components/loader/loader.service';
import { LoaderModule } from './../components/loader/loader.module';
import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    NavbarComponent
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
    LoaderModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    MessageService,
    LoaderService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
