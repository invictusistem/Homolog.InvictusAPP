import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { TurmaViewModel } from "src/app/_shared/models/Turma.model";
import { environment } from "src/environments/environment";
import { AgendamentoComponent } from "./agendamento/agendamento.component";
import { NotasComponent } from "./notas/notas.component";
import { PresencaComponent } from "./presenca/presenca.component";


@Component({
    selector: 'turmas-app',
    templateUrl: './turmas.component.html',
    animations: [HighlightTrigger]

})

export class TurmasComponent implements OnInit {

    private BaseUrl = environment.baseUrl;
    showPresencaIcon = false
    turmas: any[] = new Array<any>();// TurmaViewModel[] = new Array<TurmaViewModel>();
    showTurmas = false
    showMessage = false
    showSpinner = false
    mensagem: string;
    private jwtHelper = new JwtHelperService();
    tokenInfo: TokenInfos = new TokenInfos();





    constructor(
        private _http: HttpClient,
        private _modal: MatDialog
    ) {

    }
    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.getTurmas();

    }

    agendarProvas() {

    }



    getTurmas() {

        this.showTurmas = false
        this.showMessage = false
        this.showSpinner = true

        this._http.get(`${this.BaseUrl}/pedag/turma`)
            .subscribe(response => {
                this.turmas = Object.assign([], response['turmas']);
                console.log(this.turmas)
            },
                (error) => {
                    // this.mensagem = "Ocorreu um erro! Contate o Administrador!"
                    console.log(error)
                    this.mensagem = "Não há turmas cadastradas ou em andamento."
                    this.showTurmas = false
                    this.showMessage = true
                    this.showSpinner = false
                },
                () => {
                    this.showTurmas = true
                    this.showMessage = false
                    this.showSpinner = false
                })
    }

    openNotas(turma): void {

        const dialogRef = this._modal.open(NotasComponent, {
            height: 'auto',
            width: '1030px',
            autoFocus: false,
            maxHeight: '90vh',
            maxWidth: '400vh',
            data: { turma: turma },
            hasBackdrop: true,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }

    podeIniciarAula(turma) {
        //console.log('pode iniciar')
        if (this.tokenInfo.role == 'MasterAdm') {
            return false
        }


        return !turma.podeIniciar
    }

    openAgendamento(turma): void {

        const dialogRef = this._modal.open(AgendamentoComponent, {
            height: 'auto',
            width: '1130px',
            autoFocus: false,
            maxHeight: '110vh',
            maxWidth: '450vh',
            data: { turma: turma },
            hasBackdrop: true,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }

    openPresenca(turma: TurmaViewModel): void {

        const dialogRef = this._modal.open(PresencaComponent, {
            height: 'auto',
            width: '1030px',
            autoFocus: false,
            // maxHeight: '90vh',
            maxWidth: '400vh',
            data: { turma: turma },
            hasBackdrop: true,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }

    iniciarAula(turma: TurmaViewModel) {

        const dialogRef = this._modal
            .open(ConfirmarIniciarAulaModal, {
                height: 'auto',
                width: '500px',
                autoFocus: false,
                //maxHeight: '90vh',
                //maxWidth: '400vh',

                data: { turma: turma },
                hasBackdrop: true,
                disableClose: true
            });
        dialogRef.afterClosed().subscribe(result => {
            if (result.clicked === "Sim") {

                // console.log(turmaId)
                // this.http.put(`${this.baseUrl}/turmas/turma/${turmaId}`, {
                this.openPresenca(turma)

            } else {
                console.log('nao')
            }

        });



        // this.showPresencaIcon = true
        //  turma.aulaIniciada = true

    }

}



@Component({
    selector: 'confirmdialog',
    template: `<div class="container">
    <div class="row" style="margin-bottom: 10px;">
        <div style="font-size: 1.2em;">
            Professor! Tem certeza que deseja inicar a aula?
        </div>
        <br>
        <div style="text-align: justify; margin-top: 10px">
            A aula será iniciada e só poderá ser encerrada ao final da aula após o preenchimento da lista de presença e do 
            conteúdo programático.
        </div>
    </div>
    <div class="row">
        <button color="primary" style="width: 30px;" (click)="iniciarAula()" mat-button>SIM</button>
        <button style="width: 30px;" [mat-dialog-close]="{clicked:'Cancel'}" mat-button>NÃO</button>
    </div>
</div>`,
})
export class ConfirmarIniciarAulaModal implements OnInit {


    private BaseUrl = environment.baseUrl;

    constructor(
        private _http: HttpClient,
        public dialogRef: MatDialogRef<ConfirmarIniciarAulaModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        console.log(this.data['turma'].calendarioId)

    }

    iniciarAula() {
        // calendario/{calendarioId}
        this._http.put(`${this.BaseUrl}/turmas/calendario/${this.data['turma'].calendarioId}`, {})
            .subscribe(resp => {

            }, (error) => {
                console.log(error)
                this.dialogRef.close({ clicked: "Sim" })
            },
                () => {
                    this.dialogRef.close({ clicked: "Sim" })
                })



    }
}