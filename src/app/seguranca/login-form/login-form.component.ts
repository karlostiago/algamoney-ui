import { Component, OnInit } from '@angular/core';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
  }

  async login(usuario: string, senha: string): Promise<void> {
    this.authService.login(usuario, senha);
  }
}