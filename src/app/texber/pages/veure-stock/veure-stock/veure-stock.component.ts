import { Component, OnInit } from '@angular/core';
import { TexberService } from '../../../services/texber.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcumuladoStock } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-veure-stock',
  templateUrl: './veure-stock.component.html',
  styles: [
  ]
})
export class VeureStockComponent implements OnInit {

  public stockProducto: AcumuladoStock[] = [];
  public codProducto: string = '';
  public respuesta: string = '';

  myForm: FormGroup = this.fb.group({
    codBarras: ['', [Validators.required]]
  });

  constructor(private texberService: TexberService, private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  campoEsValido(campo: string) {
    return this.myForm.controls[campo].errors;
  }

  buscarStock() {
    this.codProducto = this.myForm.controls['codBarras'].value.slice(0, 11);
    this.myForm.controls['codBarras'].setValue(this.codProducto);
    this.texberService.getStockByCod(this.codProducto).subscribe(resp => {
      this.stockProducto = resp;

      if (this.stockProducto.length == 0) {
        this.respuesta = "No s'han trobat resultats amb aquest codi..";
      }
    });
  }
}
