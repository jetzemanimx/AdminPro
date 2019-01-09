import { Component, OnInit } from '@angular/core';
import { UsuarioService, UploadFileService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  fileToUpload: File = null;
  imagenTmp: string = '';
  usuario: Usuario;
  constructor(public _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit() {}

  changeImage() {
    this._usuarioService.cambiarImagen(this.fileToUpload, this.usuario._Id).subscribe(
      data => {
        //Escribe Data
        //console.log("Succes Upload: " + JSON.stringify(data));
      },
      error => {
        //Escribe Error
        //console.log("Error Upload: " + JSON.stringify(error));
      },
      () => {
        //Escribe Complete
      }
    );
  }

  uploadImage(file: any) {
    if (!file) {
      this.fileToUpload = null;
      return;
    }

    if (file.item(0).type.indexOf('image') < 0) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.fileToUpload = null;
      return;
    }

    this.fileToUpload = file.item(0);

    console.log("Profile Component" + this.imagenTmp);
    

    if (!this.fileToUpload) {
      let reader = new FileReader();
      let urlImagenTMP = reader.readAsDataURL(file.item(0));
      reader.onloadend = () => (this.imagenTmp = reader.result);
    }
  }

  editarUsuario(usuario: Usuario) {
    if (!this.usuario.Google) {
      this.usuario.Email = usuario.Email;
    }

    this.usuario.Name = usuario.Name;
    this.usuario.lastName = usuario.lastName;

    this._usuarioService.editarUsuario(this.usuario).subscribe(
      data => {
        //Escribe Data
      },
      error => {
        //Escribe Error
      },
      () => {
        //Escribe Complete
      }
    );
  }
}
