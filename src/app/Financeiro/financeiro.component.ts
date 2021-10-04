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
    constructor(
        //private jwtHelper: JwtHelperService, 
        private router: Router, 
        private http: HttpClient
        ) { 
            
        }
    ngOnInit(){
       // this.isUserAuthenticated();
       this.menu = ROUTES.filter(menu => menu);
    }    

  

}