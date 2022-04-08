import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HelpersService } from '../components/helpers/helpers.component';
import { TokenInfos } from '../models/token.model';

@Component({
    selector: 'app-base',
    template: ``,
    styles: [
    ]
})
export class BaseComponent{

    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    //protected BaseUrl: string = environment.baseUrl
    //protected helper = this._helper
    //private _snackBar?: MatSnackBar
   // protected _helper?: HelpersService | undefined
  
    constructor(
       // public _helper: HelpersService,
        public _snackBar: MatSnackBar,        
        
    ) {
       //this._helper = new HelpersService(this._snackBar as MatSnackBar)
       this.GetTokenInfos()
    }
    // ngOnInit(): void {
    //     this.GetTokenInfos()
    //     console.log(this.tokenInfo)
    // }
   
    public openSnackBarSucesso(mensagem?:any) {       

        this._snackBar?.open(mensagem, '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass:['mat-toolbar', 'mat-primary'],
            duration: 5 * 1000,
        });
    }

    public openSnackBarError(mensagem?:any) {
        this._snackBar?.open(mensagem, '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass:['mat-toolbar', 'mat-warn'],
            duration: 5 * 1000,
        });
    }

    public openSnackBarErrorDefault() {
        this._snackBar?.open('Ocorreu um erro, favor procure o administrador do sistema.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass:['mat-toolbar', 'mat-warn'],
            duration: 5 * 1000,
        });
    }

    protected GetTokenInfos() {
        const token: any = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)

        return this.tokenInfo
    }
}