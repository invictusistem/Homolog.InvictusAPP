import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Aluno } from "src/app/_shared/models/aluno.model";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { Debito, InfoFinanceiras } from "src/app/_shared/models/InfoFinanceiras.model";


@Component({
    selector: 'reapconfirmarmodal',
    templateUrl: './reapconfirmar.component.html',
    //styleUrls: ['./infos.component.scss'],
    animations: [HighlightTrigger]
})

export class ConfirmarParcelamento implements OnInit {

    baseUrl = environment.baseUrl;
   public reparcelaCommand: ReparcelaCommand = new ReparcelaCommand();
   showTable = false
    constructor(
        private _fb: FormBuilder,
        private _http: HttpClient,
        private _modal: MatDialog,
        // private _service: PedagService,
        public dialogRef: MatDialogRef<ConfirmarParcelamento>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        this.reparcelaCommand.valorEntrada = this.data['valorEntrada']
        this.reparcelaCommand.debitosIds = this.data['debitosIds']
        let valorDasParcelas = (this.data['totalFinal'] - this.data['valorEntrada']) / this.data['parcelas']
        //console.log(this.data)

        this.reparcelaCommand.parcelas = new Array<Parcelas>();
        for (let index = 0; index < this.data['parcelas']; index++) {
            var dataVencimento = new Date(this.data['vencimento'])    
            this.reparcelaCommand.parcelas.push(new Parcelas(
                new Date(
                    dataVencimento.getFullYear(),
                    dataVencimento.getMonth() + (index + 1),
                    dataVencimento.getDay()),valorDasParcelas))

            
        }

       // console.log(this.reparcelaCommand)
        this.showTable = true
     
    }

    confirmarParc(){

        this._http.post(`${this.baseUrl}/financeiro/reparcelar`, this.reparcelaCommand , {})
        .subscribe(resp => { 

        },(error) => { 
           // console.log(error)
        },
        () => { 
            this.dialogRef.close({ clicked: "OK"})
        })
    }

}


export class ReparcelaCommand{
    constructor(
        public valorEntrada?: number,
        public debitosIds?: number[],
        public parcelas?: Parcelas[]
    ){

    }
}

export class Parcelas{
    constructor(
        public vencimento?: Date,
        public valor?: number
    ){
        
    }
}

