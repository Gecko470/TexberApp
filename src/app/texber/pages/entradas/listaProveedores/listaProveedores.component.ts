import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TexberService } from '../../../services/texber.service';
import { Proveedor, Cliente, DatosEntrada } from '../../../interfaces/interfaces';
import { Router } from '@angular/router';


@Component({
  selector: 'app-entradas',
  templateUrl: './listaProveedores.component.html',
  styles: [
    `
    li {
      cursor: pointer;
    }

    `
  ]
})
export class ListaProveedoresComponent implements OnInit {

  listaClientes: Cliente[] = [];
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
  datosEntrada: DatosEntrada = {
    codCliente: '',
    codFibra: '',
    datosEstablecidos: 0,
    numBulto: 0,
    orden: 0,
    numAlbaran: 0
  }

  myForm: FormGroup = this.fb.group({
    codigoCliente: ['0', [Validators.required]]
  });

  constructor(private texberSevice: TexberService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.texberSevice.getClientes().subscribe( resp => this.listaClientes = resp );
  }

  campoEsValido(campo: string) {

    return (this.myForm.controls[campo].value == '0');
  }

  seleccionarCliente() {
    this.texberSevice.getClienteByCod(this.myForm.controls['codigoCliente'].value).subscribe( resp => { 
      this.clienteSeleccionado = resp;
      this.datosEntrada.codCliente = this.clienteSeleccionado.codigoCliente;
     });
    this.texberSevice.setDatosEntrada(this.datosEntrada);
  }

  navegar(){
    this.texberSevice.borrarDatosEntrada();
    this.router.navigate(['/texber/home']);
  }

}
