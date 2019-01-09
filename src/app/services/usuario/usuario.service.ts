import { URL_SERVICIOS } from './../../config/config';
import { Usuario } from './../../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(public _http: HttpClient, public _router: Router, public _subirArchivoService: UploadFileService) {
    this.cargarStorage();
  }

  saveUser(User: any) {
    let usuario = new Usuario(
      User.personalData.Name,
      User.personalData.lastName,
      User.personalData.Email,
      User.personalData.Password,
      User.personalData.Image,
      User.Role,
      User.Google,
      User._id
    );

    let url = '/Api/Users/Update/' + User._id;
    url += '?Token=' + this.token;

    return this._http.patch(url, usuario).pipe(
      map((Data: any) => {
        let usuario = new Usuario(
          Data.personalData.Name,
          Data.personalData.lastName,
          Data.personalData.Email,
          Data.personalData.Password,
          Data.personalData.Image,
          Data.Role,
          Data.Google,
          Data._id
        );
        this.saveStorage(Data._id, this.token, usuario);
        swal('Exito', 'Usuario actualizado correctamente', 'success');
        return true;
      })
    );
  }

  deleteUsuarios(idUser: string) {
    let url = '/Api/Users/Delete/' + idUser;
    url += '?Token=' + this.token;

    return this._http.delete(url).pipe(
      map((Data: any) => {
        //Mensaje Exito
        swal('Exito', 'Se elimino correctamente al usuario', 'success');
        return Data;
      })
    );
  }

  cargarUsuarios(offset: number = 0) {
    let url = '/Api/Users/All/?Offset=' + offset;

    return this._http.get(url).pipe(
      map((Data: any) => {
        //Mensaje Exito
        return Data;
      })
    );
  }

  searchUsuarios(querySearch: string) {
    let url = '/Api/Search/Usuarios/' + querySearch;

    return this._http.get(url).pipe(
      map((Data: any) => {
        //Mensaje Exito
        return Data;
      })
    );
  }

  cambiarImagen(archivo: File, id: string) {
    let url = '/Api/Upload/Usuarios/' + id;
    const formData: FormData = new FormData();
    formData.append('Image', archivo, archivo.name);

    return this._http.put(url, formData).pipe(
      map((Data: any) => {
        //Mensaje Exito
        this.usuario.Image = Data.Usuario.Image;
        this.saveStorage(id, this.token, this.usuario);
        swal('Exito', 'Se actualizo correctamente la imagen del usuario', 'success');
        return Data;
      })
    );
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('_Id');
    localStorage.removeItem('AppToken');
    localStorage.removeItem('User');
    this._router.navigate(['/login']);
  }

  crearUsuario(usuario: Usuario) {
    let url = '/Api/Users/Insert';

    return this._http.post(url, usuario).pipe(
      map((Data: any) => {
        swal('Exito', 'Se registro correctamente al usuario', 'success');
      })
    );
  }

  isLogged() {
    return this.token.length > 5 ? true : false;
  }

  saveStorage(_id: string, JWT: string, usuario: Usuario) {
    localStorage.setItem('_Id', _id);
    localStorage.setItem('AppToken', JWT);
    localStorage.setItem('User', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = JWT;
  }

  cargarStorage() {
    if (localStorage.getItem('AppToken')) {
      this.token = localStorage.getItem('AppToken');
      this.usuario = JSON.parse(localStorage.getItem('User'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  loginGoogle(tokenGoogle) {
    let url = '/Api/Login/Google';

    return this._http.post(url, { idToken: tokenGoogle }).pipe(
      map((Data: any) => {
        //Mensaje Exito
        let usuarioGoogle = new Usuario(
          Data.personalData.Name,
          Data.personalData.lastName,
          Data.personalData.Email,
          Data.personalData.Password,
          Data.personalData.Image,
          Data.Role,
          Data.Google,
          Data._id
        );
        this.saveStorage(Data._id, Data.JWT, usuarioGoogle);
        return true;
      })
    );
  }

  editarUsuario(usuario: Usuario) {
    let url = '/Api/Users/Update/' + usuario._Id;
    url += '?Token=' + this.token;

    return this._http.patch(url, usuario).pipe(
      map((Data: any) => {
        //Mensaje Exito
        let usuario = new Usuario(
          Data.personalData.Name,
          Data.personalData.lastName,
          Data.personalData.Email,
          Data.personalData.Password,
          Data.personalData.Image,
          Data.Role,
          Data.Google,
          Data._id
        );
        this.saveStorage(Data._id, this.token, usuario);
        swal('Exito', 'Usuario actualizado correctamente', 'success');
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
    let url = '/Api/Login';

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
          Data.Role,
          Data.Google,
          Data._id
        );
        this.saveStorage(Data._id, Data.JWT, usuario);
        return true;
      })
    );
  }
}
