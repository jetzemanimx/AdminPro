import { UsuarioService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';

import { Usuario } from './../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(public _usuarioService : UsuarioService) { }

  usuario : Usuario;
  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    // console.log(this._usuarioService.usuario);
  }

}