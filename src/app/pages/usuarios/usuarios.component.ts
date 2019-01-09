import { UsuarioService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
//import swal from 'sweetalert';
import { ModalUploadService } from '../../componets/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  offset: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe( resp => {
      this.cargarUsuarios();
    });
  }

  mostrarModal(usuario : any){
    //console.log(usuario);
    this._modalUploadService.mostrarModal('Usuarios', usuario._id);
  }
  cambiarDesde(offset: number) {
    let desde = this.offset + offset;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.offset += offset;
    this.cargarUsuarios();
  }

  guardarUsuario(User : any){

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de actualizar a: ' + User.personalData.Name + ' ' + User.personalData.lastName,
      icon: 'warning',
      buttons: true,
      dangerMode: false,
    }).then((actualizar:boolean) => {
      if (actualizar) {
        this._usuarioService.saveUser(User).subscribe(
          data => {
            //Escribe Data
            this.cargarUsuarios();
          },
          error => {
            //Escribe Error
          },
          () => {
            //Escribe Complete
          }
        );
      }
    });
  }

  borrarUsuario(User: any) {
    if (User._id === this._usuarioService.usuario._Id) {
      swal('Error', 'No se puede elminar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a: ' + User.personalData.Name + ' ' + User.personalData.lastName,
      icon: 'error',
      buttons: true,
      dangerMode: true,
    }).then((borrar:boolean) => {
      if (borrar) {
        this._usuarioService.deleteUsuarios(User._id).subscribe(
          data => {
            //Escribe Data
            this.cargarUsuarios();
          },
          error => {
            //Escribe Error
          },
          () => {
            //Escribe Complete
          }
        );
      }
    });
  }

  buscarUsuario(querySearch: string) {
    //console.log(querySearch);

    if (querySearch.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.searchUsuarios(querySearch).subscribe(
      data => {
        //Escribe Data
        this.usuarios = data.data;
        this.cargando = false;
      },
      error => {
        //Escribe Error
        this.cargando = false;
      },
      () => {
        //Escribe Complete
      }
    );
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.offset).subscribe(
      data => {
        //Escribe Data
        //console.log(data.data);
        this.usuarios = data.data;
        this.totalRegistros = data.total;
        this.cargando = false;
      },
      error => {
        //Escribe Error
        //console.error(error);
        this.cargando = false;
      },
      () => {
        //Escribe Complete
      }
    );
  }
}
