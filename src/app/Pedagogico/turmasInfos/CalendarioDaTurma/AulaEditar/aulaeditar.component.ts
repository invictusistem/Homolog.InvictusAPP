import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PedagogicoService } from "src/app/Pedagogico/service/pedagogico.service";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { environment } from "src/environments/environment";


@Component({
    selector: 'aulaeditarmodaldialog',
    templateUrl: './aulaeditar.component.html',
    styleUrls:['./aulaeditar.component.scss'],
    animations: [HighlightTrigger]
})
export class AulaEditarModal implements OnInit{

    //private _baseUrl = environment.baseUrl
    public initProgressBar = 'visible'
    public showContent = false
    public aula: any
    public salas: any[] = new Array<any>()
    public materias: any[] = new Array<any>()
    constructor(
        //private _http: HttpClient,
        private _pedagService: PedagogicoService,
        public dialogRef: MatDialogRef<AulaEditarModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

        ngOnInit() {
            //this.dialogRef.addPanelClass('auladetalhe-class')
           // this.GetAulaInfos()
           this.GetAulaInfos()
        }

        private GetAulaInfos(){

            this._pedagService.GetAulaEditViewModel(this.data['caled'].id)
                .subscribe(
                    sucesso => { this.GetAulaInfosSucesso(sucesso)},
                    falha => { this.GetAulaInfosFalha(falha)}
                )
        }

        private GetAulaInfosSucesso(resp){
            this.aula = resp['aula']
            // console.log(this.aula)
            this.salas = resp['salas']
            this.materias = resp['materias']

            this.dialogRef.addPanelClass('auladetalhe-class')
            this.initProgressBar = 'hidden'
            this.showContent = true
        }

        private GetAulaInfosFalha(error){

        }

        public SaveEdit(form){

        }
}

