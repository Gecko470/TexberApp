import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfaces/interfaces';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  Register(usuario: Login): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/register`, usuario).pipe(
      tap(resp => { if (resp != 0 && resp != 1) sessionStorage.setItem('u', resp.usuario) }),
      tap(resp => { if (resp != 0 && resp != 1) sessionStorage.setItem('t', resp.token) })
    );
  }

  Login(usuario: Login): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/login`, usuario).pipe(
      tap(resp => { if (resp != 0) { sessionStorage.setItem('u', resp.usuario) } }),
      tap(resp => { if (resp != 0) { sessionStorage.setItem('t', resp.token) } })
    );
  }

  Logout() {
    sessionStorage.removeItem('u');
    sessionStorage.removeItem('t');
  }

  verifToken(token: string): Observable<boolean> {

    if (!sessionStorage.getItem('t')) {
      return of(false);
    }

    return this.http.get<Login>(`${environment.baseUrl}/verifToken/${token}`).pipe(
      tap( resp => {
        if (resp != null) {
          sessionStorage.setItem('u', resp.usuario);
          sessionStorage.setItem('t', resp.token);
        }
      }),
      map( resp => {
        return true;
      }));
  }

}
