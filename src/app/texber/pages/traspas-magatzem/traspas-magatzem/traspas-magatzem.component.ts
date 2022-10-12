import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TexberService } from '../../../services/texber.service';
import { Almacen, LineaTraspasoAlm, DatosTraspaso, MovimientosStock } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-traspas-magatzem',
  templateUrl: './traspas-magatzem.component.html',
  styles: [
  ]
})
export class TraspasMagatzemComponent implements OnInit {

  listaAlmacenes: Almacen[] = [];
  seleccionada: boolean = false;
  index: number = -1;
  datosTraspaso: DatosTraspaso = {
    almacenOrigen: '',
    almacenDestino: '',
    datosEstablecidos: 0
  }
  lineasMovimientoStock: MovimientosStock[] = [];
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
  respuesta: string = '';
  enlace: string = '';

  myForm: FormGroup = this.fb.group({
    almacenOrigen: ['', Validators.required],
    almacenDestino: ['', Validators.required],
    serieDoc: ['']
  });

  constructor(private fb: FormBuilder, private texberService: TexberService) { }

  ngOnInit(): void {
    this.texberService.getAlmacenes().subscribe(resp => this.listaAlmacenes = resp);
    this.lineasMovimientoStock = this.texberService.getLineasMovimientosStock();
    this.datosTraspaso = this.texberService.getDatosTraspaso();
  }

  campoEsValido(campo: string) {
    return this.myForm.controls[campo].errors && this.datosTraspaso.datosEstablecidos == 0;;
  }


  seleccionarLinea(index: number, item: MovimientosStock) {

    if (this.lineaMovimientoStock == item) {
      this.index = -1;
      this.seleccionada = false;
      this.lineaMovimientoStock = {
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
    }
    else {
      this.index = index;
      this.lineaMovimientoStock = item;
      this.seleccionada = true;
    }

  }

  borrarLinea() {
    this.lineasMovimientoStock.splice(this.index, 1);
    /* this.articulos.splice(this.index, 1); */
    /* this.numLineas--;
    this.myForm.controls['numLineas'].setValue(this.numLineas); */
    this.seleccionada = false;
  }

  setDatosTraspaso() {
    if (this.datosTraspaso.datosEstablecidos == 0) {
      this.datosTraspaso.almacenOrigen = this.myForm.controls['almacenOrigen'].value;
      this.datosTraspaso.almacenDestino = this.myForm.controls['almacenDestino'].value;
      this.datosTraspaso.datosEstablecidos = 1;
      this.texberService.setDatosTraspaso(this.datosTraspaso);
    }
  }

  borrarDatosTraspaso() {
    this.texberService.borrarDatosTraspaso();
    this.texberService.borrarLineasMovimientosStock();
  }

  setMovimientosStock() {
    this.texberService.setMovimientosStock(this.lineasMovimientoStock).subscribe(resp => {
      if (resp.length > 0) {
        resp.forEach(element => {
          this.enlace = '';
          this.enlace = element;

          if (this.enlace != '') {
            let a = document.createElement("a");
            a.href = this.enlace;
            a.download = "etiquetaTraspaso.pdf";
            a.click();
          }
        });
        this.respuesta = "Traspaso entre almacenes realizado correctamente...";
        this.borrarDatosTraspaso();
        this.lineasMovimientoStock = this.texberService.getLineasMovimientosStock();
        this.datosTraspaso = this.texberService.getDatosTraspaso();
      }
      else {
        this.respuesta = "Ha habido algún problema, no se ha realizado el traspaso entre almacenes..";
      }
    })
  }
}
