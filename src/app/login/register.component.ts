import { Usuario } from './../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'],
})
export class RegisterComponent implements OnInit {
  Forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public _router : Router) {}

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        return null;
      } else {
        return {
          sonIguales: true,
        };
      }
    };
  }

  registrarUsuario() {
    
    if (this.Forma.invalid) {
      return;
    }
    if (!this.Forma.value.condiciones) {
      swal('Importante', 'Debe seleccionar las condiciones', 'warning');
      return;
    }

    let usuario = new Usuario(this.Forma.value.nombre, this.Forma.value.apellidos, this.Forma.value.email, this.Forma.value.password, "", "USER_ROLE");

    this._usuarioService.crearUsuario(usuario)
    .subscribe(
      (next: any) => {
        //Escribe Next
        //swal('Exito', 'Se registro correctamente al usuario', 'success');
        this._router.navigate(['/login']);
        //console.log("Data: " + JSON.stringify(next));
      },
      error => {
        //Escribe Error
        //swal('Error', 'Error al registrar usuario \n' + error , 'error');
        console.error("Error: " + JSON.stringify(error));
      },
      () => {
        //console.log("Complete");
        //Escribe Complete
      }
      );
  }

  ngOnInit() {
    init_plugins();
    this.Forma = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        apellidos: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false),
      },
      {
        validators: this.sonIguales('password', 'password2'),
      }
    );
  }
}
