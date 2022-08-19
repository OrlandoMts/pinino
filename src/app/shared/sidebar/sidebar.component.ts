import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor(
    private gifsService: GifsService
  ) { }

  ngOnInit(): void {
  }

  get busquedasRecientes(): string[] {
    return this.gifsService.busquedas
  }

  buscar(termino: string) {
    this.gifsService.buscarGifs(termino);
  }

}
