import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private APIKEY: string = 'aXIA8RkhHFOzbUQh0J5zljtHBpFdPjbK'; 
  private URLAPI: string = 'https://api.giphy.com/v1/gifs';
  public resultados: Gif[] = [];

  constructor(
    private http: HttpClient
  ) { 
    // ! es para aceptar los undefined y el || como un else
    // puede retornar un arreglo vacio, si es asi se le asigna uno vacio
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

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

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
          .set('api_key', this.APIKEY)
          .set('q', query)
          .set('limit', '10');
    
    // this.http.get<SearchGIFResponse>(`${this.URLAPI}/search?api_key=${this.APIKEY}&q=${query}&limit=5`)
    this.http.get<SearchGIFResponse>(`${this.URLAPI}/search`,{params})
        .subscribe( (res) => {
          this.resultados = res.data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
          //console.log(res.data);
        })
  
  }
}
