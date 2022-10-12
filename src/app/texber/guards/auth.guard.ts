import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router){}

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      /* if(this.authService.Auth.token == localStorage.getItem('t')){
        return true;
      }
      
      return false; */
      return this.authService.verifToken(sessionStorage.getItem("t") || ""). pipe(
        tap( resp => {
          if(!resp){
            this.router.navigate(['']);
          }
        })
      );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> |  boolean {
      /* if(this.authService.Auth.token == localStorage.getItem('t')){
        return true;
      }
      
      return false; */
      return this.authService.verifToken(sessionStorage.getItem("t") || ""). pipe(
        tap( resp => {
          if(!resp){
            this.router.navigate(['']);
          }
        })
      );
  }
}
