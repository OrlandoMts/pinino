import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private APIKEY: string = 'aXIA8RkhHFOzbUQh0J5zljtHBpFdPjbK'; 
  public resultados: Gif[] = [];

  constructor(
    private http: HttpClient
  ) { }

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

    this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.APIKEY}&q=${query}&limit=5`)
        .subscribe( (res) => {
          this.resultados = res.data;
          console.log(res.data);
        })
  
  }
}
