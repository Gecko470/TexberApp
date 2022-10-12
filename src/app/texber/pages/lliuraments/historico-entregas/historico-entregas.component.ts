import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TexberService } from '../../../services/texber.service';
import { LinAlbCli } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-historico-entregas',
  templateUrl: './historico-entregas.component.html',
  styles: [
  ]
})
export class HistoricoEntregasComponent implements OnInit {

  codArticulo: string = '';
  listaEntregas: LinAlbCli[] = [];
  respuesta: string = '';

  constructor(private route: ActivatedRoute, private texberService: TexberService) {
    this.route.params.subscribe((params: Params) => {
      this.codArticulo = params['codArticulo'];
    })
   }

  ngOnInit(): void {
    this.texberService.getLinAlbCli(this.codArticulo).subscribe( resp => {
      this.listaEntregas = resp;
      if(this.listaEntregas.length == 0){
        this.respuesta = 'Compruebe el código de barras, no se han encontrado resultados..';
      }
    });
  }

}
