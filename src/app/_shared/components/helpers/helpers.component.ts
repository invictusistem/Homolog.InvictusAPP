import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable()
export class HelpersService {

    dialog: any
    modal: any
    public cep: CEP = new CEP()
    constructor(
        private _snackBar: MatSnackBar,
        private _http: HttpClient
    ) {

    }

    public openSnackBar(mensagem) {
        this._snackBar.open(mensagem, '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass:['mat-toolbar', 'mat-primary'],
            duration: 3 * 1000,
        });
    }

    public openSnackBarError(mensagem) {
        this._snackBar.open(mensagem, '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass:['mat-toolbar', 'mat-warn'],
            duration: 3 * 1000,
        });
    }


    public CloseModalWithOK<TDialogRef>() {
        this.modal as MatDialogRef<TDialogRef>
        this.modal.close({ clicked: "Ok" });
    }

    // public ConsultarCepForm(CEP: string):Observable<CEP> {

    //     if (CEP.length == 10) {
    //         CEP = CEP.replace('-', '');
    //         CEP = CEP.replace('.', '');
    //         //console.log(CEP);

    //         this._http.get(`https://viacep.com.br/ws/${CEP}/json/`, {})
    //             .subscribe(response => {
    //                 this.cep.logradouro = response["logradouro"].toUpperCase()
    //                 this.cep.bairro = response["bairro"].toUpperCase()
    //                 this.cep.localidade = response["localidade"].toUpperCase()
    //                 this.cep.uf = response["uf"].toUpperCase()

    //             }, err => {
    //                 console.log(err)
    //                 return this.cep
    //             },
    //                 () => {


    //                 });

    //                return this.cep
    //     }



    // }


}

export class CEP {
    constructor(
        public logradouro?: string,
        public bairro?: string,
        public localidade?: string,
        public uf?: string
    ) { }
}