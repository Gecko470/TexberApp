import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TexberService } from '../../../services/texber.service';
import { Linea, ProduccionesxLineaMp, ProduccionesxLineaPf, Almacen, AcumuladoStock } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-produccio',
  templateUrl: './produccio.component.html',
  styles: [
  ]
})
export class ProduccioComponent implements OnInit {

  listaLineas: Linea[] = [];
  listaOrdenesFab: number[] = [];
  listaLineasOrdenFabMp: ProduccionesxLineaMp[] = [];
  listaLineasOrdenFabPf: ProduccionesxLineaPf[] = [];
  listaAlmacenes: Almacen[] = [];
  cantSobrante: number = 0;
  almacenMp: string = '';
  cantFabricada: number = 0;
  almacenPf: string = '';
  varControlMp: number = 0;
  varControlPf: number = 0;
  lineaProduccionMp: ProduccionesxLineaMp = {
    numeroFabricacion: 0,
    coCodigoLinea: '',
    codigoArticulo: '',
    partida: '',
    unidades: 0,
    codigoAlmacen: ''
  }
  lineaProduccionPf: ProduccionesxLineaPf = {
    coCodigoLinea: '',
    numeroFabricacion: 0,
    codigoArticulo: '',
    partida: '',
    codigoProveedor: '',
    coFibra: '',
    seriePedido: '',
    numeroPedido: 0,
    codigoAlmacen: '',
    unidades: 0
  }
  enlace: string = '';
  respuesta: string = '';

  myForm: FormGroup = this.fb.group({
    codLinea: ['', Validators.required],
    ordenFab: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private texberService: TexberService) { }

  ngOnInit(): void {
    this.texberService.getLineas().subscribe(resp => { this.listaLineas = resp });
    this.texberService.getAlmacenes().subscribe(resp => this.listaAlmacenes = resp);
  }

  campoEsValido(campo: string) {
    return this.myForm.controls[campo].errors;
  }

  buscarOrdenesFab(){
    this.myForm.controls['ordenFab'].setValue('');
    this.texberService.getOrdenesFab(this.myForm.controls['codLinea'].value).subscribe( resp => this.listaOrdenesFab = resp);
  }

  buscarLineasOrdenFab(){
    this.texberService.getLineasOrdenFabMp(this.myForm.controls['codLinea'].value, this.myForm.controls['ordenFab'].value).subscribe( resp => this.listaLineasOrdenFabMp = resp);
    this.texberService.getLineasOrdenFabPf(this.myForm.controls['codLinea'].value, this.myForm.controls['ordenFab'].value).subscribe( resp => this.listaLineasOrdenFabPf = resp);
  }

  setProduccionMp(index: number){
    if(this.cantSobrante > 0){
      this.lineaProduccionMp.numeroFabricacion = this.myForm.controls['ordenFab'].value;
      this.lineaProduccionMp.coCodigoLinea = this.myForm.controls['codLinea'].value;
      this.lineaProduccionMp.codigoArticulo = this.listaLineasOrdenFabMp[index].codigoArticulo;
      this.lineaProduccionMp.partida = this.listaLineasOrdenFabMp[index].partida;
      this.lineaProduccionMp.unidades = this.cantSobrante;
      this.lineaProduccionMp.codigoAlmacen = this.almacenMp;

      this.texberService.setProduccionMp(this.lineaProduccionMp).subscribe( resp => {
        if( resp != ''){
          this.enlace = '';
          this.enlace = resp;

          if (this.enlace != '') {
            let a = document.createElement("a");
            a.href = this.enlace;
            a.download = "etiquetaMpSobrante-" + this.lineaProduccionMp.codigoArticulo + "-" + this.lineaProduccionMp.partida + '.pdf';
            a.click();
          }
        }
      });
    }
    if(this.varControlMp < this.listaLineasOrdenFabMp.length){
      this.varControlMp = index + 1;
      this.cantSobrante = 0;
      this.almacenMp = '';
    }
  }

  setProduccionPf(index: number){
    if(this.cantFabricada > 0){
      this.lineaProduccionPf.coCodigoLinea = this.myForm.controls['codLinea'].value;
      this.lineaProduccionPf.numeroFabricacion = this.myForm.controls['ordenFab'].value;
      this.lineaProduccionPf.codigoArticulo = this.listaLineasOrdenFabPf[index].codigoArticulo;
      this.lineaProduccionPf.partida = this.listaLineasOrdenFabPf[index].partida;
      this.lineaProduccionPf.codigoProveedor = this.listaLineasOrdenFabPf[index].codigoProveedor;
      this.lineaProduccionPf.coFibra = this.listaLineasOrdenFabPf[index].coFibra;
      this.lineaProduccionPf.seriePedido = this.listaLineasOrdenFabPf[index].seriePedido;
      this.lineaProduccionPf.numeroPedido = this.listaLineasOrdenFabPf[index].numeroPedido;
      this.lineaProduccionPf.unidades = this.cantFabricada;
      this.lineaProduccionPf.codigoAlmacen = this.almacenPf;

      this.texberService.setProduccionPf(this.lineaProduccionPf).subscribe( resp => {
        if( resp ){
          this.enlace = '';
          this.enlace = resp;

          if (this.enlace != '') {
            let a = document.createElement("a");
            a.href = this.enlace;
            a.download = "etiquetaPf-" + this.lineaProduccionPf.codigoArticulo + "-" + this.lineaProduccionPf.partida + '.pdf';
            a.click();
          }
        }
      });
    }
    if(this.varControlPf < this.listaLineasOrdenFabPf.length){
      this.varControlPf = index + 1;
      this.cantFabricada = 0;
      this.almacenPf = '';
    }
    if(this.varControlPf == this.listaLineasOrdenFabPf.length){
      this.texberService.cerrarOrdFab(this.myForm.controls['codLinea'].value, this.myForm.controls['ordenFab'].value).subscribe( resp => {
        if(resp == 1){
          this.respuesta = "Orden de fabricación cerrada..";
        }
        else if(resp == 0){
          this.respuesta = "Hemos tenido algún problema, no se ha cerrado la orden de fabricación.."
        }
      })
      this.cantFabricada = 0;
      this.almacenPf = '';
    }
  }

}
