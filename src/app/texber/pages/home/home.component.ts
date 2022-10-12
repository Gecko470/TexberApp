import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
   
  ]
})
export class HomeComponent implements OnInit {

  usuario: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = sessionStorage.getItem('u') || '';
  }

  logout(){
    this.authService.Logout();
    this.router.navigate(['/']);
  }

}
