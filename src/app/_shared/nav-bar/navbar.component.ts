import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "src/app/_Auth/auth.service";

declare interface RouteInfo {
    path: string;
    title: string;
    class: string;
    //typeIcon: string;
}

export const ROUTES: RouteInfo[] = [
    { path: './adm', title: 'Administrativo', class: '' },
    //{ path: './newmat', title: 'Matrícula', class: '', },
    { path: './pedag', title: 'Pedagógico', class: '', },
    { path: './comercial', title: 'Comercial', class: '', },
    { path: './financeiro', title: 'Financeiro', class: '', },
    { path: './aluno', title: 'Aluno', class: '', },
    { path: './geral', title: 'Master', class: '', },
    //{ path:'./operadorUP', title:'Painel Técnicos Externos', class:''},
    //{ path: '/adm/colaboradores', title: 'Colaboradores', class: '', typeIcon: 'engineering' },
    //{ path: '/adm/produtos', title: 'Produtos', class: '', typeIcon: 'fact_check' },
]

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.component.scss']
})

export class NavBarComponent implements OnInit {

    menu: any;
    constructor(
        public authService: AuthService
        //private jwtHelper: JwtHelperService
        ) { }

    ngOnInit() {
         this.menu = ROUTES.filter(menu => menu);
        //this.isUserAuthenticated();
    }

    // isUserAuthenticated() {
    //     const token: string = localStorage.getItem("jwt");
    //     console.log(token)
    //     if (token == null) {
           

    //     }
    //     else if (this.jwtHelper.isTokenExpired(token)) {
           
    //         console.log('expired')
    //     } else {
    //         console.log('routed')
    //         this.menu = ROUTES.filter(menu => menu);
    //     }
    // }
    // public logOut = () => {
    //     localStorage.removeItem("jwt");
    // }

}