import { URL_SERVICIOS } from './../../config/config';
import { Usuario } from './../../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public _http: HttpClient, public _router : Router) {
    //console.log("Service User Ready");
    this.cargarStorage();
  }

  logout(){
    this.usuario = null;
    this.token = "";
    localStorage.removeItem('_Id');
    localStorage.removeItem('AppToken');
    localStorage.removeItem('User');
    this._router.navigate(['/login']);
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/Api/Users/Insert';

    return this._http.post(url, usuario).pipe(
      map((Data: any) => {
        swal('Exito', 'Se registro correctamente al usuario', 'success');
      })
    );
  }

  isLogged(){
    return (this.token.length > 5) ? true : false;
  }

  saveStorage(_id: string, JWT: string, usuario: Usuario) {
    localStorage.setItem('_Id', _id);
    localStorage.setItem('AppToken', JWT);
    localStorage.setItem('User', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = JWT;
  }

  cargarStorage(){
    if(localStorage.getItem("AppToken")){
      this.token = localStorage.getItem("AppToken");
      this.usuario = JSON.parse(localStorage.getItem("User"));
    }
    else{
      this.token = "";
      this.usuario = null;
    }
  }

  loginGoogle(tokenGoogle) {
    let url = URL_SERVICIOS + '/Api/Login/Google';

    return this._http.post(url, { idToken: tokenGoogle }).pipe(
      map((Data: any) => {
        //Mensaje Exito
        let usuarioGoogle = new Usuario(
          Data.personalData.Name,
          Data.personalData.lastName,
          Data.personalData.Email,
          Data.personalData.Password,
          Data.personalData.Image,
          Data.Role
        );
        this.saveStorage(Data._id, Data.JWT, usuarioGoogle);
        return true;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('RememberEmail', usuario.Email);
    } else {
      localStorage.removeItem('RememberEmail');
    }

    let url = URL_SERVICIOS + '/Api/Login';

    return this._http.post(url, usuario).pipe(
      // filter((Data : any) => {
      //   console.log("Data Filter: " + JSON.stringify(Data));
      //   return Data;
      // }),
      map((Data: any) => {
        //Mensaje Exito

        let usuario = new Usuario(
          Data.personalData.Name,
          Data.personalData.lastName,
          Data.personalData.Email,
          Data.personalData.Password,
          Data.personalData.Image,
          Data.Role
        );
        this.saveStorage(Data._id, Data.JWT, usuario);
        // localStorage.setItem('_Id', Data._id);
        // localStorage.setItem('AppToken', Data.JWT);
        // localStorage.setItem('User', JSON.stringify(Data.personalData));
        return true;
      })
    );
  }
}
