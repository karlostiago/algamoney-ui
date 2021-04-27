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
    private authService: AuthService
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
}
