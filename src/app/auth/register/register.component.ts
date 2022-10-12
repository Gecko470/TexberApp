import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/texber/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  resp: string = '';

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

  register(){
    this.authService.Register(this.myForm.value).subscribe( resp => {
      if(resp != 0 && resp != 1){
        this.router.navigate(['texber']);
      }
      else if(resp == 0){
        this.resp = "Aquest usuari ja existeix a la base de dades..";
        
      }
      else{
        this.resp = "Dades de registre no vàlides..";
      }
    });
    this.resp = "";
  }

}
