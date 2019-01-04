import { Usuario } from './../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import swal from 'sweetalert';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Recuerdame: boolean = false;
  Email: string;
  auth2: any;

  constructor(public _router: Router, public _usuarioService: UsuarioService) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.Email = localStorage.getItem('RememberEmail') || '';
    if (this.Email.length > 1) {
      this.Recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '97929470952-qtelo78lbhthnmr4gfm6afbjj6h0n2uv.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
      });
      this.attachSigin(document.getElementById('btnGoogle'));
    });
  }

  attachSigin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      let profile = googleUser.getBasicProfile();
      let tokenGoogle = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(tokenGoogle).subscribe(
        data => {
          //Escribe Data
          //console.log("Data Google" + JSON.stringify(data));
          window.location.href = '#/dashboard';
          // this._router.navigate(['/dashboard']);
        },
        error => {
          //Escribe Error
          //console.log("Error Google" + JSON.stringify(error));
        },
        () => {
          //Escribe Complete
        }
      );
      //console.log("Profile Google: " + JSON.stringify(profile));
      //console.log("Token Google: " + JSON.stringify(tokenGoogle));
    });
  }

  ingresar(Forma: NgForm) {
    // console.log(Forma.valid);
    // console.log(Forma.value);
    if (Forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, null, Forma.value.Email, Forma.value.Password);

    this._usuarioService.login(usuario, Forma.value.Recuerdame).subscribe(
      (data: any) => {
        //Escribe Next
        this._router.navigate(['/dashboard']);
        //console.log("Succes: " + JSON.stringify(data));
      },
      (error: any) => {
        swal('Error', error.error.Message, 'error');
        //console.log('Error de servidor' + JSON.stringify(error));
      },
      () => {
        //Escribe Complete
      }
    );
  }

  //this._router.navigate(['/dashboard']);
}
