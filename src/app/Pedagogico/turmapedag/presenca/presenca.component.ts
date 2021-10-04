import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { environment } from "src/environments/environment";
import { InfoDia, ListaPresencaDto } from "../../Pedag-Models/infodia.model";


@Component({
    selector: 'presenca-app',
    templateUrl: './presenca.component.html',
    styleUrls: ['./presenca.component.scss']
    //animations: [HighlightTrigger]

})

export class PresencaComponent implements OnInit {

    private _baseUrl = environment.baseUrl
    public listaPresencaDto: ListaPresencaDto[] = new Array<ListaPresencaDto>();
    public infoDia: InfoDia = new InfoDia();
    public saveCommand: SavePresencaCommand = new SavePresencaCommand();
    public observacoes: string = "";
    public obsForm: FormGroup;
    public diaAulaString: any
    constructor(
        private _http: HttpClient,
        private _fb: FormBuilder,
        private _modal: MatDialog,
        public _dialogRef: MatDialogRef<PresencaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.obsForm = this._fb.group({
            observacoes: ['', [Validators.required]]
        })
    }

    ngOnInit() {
        console.log(this.data['turma'])

        this.getPresencaViewModel(this.data['turma'].id);
    }

    getPresencaViewModel(turmaId: number) {

        this._http.get(`${this._baseUrl}/pedag/presenca-lista/${turmaId}`)
            .subscribe(resp => {

                console.log(resp)
                this.infoDia = Object.assign({}, resp['infos'])
                //this.infoDia.diaAula = new Date(this.infoDia.diaAula).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })
                this.diaAulaString = new Date(this.infoDia.diaAula).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })
                this.listaPresencaDto = Object.assign([], resp['lista'])

            },
                (error) => { console.log(error) },
                () => { })
    }

    concluirAula() {
        // calendárioId
    }

    concluiraula(form: any): void {
        //console.log(item)
        const dialogRef = this._modal
            .open(ConcluirAulaModal, {
                height: 'auto',
                width: '500px',
                autoFocus: false,
                //maxHeight: '90vh',
                //maxWidth: '400vh',

                data: { form: form },
                hasBackdrop: true,
                disableClose: true
            });
        dialogRef.afterClosed().subscribe(result => {
            if (result.clicked === "Sim") {
                console.log(form.value)
                this.salvar(form);

            } else {
                //console.log('nao')
            }

        });
    }

    get disabledSave() {

        var disabledButton = true
        var temNull = this.listaPresencaDto.filter((lista) => {
            return lista.isPresentToString == null || lista.isPresentToString == "";
        })

        console.log(temNull);

        if (temNull.length == 0) {
            disabledButton = false
        } else {
            disabledButton = true
        }

        if(!disabledButton && this.obsForm.valid){
            return  false
        }else{
            return  true
        }

        //return !this.obsForm.valid && !disabledButton

    }


    salvar(form: any) {

        if (form.valid) {
            console.log(this.listaPresencaDto)
            this.saveCommand.listaPresencaDto = this.listaPresencaDto
            this.saveCommand.calendarId = this.infoDia.id
            this.saveCommand.observacoes = this.obsForm.get('observacoes').value// this.observacoes
            // this.infoDia => calendario.Id
            this._http.post(`${this._baseUrl}/pedag/presenca-lista`, this.saveCommand, {})
                .subscribe(resp => {

                    //console.log(resp)
                    // this.infoDia = Object.assign({}, resp['infos'])
                    // this.listaPresencaDto = Object.assign([],resp['lista'])

                },
                    (error) => { console.log(error) },
                    () => {
                        this._dialogRef.close({ clicked: "OK" })
                    })
        }
    }

    presente = true

}


@Component({
    selector: 'confirmdialog',
    template: `<div class="container">
    <div class="row" style="margin-bottom: 10px;">
        <div style="font-size: 1.2em;">Tem certeza que deseja concluir a aula?</div>
        <div>
            Após a conclusão, não será possível retornar a tela de presenças novamente.
        </div>
    </div>
    <div class="row">
        <button style="width: 30px;" [mat-dialog-close]="{clicked:'Sim'}" mat-button>SIM</button>
        <button style="width: 30px;" [mat-dialog-close]="{clicked:'Cancel'}" mat-button>NÃO</button>
    </div>
</div>`,
})
export class ConcluirAulaModal {

    constructor(
        public dialogRef: MatDialogRef<ConcluirAulaModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
}

export class SavePresencaCommand {
    constructor(
        public listaPresencaDto?: ListaPresencaDto[],
        public calendarId?: number,
        public observacoes?: string
    ) {

    }
}