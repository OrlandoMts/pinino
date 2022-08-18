import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor() { }

  private _historial: string[] = [];

  get busquedas() {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();
    //Verifica que no se esten duplicados
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      //Hace que solo muestre 10 resultados
      this._historial = this._historial.splice(0,10);
    }
    
    console.warn(this._historial);
  }
}
