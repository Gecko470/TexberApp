import { Component, OnInit } from '@angular/core';
import { TexberService } from '../../../services/texber.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LineaConsumos } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-consums-bis',
  templateUrl: './consums-bis.component.html',
  styles: [
  ]
})
export class ConsumsBisComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    codBarras: ['', Validators.required],
    partida: ['', Validators.required],
    bobinas: [0, Validators.required],
    peso: [0, Validators.required],
    almacen: ['', Validators.required]
  });
  codigoBarras: string = '';
  arrayCodBarras: string[] = [];
  codProducto: string = '';
  partida: string = '';
  bobinas: number = 0;
  peso: string = '';
  pesoMax: number = 0;
  listaAlmacenes: string[] = [];

  lineaConsumos: LineaConsumos = {
    codProducto: '',
    partida: '',
    bobinas: 0,
    peso: 0,
    almacen: ''
  }

  constructor(private texberService: TexberService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  campoEsValido(campo: string){
    return this.myForm.controls[campo].errors;
  }

  campoPeso(){
    return this.myForm.controls['peso'].value > this.pesoMax;
  }

  actCamposCodBarras() {
    this.codigoBarras = this.myForm.controls['codBarras'].value;
    this.arrayCodBarras = this.codigoBarras.split(' ');

    this.codProducto = this.arrayCodBarras[0];
    this.partida = this.arrayCodBarras[1] + '-' + this.arrayCodBarras[2];
    this.peso = this.arrayCodBarras[3];

    if(this.peso != undefined){
      this.peso = this.peso.slice(0, this.peso.length - 2) + '.' + this.peso.slice(this.peso.length - 2, this.peso.length);
    }

    this.pesoMax = parseFloat(this.peso);
    this.myForm.controls['partida'].setValue(this.partida);
    this.myForm.controls['bobinas'].setValue(this.bobinas);
    if(!isNaN(parseFloat(this.peso))){
    this.myForm.controls['peso'].setValue(parseFloat(this.peso));
    }

    this.texberService.getAlmacenesByCodArtPart(this.codProducto, this.partida).subscribe( resp => this.listaAlmacenes = resp);
  }

  setLineaConsumos(){
    this.lineaConsumos.codProducto = this.codProducto;
    this.lineaConsumos.partida = this.myForm.controls['partida'].value;
    this.lineaConsumos.bobinas = this.myForm.controls['bobinas'].value;
    this.lineaConsumos.peso = this.myForm.controls['peso'].value;
    this.lineaConsumos.almacen = this.myForm.controls['almacen'].value;

    this.texberService.setLineasConsumos(this.lineaConsumos);
  }

}
