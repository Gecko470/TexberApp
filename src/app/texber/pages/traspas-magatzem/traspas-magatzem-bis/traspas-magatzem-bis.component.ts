import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TexberService } from '../../../services/texber.service';
import { Articulo, DatosTraspaso, MovimientosStock, AcumuladoStock } from '../../../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-traspas-magatzem-bis',
  templateUrl: './traspas-magatzem-bis.component.html',
  styles: [
  ]
})
export class TraspasMagatzemBisComponent implements OnInit {

  listaArticulos: Articulo[] = [];
  listaPartidas: AcumuladoStock[] = [];
  lineaMovimientoStock: MovimientosStock = {
    codigoArticulo: '',
    codigoAlmacen: '',
    codigoAlmacen2: '',
    partida: '',
    tipoMovimiento: 0,
    unidades: 0,
    unidades2: 0,
    comentario: '',
    usuarioProceso: 0,
    unidadEntrada: 0,
    unidadStock: 0
  }
  datosTraspaso: DatosTraspaso = {
    almacenOrigen: '',
    almacenDestino: '',
    datosEstablecidos: 0
  }
  respuesta: string = '';
  alerta: boolean = false;

  myForm: FormGroup = this.fb.group({
    codArticulo: ['', Validators.required],
    partida: ['', Validators.required],
    bobinas: [, Validators.required],
    peso: [0, Validators.required]
  });

  constructor(private fb: FormBuilder, private texberService: TexberService, private router: Router) { }

  ngOnInit(): void {
    this.texberService.getArticulos().subscribe(resp => this.listaArticulos = resp);
    this.datosTraspaso = this.texberService.getDatosTraspaso();
  }

  campoEsValido(campo: string) {
    return this.myForm.controls[campo].errors;
  }

  buscarPartidas() {
    this.texberService.getPartidasByCodArticulo(this.myForm.controls['codArticulo'].value, this.datosTraspaso.almacenOrigen).subscribe(resp => this.listaPartidas = resp);
  }

  setLineasTraspasoAlm() {
    this.alerta = false;
    
    this.lineaMovimientoStock.codigoArticulo = this.myForm.controls['codArticulo'].value;
    this.lineaMovimientoStock.partida = this.myForm.controls['partida'].value;
    this.lineaMovimientoStock.codigoAlmacen = this.datosTraspaso.almacenOrigen;
    this.lineaMovimientoStock.codigoAlmacen2 = this.datosTraspaso.almacenDestino;
    this.lineaMovimientoStock.unidades = this.myForm.controls['peso'].value;
    this.lineaMovimientoStock.unidades2 = this.lineaMovimientoStock.unidades;
    this.lineaMovimientoStock.usuarioProceso = 1;

    this.texberService.getMovimientosStock(this.lineaMovimientoStock).subscribe(resp => {
      if (resp == 0) {
        this.texberService.setLineasMovimientosStock(this.lineaMovimientoStock);
        this.router.navigate(['../texber/traspasmagatzem/traspasmagatzem']);
      }
      else if (resp == 1) {
        this.alerta = true;
        this.respuesta = `No existe ese artículo/partida en el almacén ${this.datosTraspaso.almacenOrigen}`;
      }
      else if (resp == 2) {
        this.alerta = true;
        this.respuesta = `No hay suficiente stock de ese artículo/partida en el almacén ${this.datosTraspaso.almacenOrigen}..`;
      }
    });
  }
}
