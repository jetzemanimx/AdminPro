import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService, public _router: Router) {}

  canActivate() {
    if (this._usuarioService.isLogged()) {
      console.log('Logueado');
      return true;
    } else {
      console.log('Bloqueado por Guard');
      this._router.navigate(['/login']);
      return false;
    }
  }
}
