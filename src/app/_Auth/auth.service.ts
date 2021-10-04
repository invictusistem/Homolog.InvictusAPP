import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  baseURL = environment.baseUrl;// 'https://localhost:44370/api/identity/login/';
  //https://localhost:44370/api/identity/login", credentials, {
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http
      .post(`${this.baseURL}/identity/login`, model,{
        
      }).pipe(
        map((response: any) => {
          const user = response;
          //console.log(user)
          if (user) {
            localStorage.setItem('jwt', user.accessToken);
            //this.decodedToken = this.jwtHelper.decodeToken(user.userToken);
            sessionStorage.setItem('username', user.userToken.nome);
          }
        })
      );
  }

//   register(model: any) {
//     return this.http.post(`${this.baseURL}register`, model);
//   }

  loggedIn() {
    const token = localStorage.getItem('jwt');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
