import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TexberService } from '../../../services/texber.service';
import { Linea, ProduccionesxLinea, DatosConsumos, LineaConsumos, ProduccionesxLineaMp } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-consums',
  templateUrl: './consums.component.html',
  styles: [
  ]
})
export class ConsumsComponent implements OnInit {

  listaLineas: Linea[] = [];
  lineaSeleccionada: string = '';
  listaOrdenesFab: ProduccionesxLinea[] = [];
  datosConsumos: DatosConsumos = {
    codLinea: '',
    numeroFabricacion: '',
    datosEstablecidos: 0
  }
  lineasConsumos: LineaConsumos[] = [];
  seleccionada: boolean = false;
  lineaConsumosSelec: LineaConsumos = {
    codProducto: '',
    partida: '',
    bobinas: 0,
    peso: 0,
    almacen: ''
  }
  index: number = -1;
  listaProduccxLineaMP: ProduccionesxLineaMp[] = [];
  lineaProduccxLineaMP: ProduccionesxLineaMp = {
    numeroFabricacion: 0,
    coCodigoLinea: '',
    codigoArticulo: '',
    partida: '',
    unidades: 0,
    codigoAlmacen: ''
  }
  respuesta: string = ``;
  resp: number = -1;


  myForm: FormGroup = this.fb.group({
    codLinea: ['', Validators.required],
    numeroFabricacion: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private texberService: TexberService) { }

  ngOnInit(): void {
    this.texberService.getLineas().subscribe(resp => { this.listaLineas = resp });
    this.datosConsumos = this.texberService.getDatosConsumos();
    this.lineasConsumos = this.texberService.getLineasConsumos();
  }

  campoEsValido(campo: string) {
    return this.myForm.controls[campo].errors && this.datosConsumos.datosEstablecidos == 0;
  }

  campoEsValidoNumFab() {
    return this.myForm.controls['numeroFabricacion'].value == '' && this.datosConsumos.datosEstablecidos == 0;
  }

  seleccLinea() {
    this.lineaSeleccionada = this.listaLineas.find(p => p.coCodigoLinea == this.myForm.controls['codLinea'].value)!.descripcion;
    this.texberService.getOrdenesFabByLin(this.myForm.controls['codLinea'].value).subscribe(resp => this.listaOrdenesFab = resp);
  }

  setDatosConsumos() {
    if (this.datosConsumos.datosEstablecidos == 0) {
      this.datosConsumos.codLinea = this.myForm.controls['codLinea'].value;
      this.datosConsumos.numeroFabricacion = this.myForm.controls['numeroFabricacion'].value;
      this.datosConsumos.datosEstablecidos = 1;
      this.texberService.setDatosConsumos(this.datosConsumos);
    }
  }

  borrarDatosEstablecidos() {
    this.texberService.borrarDatosConsumos();
    this.texberService.borrarLineasConsumos();
  }

  seleccionarLinea(index: number, item: LineaConsumos) {

    if (this.lineaConsumosSelec == item) {
      this.index = -1;
      this.seleccionada = false;
      this.lineaConsumosSelec = {
        codProducto: '',
        partida: '',
        bobinas: 0,
        peso: 0,
        almacen: ''
      }
    }
    else {
      this.index = index;
      this.lineaConsumosSelec = item;
      this.seleccionada = true;
    }

  }

  borrarLinea() {
    this.lineasConsumos.splice(this.index, 1);
    /* this.articulos.splice(this.index, 1); */
    /* this.numLineas--;
    this.myForm.controls['numLineas'].setValue(this.numLineas); */
    this.seleccionada = false;
  }

  agregarConsumos() {
    this.lineasConsumos.forEach(item => {
      this.lineaProduccxLineaMP.coCodigoLinea = this.datosConsumos.codLinea;
      this.lineaProduccxLineaMP.numeroFabricacion = parseInt(this.datosConsumos.numeroFabricacion);
      this.lineaProduccxLineaMP.codigoArticulo = item.codProducto;
      this.lineaProduccxLineaMP.partida = item.partida;
      this.lineaProduccxLineaMP.unidades = item.peso;
      this.lineaProduccxLineaMP.codigoAlmacen = item.almacen;

      this.listaProduccxLineaMP.push(this.lineaProduccxLineaMP);

      this.lineaProduccxLineaMP = {
        numeroFabricacion: 0,
        coCodigoLinea: '',
        codigoArticulo: '',
        partida: '',
        unidades: 0,
        codigoAlmacen: ''
      }
    });

    this.texberService.postConsumos(this.listaProduccxLineaMP).subscribe(resp => {
      if (resp == 1) {
        this.resp = 1;
      }
      else if (resp == 0) {
        this.resp = 0;
      }
      else if (resp == 3) {
        this.resp = 3;
      }
      else if (resp != 3 && resp != 1 && resp != 0) {
        this.lineaProduccxLineaMP = {
          numeroFabricacion: resp.numeroFabricacion,
          coCodigoLinea: resp.coCodigoLinea,
          codigoArticulo: resp.codigoArticulo,
          partida: resp.partida,
          unidades: resp.unidades,
          codigoAlmacen: resp.almacen
        }
        this.resp = 2;
      }
    });

    this.lineaConsumosSelec = {
      codProducto: '',
      partida: '',
      bobinas: 0,
      peso: 0,
      almacen: ''
    }
    this.listaProduccxLineaMP = [];
    this.lineaProduccxLineaMP = {
      numeroFabricacion: 0,
      coCodigoLinea: '',
      codigoArticulo: '',
      partida: '',
      unidades: 0,
      codigoAlmacen: ''
    }
    
    this.texberService.borrarLineasConsumos();
    this.lineasConsumos = this.texberService.getLineasConsumos();
    this.texberService.borrarDatosConsumos();
    this.datosConsumos = this.texberService.getDatosConsumos();
    this.myForm.reset();
  }
}
