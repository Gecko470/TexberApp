import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../texber/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  respuesta: string = '';

  myForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  campoEsValido(campo: string) {
    return this.myForm.controls[campo].errors;
  }

  login(){
    this.authService.Login(this.myForm.value).subscribe( resp => {
      if(resp != 0){
        this.router.navigate(['texber']);
      }
      else{
        this.respuesta = "Dades d'accés incorrectes..";
      }
    });
    this.respuesta = "";
  }

}
