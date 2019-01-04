import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(imagen: string, tipoImagen: string = 'Usuarios'): string {

    let url = URL_SERVICIOS +  '/Api/Images/';

    if (!imagen) {
      return url + 'Usuarios/ND';
    }

    if (imagen.indexOf('https') >= 0) {
      return imagen;
    }

    switch (tipoImagen.toLowerCase()) {
      case 'usuarios':
        url += 'Usuarios/' + imagen;
        break;
      case 'medicos':
        url += 'Medicos/' + imagen;
        break;
      case 'hospitales':
        url += 'Usuarios/' + imagen;
        break;
      default:
        url += 'Usuarios/ND';
        break;
    }
    
    return url;
  }
}
