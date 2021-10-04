import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

declare interface RouteInfo {
    path: string;
    title: string;
    class: string;
    typeIcon: string;
}

export const ROUTES: RouteInfo[] = [
     { path: '/newmat/novamatricula', title: 'Matrícula', class: '', typeIcon: 'manage_accounts' }
    // { path: '/adm/calendario', title: 'Calendário', class: '', typeIcon: 'calendar_today' },
    // { path: '/adm/admcursos', title: 'Turmas', class: '', typeIcon: 'house' },
    // { path: '/adm/colaboradores', title: 'Colaboradores', class: '', typeIcon: 'engineering' },
    // { path: '/adm/produtos', title: 'Produtos', class: '', typeIcon: 'fact_check' },
    // { path: '/adm/unidades', title: 'Unidade', class: '', typeIcon: 'home' },
    // { path: '/adm/config', title: 'Configurações', class: '', typeIcon: 'settings' },
    // { path: '/adm/teste', title: 'TESTE', class: '', typeIcon: 'fact_check' },
]

@Component({
    selector: 'newmatricula-app',
    templateUrl: './newmatricula.component.html',
    styleUrls: ['./newmatricula.component.scss']
})

export class NewMatriculaComponent implements OnInit {
    menu: any;
    data: string = "";
    private baseUrl = environment.baseUrl;
    mensagem: any;
    public htmlContent: any;
    
    constructor(
        //private jwtHelper: JwtHelperService, 
        private _router: Router,
        private _modal: MatDialog,
        private _http: HttpClient) {
        const navigation = this._router.getCurrentNavigation();
        console.log(navigation.extras['state'])
        if (navigation.extras['state'] != undefined) {
            const state = navigation.extras.state as { data: string };
            this.data = state.data;
        }

    }
    ngOnInit() {
        // this.isUserAuthenticated();
        console.log(this.data != "")        
        this.menu = ROUTES.filter(menu => menu);
    }

    

    openMessageModal(): void {
        // const dialogRef = this._modal
        //     .open(MessageModalComponent, {
        //         height: 'auto',
        //         width: '800px',

        //         data: { message: this.htmlContent },
        //         hasBackdrop: true,
        //         disableClose: true
        //     });


        // dialogRef.afterClosed().subscribe((data) => {
        //     if (data.clicked === "Ok") {
        //         // Reset form here
        //         console.log('afte close ok')
        //         //this.getColaboradores(1, this.pageSize);
        //     } else if (data.clicked === "Cancel") {
        //         // Do nothing. Cancel any events that navigate away from the
        //         // component.
        //     }
        // });
    }
   

    logOut() {
        localStorage.removeItem("jwt");
        this._router.navigate(["/login"]);

    }

}