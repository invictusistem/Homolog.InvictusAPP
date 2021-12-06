import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { MessageModalComponent } from './messageModal/messagemodal.component';

declare interface RouteInfo {
    path: string;
    title: string;
    class: string;
    typeIcon: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/adm/usuarios', title: 'Usuários', class: '', typeIcon: 'manage_accounts' },
    //{ path: '/adm/calendario', title: 'Calendário', class: '', typeIcon: 'calendar_today' },
    { path: '/adm/admcursos', title: 'Turmas', class: '', typeIcon: 'house' },
    { path: '/adm/colaboradores', title: 'Colaboradores', class: '', typeIcon: 'engineering' },
    { path: '/adm/professores', title: 'Professores', class: '', typeIcon: 'engineering' },
    { path: '/adm/produtos', title: 'Produtos', class: '', typeIcon: 'fact_check' },
    { path: '/adm/unidades', title: 'Unidade', class: '', typeIcon: 'home' },
    { path: '/adm/config', title: 'Configurações', class: '', typeIcon: 'settings' },
    { path: '/adm/modulo', title: 'Pacotes', class: '', typeIcon: 'school' },
    { path: '/adm/planopgm', title: 'Planos', class: '', typeIcon: 'request_quote' },
    { path: '/adm/contrato', title: 'Contratos', class: '', typeIcon: 'gavel' },
   // { path: '/adm/teste', title: 'TESTE', class: '', typeIcon: 'fact_check' },
]

@Component({
    selector: 'adm-app',
    templateUrl: './adm.component.html',
    styleUrls: ['./adm.component.scss']
})

export class AdmComponent implements OnInit {
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
        if(this.data != ""){ 
            this.getMessage();    
            console.log('show message') 
        
        }
        this.menu = ROUTES.filter(menu => menu);
    }

    getMessage(){

        this._http.get(`${this.baseUrl}/mensagem`)
        .subscribe(resp => { 
                console.log(resp)
                this.mensagem = resp
                this.htmlContent = resp
        }, (error) => { console.log(error)},
        () => {
            this.openMessageModal()
        })
    }

    openMessageModal(): void {
        const dialogRef = this._modal
            .open(MessageModalComponent, {
                height: 'auto',
                width: '800px',

                data: { message: this.htmlContent },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                // Reset form here
                console.log('afte close ok')
                //this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }

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
        this._router.navigate(["/login"]);

    }

}