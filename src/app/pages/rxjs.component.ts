import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscripcion: Subscription;
  constructor() { 

    this.suscripcion = this.regresaObservable()
    // .pipe(
    //   //retry(2)
    //   map( response => {
    //     return response.valor;
    //   })
    // )
    .pipe()
    .subscribe(
      next => {console.log("Suscrito ", next);},
      error => {console.error("Error ", error);},
      (/*complete*/) => {console.log("El observador Termino");}
    );
  }

  ngOnInit() {
  }
  
  ngOnDestroy(){
    //console.log("La pagina se va a cerrar");
    this.suscripcion.unsubscribe();
  }

  regresaObservable() : Observable<any>{
    return new Observable((observer : Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;

        let salida = {
          valor : contador
        };

        observer.next(salida);
        // if(contador === 20){
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if(contador === 2 ){
        //   //clearInterval(intervalo);
        //   observer.error("Ayuda");
        // }
      }, 1000);
    }).pipe(
      map(response => {
        return response.valor;
      }),
      filter( (value : any, index : number) => {
        //console.log("Filter Value: " + value + " | Filter Index: " + index);        

        if((value % 2) === 0){
          //Par
          return false;
        }
        else{
          //Impar
          return true;
        }
      })
    );
    //return observer;
  }

}
