import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TexberService } from '../../../../services/texber.service';
import { Cliente, LineaAlbaran, CabAlbCli, LinAlbCli, Articulo, Domicilio, Etiqueta } from '../../../../interfaces/interfaces';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-domicilios-entrega',
  templateUrl: './domicilios-entrega.component.html',
  styles: [
  ]
})
export class DomiciliosEntregaComponent implements OnInit {

  listaDomicilios: Domicilio[] = [];
  cliente: Cliente = {
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
  domicilioSeleccionado: Domicilio = {
    tipoDomicilio: '',
    razonSocial: '',
    domicilio1: '',
    municipio: '',
    nacion: '',
    idDomicilio: ''
  }
  cabAlbCli: CabAlbCli = {
    serieAlbaran: '',
    numeroAlbaran: 0,
    codigoCliente: '',
    siglaNacion: '',
    cifDni: '',
    razonSocial: '',
    razonSocialEnvios: '',
    nombre: '',
    nombreEnvios: '',
    domicilio: '',
    domicilioEnvios: '',
    viaPublicaEnvios: '',
    codigoPostal: '',
    codigoPostalEnvios: '',
    codigoMunicipio: '',
    codigoMunicipioEnvios: '',
    municipio: '',
    municipioEnvios: '',
    provincia: '',
    provinciaEnvios: '',
    codigoNacion: '',
    codigoNacionEnvios: '',
    nacion: '',
    nacionEnvios: '',
    telefonoEnvios: '',
    codigoContable: ''
  }
  linAlbCli: LinAlbCli = {
    serieAlbaran: '',
    numeroAlbaran: 0,
    orden: 0,
    codigoArticulo: '',
    tipoArticulo: '',
    codigoAlmacen: '',
    partida: '',
    descripcionArticulo: '',
    codigoFamilia: '',
    codigoIva: 0,
    unidades: 0,
    unidades2: 0,
    precio: 0,
    precioRebaje: 0,
    iva: 0,
    CoBobinas: 0
  }
  articulos: Articulo[] = [];
  arrayLinAlbCli: LinAlbCli[] = [];
  valido: boolean = false;
  lineasAlbaran: LineaAlbaran[] = [];
  numAlbaran: number = 0;
  ordenLinAlbCli: number = 0;
  codProductos: string[] = [];
  codCliente: string = '';
  enlace: string = '';
  arrayEtiquetas: Etiqueta[] = [];

  myForm: FormGroup = this.fb.group({
    serieAlb: ['']
  })

  constructor(private fb: FormBuilder, private texberService: TexberService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.codCliente = params['codCliente'];
      console.log(this.codCliente);
    });
    
    this.texberService.getClienteByCod(this.codCliente).subscribe( resp => this.cliente = resp);

    this.texberService.getDomiciliosByCodCliente(this.codCliente).subscribe(resp => this.listaDomicilios = resp);
    this.lineasAlbaran = this.texberService.getLineasAlbaran();
    this.articulos = this.texberService.obtenerArticulos();

    this.myForm.reset();
  }

  campoCliente() {
    return this.domicilioSeleccionado == null;
  }

  seleccionarDomicilio(item: Domicilio) {
    this.domicilioSeleccionado = item;
    this.valido = true;
  }

  generarAlbaran() {
    this.cabAlbCli = {
      serieAlbaran: this.myForm.controls['serieAlb'].value,
      numeroAlbaran: 0,
      codigoCliente: this.cliente.codigoCliente,
      siglaNacion: this.cliente.siglaNacion,
      cifDni: this.cliente.cifDni,
      razonSocial: this.cliente.razonSocial,
      razonSocialEnvios: this.cliente.razonSocial,
      nombre: this.cliente.nombre,
      nombreEnvios: this.cliente.nombre,
      domicilio: this.cliente.domicilio,
      domicilioEnvios: this.cliente.domicilio,
      viaPublicaEnvios: this.cliente.viaPublica,
      codigoPostal: this.cliente.codigoPostal,
      codigoPostalEnvios: this.cliente.codigoPostal,
      codigoMunicipio: this.cliente.codigoMunicipio,
      codigoMunicipioEnvios: this.cliente.codigoMunicipio,
      municipio: this.cliente.municipio,
      municipioEnvios: this.cliente.municipio,
      provincia: this.cliente.provincia,
      provinciaEnvios: this.cliente.provincia,
      codigoNacion: this.cliente.codigoNacion,
      codigoNacionEnvios: this.cliente.codigoNacion,
      nacion: this.cliente.nacion,
      nacionEnvios: this.cliente.nacion,
      telefonoEnvios: this.cliente.telefono,
      codigoContable: this.cliente.codigoContable
    }


    this.texberService.postCabAlbCli(this.cabAlbCli).subscribe(resp => {
      if (resp) {
        this.generarLinAlbCli(resp);
      }
    });
  }

  generarLinAlbCli(resp: number) {
    let arraySplitPartida = [];
    let etiqueta: Etiqueta = {
      numAlb: '',
      numBulto: ''
    }
    for (let i = 0; i < this.lineasAlbaran.length; i++) {
      this.linAlbCli.serieAlbaran = this.myForm.controls['serieAlb'].value,
        this.linAlbCli.numeroAlbaran = resp,
        this.linAlbCli.orden = 0,
        this.linAlbCli.codigoArticulo = this.lineasAlbaran[i].codProducto,
        this.linAlbCli.tipoArticulo = this.articulos[i].tipoArticulo,
        this.linAlbCli.codigoAlmacen = this.lineasAlbaran[i].codigoAlmacen,
        this.linAlbCli.partida = this.lineasAlbaran[i].partida,
        this.linAlbCli.descripcionArticulo = this.articulos[i].descripcionArticulo,
        this.linAlbCli.codigoFamilia = this.articulos[i].codigoFamilia,
        this.linAlbCli.codigoIva = 18,
        this.linAlbCli.unidades = this.lineasAlbaran[i].peso,
        this.linAlbCli.unidades2 = this.lineasAlbaran[i].peso,
        this.linAlbCli.precio = this.articulos[i].precioVenta,
        this.linAlbCli.precioRebaje = this.articulos[i].precioVenta,
        this.linAlbCli.iva = 18.0,
        this.linAlbCli.CoBobinas = this.lineasAlbaran[i].CoBobinas

      this.arrayLinAlbCli.push(this.linAlbCli);
      arraySplitPartida = this.lineasAlbaran[i].partida.split(' ');
      etiqueta.numAlb = resp.toString();
      etiqueta.numBulto = arraySplitPartida[1];

      this.arrayEtiquetas.push(etiqueta);
      arraySplitPartida = [];
      etiqueta = {
        numAlb: '',
        numBulto: ''
      }

      this.linAlbCli = {
        serieAlbaran: '',
        numeroAlbaran: 0,
        orden: 0,
        codigoArticulo: '',
        tipoArticulo: '',
        codigoAlmacen: '',
        partida: '',
        descripcionArticulo: '',
        codigoFamilia: '',
        codigoIva: 0,
        unidades: 0,
        unidades2: 0,
        precio: 0,
        precioRebaje: 0,
        iva: 0,
        CoBobinas: 0
      }
    }


    this.texberService.postLinAlbCli(this.arrayLinAlbCli).subscribe(resp => {
      if (resp.length > 0) {
        for(let i = 0; i < resp.length; i++){
          let a = document.createElement("a");
          a.href = resp[i];
          a.download = "etiqueta-" + this.arrayEtiquetas[i].numAlb + '-' + this.arrayEtiquetas[i].numBulto + '.pdf';
          a.click();
        }
        this.numAlbaran = 0;
        this.ordenLinAlbCli = 0;
        this.myForm.reset();

        this.router.navigate(['/texber/lliuraments/lliuraments/1']);
      }
    })
  }

}
