import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { environment } from "src/environments/environment";
import { InfoDia, ListaPresencaDto } from "../../Pedag-Models/infodia.model";


@Component({
    selector: 'calendarioturma-app',
    templateUrl: './calendarioturma.component.html',
    styleUrls: ['./calendarioturma.component.scss'],
    animations: [HighlightTrigger]

})

export class CalendarioTurmaComponent implements OnInit {

    private _baseUrl = environment.baseUrl
    public showSpin = true
    // public listaPresencaDto: ListaPresencaDto[] = new Array<ListaPresencaDto>();
    // public infoDia: InfoDia = new InfoDia();
    //public saveCommand: SavePresencaCommand = new SavePresencaCommand();
    // public observacoes: string = "";
    // public obsForm: FormGroup;
    // public diaAulaString: any
    public calendarios: any[] = new Array<any>()
    constructor(
        private _http: HttpClient,
        private _fb: FormBuilder,
        private _modal: MatDialog,
        public _dialogRef: MatDialogRef<CalendarioTurmaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        // this.obsForm = this._fb.group({
        //     observacoes: ['', [Validators.required]]
        // })
    }

    ngOnInit() {
        console.log(this.data['turma'])

        this.GetCalendarioTurma(this.data['turma'].id);
    }

    private GetCalendarioTurma(turmaId: number) {

        this._http.get(`${this._baseUrl}/pedag/turma/calendario/${turmaId}`)
            .subscribe(resp => {

                console.log(resp)
                this.calendarios = Object.assign([], resp['calends'])
                console.log(this.calendarios)

            },
                (error) => {
                    console.log(error)
                    this.showSpin = false
                },
                () => {
                    this.showSpin = false
                })
    }

    concluirAula() {
        // calendárioId
    }

    getNotaAula(caleId: number) {
        const dialogRef = this._modal
        .open(ObservacoesTurmaModal, {
            height: 'auto',
            width: '500px',
            autoFocus: false,
            //maxHeight: '90vh',
            //maxWidth: '400vh',

            data: { caleId: caleId },
            hasBackdrop: true,
            disableClose: true
        });
    dialogRef.afterClosed().subscribe(result => {
        if (result.clicked === "Sim") {
         

        } else {
            console.log('nao')
        }

    });
    }






}



@Component({
    selector: 'confirmdialog',
    templateUrl: './obsturmamodal.component.html'
})
export class ObservacoesTurmaModal implements OnInit{

    private _baseUrl = environment.baseUrl
    public observacao: string = ""
    constructor(
        private _http: HttpClient,
        public dialogRef: MatDialogRef<ObservacoesTurmaModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

        ngOnInit() {
            console.log(this.data['caleId'])
    
            this.GetObservacao(this.data['caleId']);
        }

        private GetObservacao(calendarId){

            this._http.get(`${this._baseUrl}/turmas/calendario/nota-aula/${calendarId}`)
            .subscribe(resp => {

                console.log(resp)
                this.observacao = resp['nota']
                

            },
                (error) => {
                    console.log(error)
                
                },
                () => {
                
                })
        }
}

