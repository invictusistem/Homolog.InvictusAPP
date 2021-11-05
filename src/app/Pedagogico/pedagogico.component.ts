import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



declare interface RouteInfo {
    path: string;
    title: string;
    class: string;
    typeIcon: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/pedag/matricula', title: 'Alunos', class: '', typeIcon: 'face' },
  //  { path: '/pedag/pedagalunos', title: 'Alunos', class: '', typeIcon: 'face' },
    { path: '/pedag/transf', title: 'Transferência', class: '', typeIcon: 'sync_alt' },
   // { path: '/pedag/reposicoes', title: 'Reposições', class: '', typeIcon: 'change_circle' },
    { path: '/pedag/turmasinfo', title: 'Turmas', class: '', typeIcon: 'school' },
    { path: '/pedag/turmas', title: 'Diário de Classe', class: '', typeIcon: 'assignment' },
    { path: '/pedag/pedagrel', title: 'Relatório', class: '', typeIcon: 'article' },
    { path: '/pedag/analisedocs', title: 'Documentação', class: '', typeIcon: 'description' },
    { path: '/pedag/estagio', title: 'Estágios', class: '', typeIcon: 'settings_applications' },
    { path: '/pedag/alunos', title: 'Estágios/alunos', class: '', typeIcon: 'settings_applications' },
    { path: '/pedag/estagiosdoc', title: 'Estágios/Docs', class: '', typeIcon: 'settings_applications' },
]

@Component({
    selector: 'pedagogico-app',
    templateUrl: './pedagogico.component.html',
    styleUrls: ['./pedagogico.component.scss']
})

export class PedagogicoComponent implements OnInit{

    
    menu: any;
    constructor(
        //private jwtHelper: JwtHelperService, 
        private router: Router, 
        private http: HttpClient
        ) { 
            
        }
    ngOnInit(){
       // this.isUserAuthenticated();
       this.menu = ROUTES.filter(menu => menu);
       console.log('pedaga modulo comp')
    }    

    


  //shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
    // isUserAuthenticated() {
    //     const token: string = localStorage.getItem("jwt");
    //     if (token && !this.jwtHelper.isTokenExpired(token)) {
    //         this.router.navigate(["/customers"]);
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }
    // public logOut = () => {
    //     localStorage.removeItem("jwt");
    // }

    invalidLogin: boolean;

    //constructor(private router: Router, private http: HttpClient) { }

    // login(form: NgForm) {
    //     const credentials = JSON.stringify(form.value);
    //     console.log(credentials)
    //     this.http.post("https://localhost:44370/api/identity/login", credentials, {
    //         headers: new HttpHeaders({
    //             "Content-Type": "application/json"
    //         })
    //     }).subscribe(response => {
    //         const token = (<any>response).accessToken;
    //         console.log(response)
    //         localStorage.setItem("jwt", token);
    //         this.invalidLogin = false;
    //         this.router.navigate(["/"]);
    //     }, err => {
    //         this.invalidLogin = true;
    //     });
    // }

    logOut() {
        localStorage.removeItem("jwt");
        this.router.navigate(["/login"]);
    }

}