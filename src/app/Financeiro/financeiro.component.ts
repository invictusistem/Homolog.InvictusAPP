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
    { path: '/financeiro/alunofin', title: 'Aluno/Financeiro', class: '', typeIcon: 'manage_accounts' },
    { path: '/financeiro/balanco', title: 'Caixa/Cursos', class: '', typeIcon: 'store' },
    { path: '/financeiro/fincaixa', title: 'Caixa/Produtos', class: '', typeIcon: 'store' },
    { path: '/financeiro/unidadebalanco', title: 'Balanço/Unidade', class: '', typeIcon: 'sync_alt' },
    { path: '/financeiro/fornecedor', title: 'Fornecedores', class: '', typeIcon: 'contact_page' },
    { path: '/financeiro/relatorio', title: 'Relatórios', class: '', typeIcon: 'description' }
] // sync_alt

@Component({
    selector: 'financeiro-app',
    templateUrl: './financeiro.component.html',
    styleUrls: ['./financeiro.component.scss']
})

export class FinanceiroComponent implements OnInit{

    
    menu: any;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    
    constructor(
        //private jwtHelper: JwtHelperService, 
        private router: Router, 
        private http: HttpClient
        ) { 
            
        }
    ngOnInit(){
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
       // this.isUserAuthenticated();
       this.menu = ROUTES.filter(menu => menu);
    }    

  

}