import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { environment } from "src/environments/environment";
import { InfoDia, ListaPresencaDto } from "../../Pedag-Models/infodia.model";
import { AulaEditModalConfig, ObsTurmaModalConfig, OpenCalendarioPresencaomponentModal } from "../../service/modal.config";
import { ObservacoesTurmaModal } from "./AulaDetalhe/obsturmamodal.component";
import { AulaEditarModal } from "./AulaEditar/aulaeditar.component";
import { CalendPresencaComponent } from "./CalendPresenca/cal-presenca.component";


@Component({
    selector: 'calendarioturma-app',
    templateUrl: './calendarioturma.component.html',
    styleUrls: ['./calendarioturma.component.scss'],
    animations: [HighlightTrigger]

})

export class CalendarioTurmaComponent implements OnInit {

    private _baseUrl = environment.baseUrl
    public showSpin = false
    public initProgressBar = 'visible'
    public ShowTableHeader = false
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
        //console.log(this.data['turma'])
        this._dialogRef.addPanelClass('pedagcalendar-class')
        this.GetCalendarioTurma(this.data['turma'].id);
    }

    private GetCalendarioTurma(turmaId: number) {

        this._http.get(`${this._baseUrl}/pedag/turma/calendario/${turmaId}`)
            .subscribe(resp => {

                //console.log(resp)
                this.calendarios = Object.assign([], resp['calends'])
                console.log(this.calendarios)

            },
                (error) => {
                    console.log(error)
                    this.showSpin = true
                },
                () => {
                    this.ShowTableHeader = true
                    this.initProgressBar = 'hidden'
                    this.showSpin = true
                    //this._dialogRef.addPanelClass('pedagcalendar-class')
                })
    }

    concluirAula() {
        // calendárioId
    }

    public GetNotaAula(caled): void {
        const dialogRef = this._modal
            .open(ObservacoesTurmaModal, ObsTurmaModalConfig(caled));
        dialogRef.afterClosed().subscribe(data => {
        });
    }

    openPresenca(calend: any): void {
        const dialogRef = this._modal
           .open(CalendPresencaComponent, OpenCalendarioPresencaomponentModal(calend));
        dialogRef.afterClosed().subscribe(data => {
        });
    }

    public EditAula(caled): void {
        const dialogRef = this._modal
            .open(AulaEditarModal, AulaEditModalConfig(caled));
        dialogRef.afterClosed().subscribe(data => {
            if (data['result'] == true) {
                let index = this.calendarios.findIndex((obj => obj.id == data['aula'].id));
                this.calendarios[index] = data['aula']
                console.log(this.calendarios[index])

            }
        });
    }
}

