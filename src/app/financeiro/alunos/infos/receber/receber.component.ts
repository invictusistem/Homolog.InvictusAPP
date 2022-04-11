import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HighlightTrigger } from "src/app/_shared/animation/animation";
import { environment } from "src/environments/environment";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";

@Component({
    selector: 'recebermodal',
    templateUrl: './receber.component.html',
    styleUrls: ['./receber.component.scss'],
    animations: [HighlightTrigger]
})

export class ReceberComponent implements OnInit {

    baseUrl = environment.baseUrl;

    public aluno: any;// = new Aluno();
    public debito: any;//Debito = new Debito();
    public turma: any
    public mostrarModalPrincipal = true
    public hoje: Date = new Date()
    public vencido = false

    public saveSpinner = 'hidden'
    // public valorReceber = 0
    //public valorQuitado = 0
    //public formaRecebimento = "Dinheiro"
    public recebimentoForm!: FormGroup

    constructor(
        private _fb: FormBuilder,
        private _http: HttpClient,
        private _modal: MatDialog,
        private _helper: HelpersService,
        // private _service: PedagService,
        public dialogRef: MatDialogRef<ReceberComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.recebimentoForm = _fb.group({
            boletoId: ['', [Validators.required]],
            valorReceber: [0],
            valorRecebido: [0, [Validators.required]],
            formaRecebimento: ['dinheiro', [Validators.required]],
            transferencia: ['caixaescola', [Validators.required]],
            digitosCartao: ['0000']

        })

        this.recebimentoForm.get('formaRecebimento')?.valueChanges.subscribe(
            (form: any) => {
                if (this.recebimentoForm.get('formaRecebimento')?.value == 'dinheiro') {

                    this.recebimentoForm.get('digitosCartao')?.disable()
                } else {
                    this.recebimentoForm.get('digitosCartao')?.enable()
                }
            }
        );
    }

    ngOnInit() {
        // this.dialogRef.addPanelClass('recebervalores-class')
        this.recebimentoForm.get('digitosCartao')?.disable()
        //console.log(this.data)
        this.aluno = Object.assign({}, this.data['aluno'])
        this.debito = Object.assign({}, this.data['debito'])
        //this.valorQuitado = this.debito.valor - this.debito.desconto
        this.recebimentoForm.get('boletoId')?.setValue(this.data['debito'].id)
        if (this.debito.statusBoleto == 'Vencido') {
            // console.log(this.debito.valor)
            this.recebimentoForm.get('valorReceber')?.setValue(this.debito.valor)
            this.recebimentoForm.get('valorRecebido')?.setValue(this.debito.valor)
        } else {
            let total = this.debito.valor - parseInt(this.debito.desconto)
            // console.log(total)
            this.recebimentoForm.get('valorReceber')?.setValue(total)
            this.recebimentoForm.get('valorRecebido')?.setValue(total)

        }

        this.mostrarModalPrincipal = false
    }

    get saveButton() {

        if (this.recebimentoForm.valid) {
            return this.saveSpinner != 'hidden'
        } else {
            return true
        }
    }


    public Quitar() {

        this.saveSpinner = 'visible'
        this._http.put(`${this.baseUrl}/financeiro/boleto-pagar`, this.recebimentoForm.value)
            .subscribe(resp => {

            },
                (error) => {
                    this.saveSpinner = 'hidden'
                    this._helper.openSnackBarErrorDefault();
                    // console.log(error) 
                },
                () => {
                    this._helper.openSnackBarSucesso("Status do boleto alterado com sucesso.")
                    this.dialogRef.close({ clicked: true })
                })
        //boleto-pagar/{idDebito}

    }


}