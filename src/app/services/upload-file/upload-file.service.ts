import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(public _http: HttpClient) { }

  uploadFile(archivo: File, imagenTipo: string, id: string){    
    let url = '/Api/Upload/'+ imagenTipo +'/'+ id;
    const formData: FormData = new FormData();
    formData.append('Image', archivo, archivo.name);

    //console.log(formData.getAll('Imagen'));
    
    return this._http.put(url, formData)
    .pipe(
      map((Data : any) => {
      //Mensaje Exito
      //console.log("Succes Upload: " + JSON.stringify(Data));
      return Data;
    }));
  }
}
