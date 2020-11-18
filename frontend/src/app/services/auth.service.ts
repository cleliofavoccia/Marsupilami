import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// URL d'authentification de l'API
const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  //Appel de la route d'authentification de l'API du serveur node
  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      login: credentials.login,
      password: credentials.password
    }, httpOptions);
  }
  //Appel de la route d'inscription de l'API du serveur node
  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      login: user.login,
      password: user.password,
    }, httpOptions);
  }
}
