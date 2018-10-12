import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {
    this.contarTres()
    .then( result => {
      console.log("Termino ", result);
    })
    .catch( error => {
      console.error("Error " , error);
    })
  }

  ngOnInit() {}

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;
      let interval = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve(true);
          //reject("Simplemente un error");
          clearInterval(interval);
        }
      }, 1000);
    });
    // .then(result => {
    //   console.log('Termino ', result);
    // })
    // .catch(err => {
    //   console.error('Error en la promesa ', err);
    // });
    //return promesa;
  }
}
