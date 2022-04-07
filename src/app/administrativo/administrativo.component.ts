import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { RouteInfo } from '../_shared/models/route-info.model';
import { TokenInfos } from '../_shared/models/token.model';

export const ROUTES: RouteInfo[] = [
    { path: '/adm/colaboradores', title: 'Colaboradores', class: '', typeIcon: 'engineering' },
    { path: '/adm/config', title: 'Configurações', class: '', typeIcon: 'settings' },
    { path: '/adm/planopgm', title: 'Planos', class: '', typeIcon: 'request_quote' },
    { path: '/adm/contrato', title: 'Contratos', class: '', typeIcon: 'gavel' },
    { path: '/adm/bolsas', title: 'Bolsas', class: '', typeIcon: 'local_offer' },
]

@Component({
    selector: 'administrativo-app',
    templateUrl: './administrativo.component.html',
    styleUrls: ['./administrativo.component.scss']
})

export class AdmComponent implements OnInit {

    menu: any;
    data: string = "";
    private baseUrl = environment.baseUrl;
    mensagem: any;
    public htmlContent: any;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public invalidLogin: boolean = false
    
    constructor(
        //private jwtHelper: JwtHelperService, 
        private _router: Router,
        private _fb: FormBuilder,
        private _modal: MatDialog,
        private _http: HttpClient) {
           
        const navigation: any = this._router.getCurrentNavigation();
        //  console.log(navigation.extras['state'])
        if (navigation.extras['state'] != undefined) {
            const state = navigation.extras.state as { data: string };
            this.data = state.data;
        }

    }
    ngOnInit() {
        // this.isUserAuthenticated();
        const token: any = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)

        //   console.log(this.data != "")
        if (this.data != "") {
            this.getMessage();
            // console.log('show message') 

        }
        this.menu = ROUTES.filter(menu => menu);
    }

    // getMessage() {

    //     this._http.get(`${this.baseUrl}/mensagem`)
    //         .subscribe(
    //             resp => {
    //             // console.log(resp)
    //             this.mensagem = resp['mensagem']
    //             this.htmlContent = resp['mensagem']
    //         }, (error) => { console.log(error) },
    //             () => {
    //                // this.openMessageModal()
    //             })
    // }

    getMessage() {

        this._http.get(`${this.baseUrl}/mensagem`)
        .subscribe({
            next: (v) => console.log(v),
            error: (e) => console.error(e)
        })
    }

   

    

   

    logOut() {
        localStorage.removeItem("jwt");
        this._router.navigate(["/login"]);

    }

}