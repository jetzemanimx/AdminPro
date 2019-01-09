import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu : any = [
    {
      titulo: "Principal",
      icono: "mdi mdi-gauge",
      subMenu : [
        {
          titulo : "Dashboard",
          url: "/dashboard"
        },
        {
          titulo : "ProgressBar",
          url: "/progress"
        },
        {
          titulo : "Graficas",
          url: "/graficas1"
        },
        {
          titulo : "RXJS",
          url: "/rxjs"
        },
        {
          titulo : "Promesas",
          url: "/promesas"
        }
      ]
    },
    {
      titulo: "Mantenimientos",
      icono : "mdi mdi-folder-lock-open",
      subMenu : [
        {
          titulo : "Usuarios",
          url: "/usuarios"
        },
        {
          titulo : "Medicos",
          url: "/medicos"
        },
        {
          titulo : "Hospitales",
          url: "/hospitales"
        }
      ]
    }
  ]
  constructor() { }
}
