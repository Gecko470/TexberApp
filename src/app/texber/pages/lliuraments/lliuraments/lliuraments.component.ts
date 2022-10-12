import { Component, OnInit } from '@angular/core';
import { TexberService } from '../../../services/texber.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LineaAlbaran, Almacen, Articulo } from '../../../interfaces/interfaces';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-lliuraments',
  templateUrl: './lliuraments.component.html',
  styles: [
  ]
})
export class LliuramentsComponent implements OnInit {

  resp: number = 0;
  respuesta: string = '';
  lineasAlbaran: LineaAlbaran[] = [];
  listaAlmacenes: Almacen[] = [];
  codigoBarras: string = '';
  peso: string = '';
  partida: string = '';
  bobinas: string = '';
  codProducto: string = '';
  codBulto: string = '';
  
  almacen: Almacen = {
    codigoAlmacen: '',
    almacen: '',
    idAlmacen: ''
  }
  lineaSeleccionada: LineaAlbaran = {
    codBarras: '',
    codProducto: '',
    codigoAlmacen: '',
    nombreAlmacen: '',
    partida: '',
    bultos: 0,
    CoBobinas: 0,
    peso: 0,
    comentarios: '',
  }
  index: number = -1;
  numBulto: string = '';
  articulos: Articulo[] = [];
  codCliente: string = '';
  seleccionada: boolean = false;
  arrayCodBarras: string[] = [];

  myForm: FormGroup = this.fb.group({
    codBarras: ['', [Validators.required]],
    codProducto: [''],
    codigoAlmacen: ['', [Validators.required]],
    nombreAlmacen: [''],
    partida: ['', [Validators.required]],
    bultos: [0],
    numBulto: ['', Validators.required],
    CoBobinas: [0, [Validators.required]],
    peso: [0, [Validators.required]],
    comentarios: [''],
  });

  constructor(private texberService: TexberService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.texberService.getAlmacenes().subscribe(resp => this.listaAlmacenes = resp);
    this.route.params.subscribe((params: Params) => {
      this.resp = params['resp'];
    })
  }

  campoEsValido(campo: string) {
    return this.myForm.controls[campo].errors;
  }

  campoEsValidoB() {
    if (this.myForm.controls['CoBobinas'].value != 0 && this.myForm.controls['CoBobinas'].value != null) {
      return false;
    }
    return true;
  }

  campoEsValidoP() {
    if (this.myForm.controls['peso'].value != 0 && this.myForm.controls['peso'].value != null) {
      return false;
    }
    return true;
  }

  actCamposCodBarras() {
    this.codigoBarras = this.myForm.controls['codBarras'].value;
    this.arrayCodBarras = this.codigoBarras.split(' ');

    this.codProducto = this.arrayCodBarras[0];
    this.partida = this.arrayCodBarras[1];
    this.codBulto = this.arrayCodBarras[2];
    this.peso = this.arrayCodBarras[3];
    if(this.peso != undefined){
      this.peso = this.peso.slice(0, this.peso.length - 2) + '.' + this.peso.slice(this.peso.length - 2, this.peso.length);
    }

    this.myForm.controls['codProducto'].setValue(this.codProducto);
    this.myForm.controls['partida'].setValue(this.partida);
    if(!isNaN(parseFloat(this.peso))){
    this.myForm.controls['peso'].setValue(parseFloat(this.peso));
    }
   /*  this.myForm.controls['CoBobinas'].setValue(parseInt(this.bobinas)); */
    this.myForm.controls['numBulto'].setValue(this.codBulto);
  }

  agregarLinea() {

    if (!this.myForm.invalid) {
      let partida = '';
      partida = this.myForm.controls['partida'].value + '-' + this.myForm.controls['numBulto'].value;

      this.texberService.getStockByCodPart(this.myForm.controls['codProducto'].value, partida, this.myForm.controls['codigoAlmacen'].value).subscribe(resp => {
        if (resp == 0) {
          this.respuesta = "No existeix en Stock aquest Articulo/Partida/Magatzem..";
          return;
        }
        else if (resp == 1) {
          this.respuesta = "No hi ha estoc d'aquest Article/Partida/Magatzem..";
          return;
        }
        else if (resp > 1) {
          if (this.myForm.controls['peso'].value <= resp) {

            this.texberService.getClienteByCodArtiuclo(this.myForm.controls['codProducto'].value, partida).subscribe( resp => this.codCliente = resp);
            this.almacen = this.listaAlmacenes.find(p => p.codigoAlmacen == this.myForm.controls['codigoAlmacen'].value)!;
            this.myForm.controls['nombreAlmacen'].setValue(this.almacen.almacen);
            this.myForm.controls['partida'].setValue(partida);
            
            this.lineasAlbaran.push(this.myForm.value);

            this.texberService.getArticuloByCod(this.myForm.controls['codProducto'].value).subscribe(resp => {
              if (resp) {
                this.articulos.push(resp);
              }
            });

            this.myForm.reset();
          }
          else {
            this.respuesta = "No hi ha prou estoc d'aquest Articulo/Partida/Magatzem per generar aquesta sortida..";
            return;
          }
        }
      });
    }
    this.respuesta = '';
  }

  seleccionarLinea(index: number, item: LineaAlbaran) {
     
    this.seleccionada = !this.seleccionada;

    if (this.lineaSeleccionada == item) {
      this.index = -1;
      this.lineaSeleccionada = {
        codBarras: '',
        codProducto: '',
        codigoAlmacen: '',
        nombreAlmacen: '',
        partida: '',
        bultos: 0,
        CoBobinas: 0,
        peso: 0,
        comentarios: '',
      }
    }
    else {
      this.index = index;
      this.lineaSeleccionada = item;
    }

  }

  borrarLinea() {
    this.lineasAlbaran.splice(this.index, 1);
    this.articulos.splice(this.index, 1);
    /* this.numLineas--;
    this.myForm.controls['numLineas'].setValue(this.numLineas); */
    this.seleccionada = false;
  }

  navegar() {
    this.lineasAlbaran.forEach(element => {
      this.texberService.setLineasAlbaran(element);
    });
    
    this.texberService.emitirArticulos(this.articulos);

    this.router.navigate([`/texber/lliuraments/domiciliosEntrega/${this.codCliente}`]);
  }

  histEntregas() {
    this.router.navigate([`/texber/lliuraments/histEntregas/${this.myForm.controls['codProducto'].value}`]);
  }

}
