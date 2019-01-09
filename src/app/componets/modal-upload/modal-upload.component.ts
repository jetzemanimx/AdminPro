import { ModalUploadService } from './modal-upload.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioService, UploadFileService } from 'src/app/services/service.index';
import { UsuariosComponent } from '../../pages/usuarios/usuarios.component';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [],
})
export class ModalUploadComponent implements OnInit {

  imagenTmp: string;
  fileToUpload: File;

  constructor(public _archivoService: UploadFileService, public _modalUploadService: ModalUploadService) {
  }

  ngOnInit() {
  }

  changeImage() {
    this._archivoService.uploadFile(this.fileToUpload, this._modalUploadService.tipo, this._modalUploadService.id).subscribe(
      data => {
        //Escribe Data
        //console.log('Respuesta: ' + JSON.stringify(data));
        
        this._modalUploadService.notificacion.emit(data);
        this.cerrarModal();
      },
      error => {
        //Escribe Error
        console.log('Error en la carga');        
      },
      () => {
        //Escribe Complete
      }
    );
  }

  cerrarModal(){
    this.imagenTmp = null;
    this.fileToUpload = null;
    this._modalUploadService.ocultarModal();
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

    console.log("Modal Upload Component" + this.imagenTmp);

    this.fileToUpload = file.item(0);

    if (!this.fileToUpload) {
      let reader = new FileReader();
      let urlImagenTMP = reader.readAsDataURL(file.item(0));
      reader.onloadend = () => (this.imagenTmp = reader.result);
    }
  }
}
