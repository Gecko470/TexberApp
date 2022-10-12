import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Fibra, CabAlbProv, Proveedor, Cliente, DatosEntrada, LineaAlbaran, LinAlbProv } from '../../../interfaces/interfaces';
import { TexberService } from '../../../services/texber.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gestion-nota',
  templateUrl: './gestion-nota.component.html',
  styles: [
  ]
})
export class GestionNotaComponent implements OnInit {

  listaFibras: Fibra[] = [];
  fibraSeleccionada: Fibra = {
    coFibra1: '',
    coDescFibra: ''
  }
  cliente: string = '';
  clienteSeleccionado: Cliente = {
    codigoCliente: '',
    siglaNacion: '',
    cifDni: '',
    cifEuropeo: '',
    codigoProveedor: '',
    codigoContable: '',
    codigoCategoriaCliente: '',
    razonSocial: '',
    nombre: '',
    domicilio: '',
    codigoSigla: '',
    viaPublica: '',
    numero1: '',
    codigoPostal: '',
    codigoMunicipio: '',
    municipio: '',
    codigoProvincia: '',
    provincia: '',
    codigoNacion: '',
    nacion: '',
    telefono: '',
    cuentaProvision: '',
    idCliente: ''
  }
  cabeceraAlbaran: CabAlbProv = {
    NumeroAlbaran: 0,
    CodigoProveedor: '',
    SiglaNacion: '',
    CifDni: '',
    CifEuropeo: '',
    RazonSocial: '',
    Nombre: '',
    Domicilio: '',
    CodigoContable: '',
    CodigoPostal: '',
    CodigoMunicipio: '',
    Municipio: '',
    CodigoProvincia: '',
    Provincia: '',
    CodigoNacion: 0,
    Nacion: '',
    CoFibra: ''
  }

  respuesta: string = '';
  numAlbaran: number = 0;
  orden: number = 0;
  datosEntrada: DatosEntrada = {
    codCliente: '',
    codFibra: '',
    datosEstablecidos: 0,
    numBulto: 0,
    orden: 0,
    numAlbaran: 0
  }
  lineaAlbProvSelecc: LinAlbProv = {
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
  lineasAlbProv: LinAlbProv[] = [];
  seleccionada: boolean = false;
  index: number = -1;
  enlace: string = '';

  myForm: FormGroup = this.fb.group({
    fibra: ['0', [Validators.required]]
  });


  constructor(private fb: FormBuilder, private texberService: TexberService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.texberService.getFibras().subscribe(resp => this.listaFibras = resp);
    this.datosEntrada = this.texberService.getDatosEntrada();
    this.lineasAlbProv = this.texberService.getLineasAlbProv();
    this.texberService.getClienteByCod(this.datosEntrada.codCliente).subscribe(resp => {
      this.clienteSeleccionado = resp;
    });
  }

  campoEsValido(campo: string) {
    return (this.myForm.controls[campo].value == '0');
  }

  seleccionarFibra() {
    this.texberService.getFibraCod(this.myForm.controls['fibra'].value).subscribe(resp => this.fibraSeleccionada = resp);
  }

  setDatosEntrada() {
    if (this.datosEntrada.datosEstablecidos == 0) {
      this.datosEntrada.codCliente = this.datosEntrada.codCliente;
      this.datosEntrada.codFibra = this.myForm.controls['fibra'].value;
      this.datosEntrada.datosEstablecidos = 1;
      this.datosEntrada.numBulto = 1;
      this.datosEntrada.orden = 5;

      this.texberService.setDatosEntrada(this.datosEntrada);
    }
  }

  borrarDatosEstablecidos() {
    this.datosEntrada.codCliente = '';
    this.datosEntrada.codFibra = '';
    this.datosEntrada.datosEstablecidos = 0;

    this.texberService.borrarDatosEntrada();
    this.texberService.borarLineasAlbProv();
  }

  postAlbProv() {
    if (this.datosEntrada.datosEstablecidos == 0) {
      this.cabeceraAlbaran = {
        NumeroAlbaran: 0,
        CodigoProveedor: this.clienteSeleccionado.codigoCliente,
        SiglaNacion: this.clienteSeleccionado.siglaNacion,
        CifDni: this.clienteSeleccionado.cifDni,
        CifEuropeo: this.clienteSeleccionado.cifEuropeo,
        RazonSocial: this.clienteSeleccionado.razonSocial,
        Nombre: this.clienteSeleccionado.nombre,
        Domicilio: this.clienteSeleccionado.domicilio,
        CodigoContable: this.clienteSeleccionado.codigoContable,
        CodigoPostal: this.clienteSeleccionado.codigoPostal,
        CodigoMunicipio: this.clienteSeleccionado.codigoMunicipio,
        Municipio: this.clienteSeleccionado.municipio,
        CodigoProvincia: this.clienteSeleccionado.codigoProvincia,
        Provincia: this.clienteSeleccionado.provincia,
        CodigoNacion: parseInt(this.clienteSeleccionado.codigoNacion),
        Nacion: this.clienteSeleccionado.nacion,
        CoFibra: this.fibraSeleccionada.coFibra1
      }
      this.texberService.postCabAlbProv(this.cabeceraAlbaran).subscribe( (resp) => {
        this.datosEntrada.numAlbaran = resp;
      });
      this.setDatosEntrada();
    }
  }

  /* linAlbProv() {
    this.orden = 0;
    this.router.navigateByUrl(`texber/entradas/lineaNota/${this.cliente}/${this.numAlbaran}`);
  } */

  postLineasAlbProv() {
    this.texberService.postLineasAlbProv(this.lineasAlbProv).subscribe(resp => {
      if (resp.length > 0) {
        resp.forEach(element => {
          this.enlace = '';
          this.enlace = element;

          if (this.enlace != '') {
            let a = document.createElement("a");
            a.href = this.enlace;
            a.download = "etiquetaEntrada-" + this.datosEntrada.numAlbaran + '.pdf';
            a.click();
          }
        });
        this.respuesta = 'Albarà generat correctament..';

        this.myForm.reset();
        this.texberService.borarLineasAlbProv();
        this.lineasAlbProv = this.texberService.getLineasAlbProv();
        this.texberService.borrarDatosEntrada();
        this.datosEntrada = this.texberService.getDatosEntrada();
        this.myForm.controls['fibra'].setValue('0');
      }
      else {
        this.respuesta = 'Ha habido algún problema, el albarán no se ha generado correctamente..';
      }
    });

    this.enlace = '';
  }

  seleccionarLinea(index: number, item: LinAlbProv) {

    if (this.lineaAlbProvSelecc == item) {
      this.index = -1;
      this.seleccionada = false;
      this.lineaAlbProvSelecc = {
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
    }
    else {
      this.index = index;
      this.lineaAlbProvSelecc = item;
      this.seleccionada = true;
    }

  }

  borrarLinea() {
    this.lineasAlbProv.splice(this.index, 1);
    /* this.articulos.splice(this.index, 1); */
    /* this.numLineas--;
    this.myForm.controls['numLineas'].setValue(this.numLineas); */
    this.seleccionada = false;
    this.texberService.borarLineasAlbProv();
    this.lineasAlbProv.forEach(element => {
      this.texberService.setLineasAlbProv(element);
    });

  }
}
