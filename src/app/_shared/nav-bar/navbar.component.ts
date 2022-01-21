import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "src/app/_Auth/auth.service";
import { TrocaSenhaComponent } from "src/app/_Auth/user/trocaSenha/troca-senha.component";

declare interface RouteInfo {
    path: string;
    title: string;
    class: string;
    //typeIcon: string;
}

export const ROUTES: RouteInfo[] = [
    { path: './adm', title: 'Administrativo', class: '' },
    { path: './newmat', title: 'Matrícula', class: '', },
    { path: './pedag', title: 'Pedagógico', class: '', },
    { path: './comercial', title: 'Comercial', class: '', },
    { path: './financeiro', title: 'Financeiro', class: '', }
   // { path: './aluno', title: 'Aluno', class: '', }
   // { path: './geral', title: 'Master', class: '', },
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
        private _router: Router,
        public authService: AuthService,
        private _modal: MatDialog,
    ) { }

    ngOnInit() {
        console.log('enter navBar')
        this.menu = ROUTES.filter(menu => menu);
        //this.isUserAuthenticated();
    }

    trocarSenha() {
        const dialogRef = this._modal
            .open(TrocaSenhaComponent, {
                height: '460px',
                width: '360px',
                autoFocus: false,
                maxHeight: '400vh',

                data: {},
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === true) {

                localStorage.removeItem("jwt");
                
                this._router.navigateByUrl('user/login');
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });

    }

    logout() {
        localStorage.removeItem("jwt");
        this._router.navigateByUrl('user/login');
    }

}