import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LogoutService } from './../../seguranca/logout.service';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibirMenu: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private logoutService: LogoutService,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
  }

  exibirToggle(): boolean {
    return this.router.url !== '/login';
  }

  usuarioLogado(): string {
    return this.authService.jwtPayload?.nome;
  }

  temPermissao(permissao: string): boolean {
    return this.authService.temPermissao(permissao);
  }

  criarNovoAccessToken(): void {
    this.authService.obterNovoAccessToken();
  }

  logout(): void {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate([ '/login' ]);
        this.exibirMenu = false;
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }
}
