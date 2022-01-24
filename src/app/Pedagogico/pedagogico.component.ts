import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenInfos } from '../_shared/models/token.model';



declare interface RouteInfo {
    path: string;
    title: string;
    class: string;
    typeIcon: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/pedag/matricula', title: 'Alunos', class: '', typeIcon: 'face' },
    { path: '/pedag/alunoacesso', title: 'Alunos/Acesso', class: '', typeIcon: 'face' },
  //  { path: '/pedag/pedagalunos', title: 'Alunos', class: '', typeIcon: 'face' },
    { path: '/pedag/transf', title: 'Transferência', class: '', typeIcon: 'sync_alt' },
   // { path: '/pedag/reposicoes', title: 'Reposições', class: '', typeIcon: 'change_circle' },
    { path: '/pedag/turmasinfo', title: 'Turmas', class: '', typeIcon: 'school' },
    { path: '/pedag/turmas', title: 'Diário de Classe', class: '', typeIcon: 'assignment' },
   // { path: '/pedag/pedagrel', title: 'Relatório', class: '', typeIcon: 'article' },
    { path: '/pedag/analisedocs', title: 'Documentação', class: '', typeIcon: 'description' },
    { path: '/pedag/config', title: 'Estágios', class: '', typeIcon: 'settings_applications' },
    { path: '/pedag/estagiosdoc', title: 'Estágios/Docs', class: '', typeIcon: 'settings_applications' },
]

@Component({
    selector: 'pedagogico-app',
    templateUrl: './pedagogico.component.html',
    styleUrls: ['./pedagogico.component.scss']
})

export class PedagogicoComponent implements OnInit{

    
    menu: any;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    
    constructor(
        private router: Router, 
        private http: HttpClient
        ) { 
            
        }
    ngOnInit(){
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
       this.menu = ROUTES.filter(menu => menu);
    }      


    invalidLogin: boolean;  

    logOut() {
        localStorage.removeItem("jwt");
        this.router.navigate(["/login"]);
    }

}