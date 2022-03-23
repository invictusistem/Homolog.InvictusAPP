import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { environment } from "src/environments/environment";
import { InfoDia, ListaPresencaDto } from "../../Pedag-Models/infodia.model";


@Component({
    selector: 'turmasinfonotas-app',
    templateUrl: './turmasinfonotas.component.html',
    styleUrls: ['./turmasinfonotas.component.scss'],
    animations: [HighlightTrigger]

})

export class TurmasInfoNotasComponent implements OnInit {

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
        public _dialogRef: MatDialogRef<TurmasInfoNotasComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        // this.obsForm = this._fb.group({
        //     observacoes: ['', [Validators.required]]
        // })
    }

    ngOnInit() {
       // console.log(this.data['turma'])
//
        this.GetCalendarioTurma(this.data['turma'].id);
    }

    private GetCalendarioTurma(turmaId: number) {

        this._http.get(`${this._baseUrl}/turmas/calendario/${turmaId}`)
            .subscribe(resp => {

               // console.log(resp)
                this.calendarios = Object.assign([], resp['calendarioTurmaView'])
                //console.log(this.calendarios)

            },
                (error) => {
                   // console.log(error)
                    this.showSpin = false
                },
                () => {
                    this.showSpin = false
                })
    }

    concluirAula() {
        // calendárioId
    }
  






}




