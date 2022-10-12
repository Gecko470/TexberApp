import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TexberService } from '../../../services/texber.service';
import { Almacen, Articulo, LinAlbProv, DatosEntrada } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-linea-nota',
  templateUrl: './linea-nota.component.html',
  styles: [
  ]
})

export class LineaNotaComponent implements OnInit {

  articuloSeleccionado: Articulo = {
    codigoArticulo: '',
    descripcionArticulo: '',
    codigoAlternativo: '',
    tipoArticulo: '',
    codigoFamilia: '',
    precioVenta: 0
  }
  
  listaAlmacenes: Almacen[] = [];
  listaArticulos: Articulo[] = [];
  respuesta: string = '';
  id: number = 1;
  numBulto: number = 0;

  linAlbProv: LinAlbProv = {
    NumeroAlbaran: 0,
    Orden: 0,
    CodigoArticulo: '',
    CodigoAlmacen: '',
    Partida: '',
    DescripcionArticulo: '',
    CodigodelProveedor: '',
    Unidades: 0,
    Unidades2: 0
  }
  
  datosEntrada: DatosEntrada = {
    codCliente: '',
    codFibra: '',
    datosEstablecidos: 0,
    numBulto: 0,
    orden: 0,
    numAlbaran: 0
  }

  myForm: FormGroup = this.fb.group({
    codigoArticulo: ['', [Validators.required]],
    codigoAlmacen: ['', [Validators.required]],
    partida: ['', [Validators.required]],
    bulto: [''],
    bobinas: [0],
    peso: [0, [Validators.required]],
    observaciones: [''],
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private texberService: TexberService, private router: Router) { }

  ngOnInit(): void {
    /* this.proveedorSeleccionado = this.route.snapshot.paramMap.get('prov')!;
    this.fibraSeleccionada = this.route.snapshot.paramMap.get('fibra')!;
    this.numBultos = this.route.snapshot.paramMap.get('numB')!; */

    /* this.route.params.subscribe((params: Params) => {
      this.proveedorSeleccionado = params['prov'];
      this.numAlbaran = params['numAlb'];
    }); */

    this.texberService.getAlmacenes().subscribe(resp => this.listaAlmacenes = resp);
    this.texberService.getArticulos().subscribe(resp => this.listaArticulos = resp);
    this.datosEntrada = this.texberService.getDatosEntrada();
    console.table(this.datosEntrada);
  }

  campoEsValido(campo: string) {
    return this.myForm.controls[campo].errors;
  }

  campoAlmacen() {
    return this.myForm.controls['codigoAlmacen'].value == '';
  }

  seleccionarArticulo() {
    this.texberService.getArticuloByCod(this.myForm.controls['codigoArticulo'].value).subscribe(resp => this.articuloSeleccionado = resp);
  }

  setLineaAlbProv(){
    let numBulto = '';

    if(this.myForm.controls['bulto'].value != ''){
      numBulto = this.myForm.controls['bulto'].value;
    }
    else{
      numBulto = (this.datosEntrada.numBulto).toString();
    }

    
    this.linAlbProv = {
      NumeroAlbaran: this.datosEntrada.numAlbaran,
      Orden: this.datosEntrada.orden,
      CodigoArticulo: this.articuloSeleccionado.codigoArticulo,
      CodigoAlmacen: this.myForm.controls['codigoAlmacen'].value,
      Partida: this.myForm.controls['partida'].value + '-' + numBulto,
      DescripcionArticulo: this.articuloSeleccionado.descripcionArticulo,
      CodigodelProveedor: this.datosEntrada.codCliente,
      Unidades: this.myForm.controls['peso'].value,
      Unidades2: this.myForm.controls['peso'].value
    }

    this.datosEntrada.numBulto = this.datosEntrada.numBulto + 1;
    this.datosEntrada.orden = this.datosEntrada.orden + 5;
    
    this.texberService.setDatosEntrada(this.datosEntrada);

    this.texberService.setLineasAlbProv(this.linAlbProv);
  }
}
