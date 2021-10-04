import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

declare interface RouteInfo {
    path: string;
    title: string;
    class: string;
    typeIcon: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/aluno/estagio', title: 'Estágios', class: '', typeIcon: 'domain' },
    { path: '/aluno/alunodocs', title: 'Documentação', class: '', typeIcon: 'attachment' }
]

@Component({
    selector: 'aluno-app',
    templateUrl: './aluno.component.html',
    styleUrls: ['./aluno.component.scss']
})

export class AlunoComponent implements OnInit {
    menu: any;
    constructor(
        //private jwtHelper: JwtHelperService, 
        private router: Router,
        private http: HttpClient) { }
    ngOnInit() {
        // this.isUserAuthenticated();
        this.menu = ROUTES.filter(menu => menu);
    }

    invalidLogin: boolean;
  
    logOut() {
        localStorage.removeItem("jwt");
        this.router.navigate(["/login"]);

    }

}