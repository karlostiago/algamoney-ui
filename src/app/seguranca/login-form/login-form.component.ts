import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async login(usuario: string, senha: string): Promise<void> {
    this.authService.login(usuario, senha)
      .then(() => {
        this.router.navigate(['/lancamentos']);
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }
}
