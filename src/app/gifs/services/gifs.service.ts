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
    this._historial.unshift(query);
    console.warn(this._historial)
  }
}
