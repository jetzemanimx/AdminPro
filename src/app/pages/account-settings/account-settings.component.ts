import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [],
})
export class AccountSettingsComponent implements OnInit {
  constructor(public _ajustes: SettingsService) {}

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {
    this.aplicarCheck(link);
    this._ajustes.aplicarTema(tema);
  }

  aplicarCheck(link: any) {
    
    let selectores = Array.from(document.getElementsByClassName('selector'));

    selectores.forEach(element => {
      element.classList.remove('working');
    });

    link.classList.add('working');
  }

  colocarCheck(){

    let selectores = Array.from(document.getElementsByClassName('selector'));
    let tema = this._ajustes.ajustes.tema;
    selectores.forEach(element => {
      if(element.getAttribute('data-theme') === tema){
        //console.log(element.getAttribute('data-theme'));
        element.classList.add('working');
        return;
      }
      //element.classList.remove('working');
    });

  }
}
