import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { AgendaProvas } from "src/app/_shared/models/agenda.modal";
import { Materias, TurmaViewModel } from "src/app/_shared/models/Turma.model";
import { environment } from "src/environments/environment";


@Component({
    selector: 'agendamento-app',
    templateUrl: './agendamento.component.html'
    //, styleUrls: ['./agendamento.component.scss']
    //animations: [HighlightTrigger]

})

export class AgendamentoComponent implements OnInit {

    private BaseUrl = environment.baseUrl;
    public materias: Materias[] = new Array<Materias>();
    public turma: TurmaViewModel = new TurmaViewModel();
    public avaliacao = Avaliacao
    public showListaDatas = false
    public agendaProvas: AgendaProvas[] = new Array<AgendaProvas>()

    constructor(
        private _http: HttpClient,
        private _modal: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        //console.log(this.data['turma'])
        //console.log(this.data)
        this.turma = this.data['turma']
        this.getMaterias();
       // console.log(new Date('0001-01-01T00:00:00Z'));
    }

    getMaterias() {

        this._http.get(`${this.BaseUrl}/pedag/materias`)
        //this._http.get(`${this.BaseUrl}/pedag/agendas/${this.turma.id}`)
            .subscribe(response => {

                this.materias = Object.assign([], response)

            },
                (error) => { console.log(error) },
                () => {
                   // console.log(this.materias)
                })

    }

    setData(mat, Av: string, mode: string) {
        console.log(mode)
        const dialogRef = this._modal
            .open(SetDataModal, {
                height: 'auto',
                width: 'auto',
                autoFocus: false,
                //maxHeight: '90vh',
                //maxWidth: '400vh',

                data: { materia: mat, avaliacao: Av, mode: mode },
                hasBackdrop: true,
                disableClose: true
            });
        dialogRef.afterClosed().subscribe(result => {
            if (result.clicked === "SIM") {
                //console.log(this.materias)
            } else {

               // console.log('nao')
            }

        });
    }

    headerOne =""
    headerTwo =""

    avalAtual = 0;
    avalSelected(aval:number, avalString:string){
        // agenda
        //turmas    //turmaId, [FromQuery] int avaliacao)
        //console.log('aval selected '+aval)
        this.avalAtual = aval
        this._http.get(`${this.BaseUrl}/turmas/agenda/?turmaId=${this.data['turma'].id}&avaliacao=${aval}`)
        .subscribe(response => {

            this.agendaProvas = Object.assign([],response);

        },
        (error) => { console.log(error)},
        () => {
            this.headerOne = avalString
            this.showListaDatas = true
            //console.log(this.agendaProvas)
        })
    }

    saveCalendar(){

        //console.log(this.agendaProvas)
      //  var fsdf = JSON.stringify(this.agendaProvas)
      //  console.log(fsdf)
        
        this._http.post(`${this.BaseUrl}/turmas/agenda-atualizar/${this.avalAtual}`, this.agendaProvas,{})
        .subscribe(resp => {

        },
        (error) => { console.log(error)},
        () => { 
            
        })

    }

    keyPress(event: KeyboardEvent) {
        //     console.log(event)
        //     const pattern = /[0-9]/;
        // const inputChar = String.fromCharCode(event).charCode);
        // if (!pattern.test(inputChar)) {    
        //     // invalid character, prevent input
        //     event.preventDefault();
        // }

    }


    onFocusOutDateEvent(event: any) {
        var data;
       
        if (event.target.value.length == 10) {
            var data = event.target.value.split('/')
           //console.log(data)
            var dataForm: Date = new Date(parseInt(data[2]),parseInt(data[1]) - 1,
            parseInt(data[0]))
           
           // this.valor = dataForm.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })//dataForm.getDay
            
        }

    }
}


























@Component({
    selector: 'confirm-dialog',
    template: `<mat-form-field appearance="standard" style="width: 150px;">
    <mat-label>Data</mat-label>
    <date-input #valor [formControl]="date"
    (focusout)="onFocusOutDateEvent($event, valor)" name="nascimento"
        matInput required></date-input>
</mat-form-field> 
<br>
<button (click)="salvar()" type="submit" mat-raised-button disabled="false" style="float:right;margin-bottom: 10px;margin-left: 10px;">
Salvar
</button>
<button style="float:right;margin-bottom: 10px;" mat-raised-button
[mat-dialog-close]="{clicked:'Cancel'}">Cancel</button>`,
})
export class SetDataModal implements OnInit {

    dia: any
    mes: any
    ano: any
    private BaseUrl = environment.baseUrl;
    date = new FormControl('');

    constructor(
        private _http: HttpClient,
        public dialogRef: MatDialogRef<SetDataModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
    ngOnInit() {
        console.log(this.data)
        if (this.data['mode'] == "edit") {

            if (this.data['avaliacao'] == "1a") {

                console.log('editando')
                var dataArray = this.data['materia'].avaliacaoUm.split('/')
                console.log(dataArray)
                this.date = new FormControl({ dia: dataArray[0], mes: dataArray[1], ano: dataArray[2] });

            } else if(this.data['avaliacao'] == "2a"){

                console.log('editando')
                var dataArray = this.data['materia'].avaliacaoDois.split('/')
                console.log(dataArray)
                this.date = new FormControl({ dia: dataArray[0], mes: dataArray[1], ano: dataArray[2] });
              
            }else if(this.data['avaliacao'] == "3a"){
                console.log('editando')
                var dataArray = this.data['materia'].avaliacaoTres.split('/')
                console.log(dataArray)
                this.date = new FormControl({ dia: dataArray[0], mes: dataArray[1], ano: dataArray[2] });
            }else if (this.data['avaliacao'] == "1b") {

                console.log('editando')
                var dataArray = this.data['materia'].segundaChamadaAvaliacaoUm.split('/')
                console.log(dataArray)
                this.date = new FormControl({ dia: dataArray[0], mes: dataArray[1], ano: dataArray[2] });

            } else if(this.data['avaliacao'] == "2b"){

                console.log('editando')
                var dataArray = this.data['materia'].segundaChamadaAvaliacaoDois.split('/')
                console.log(dataArray)
                this.date = new FormControl({ dia: dataArray[0], mes: dataArray[1], ano: dataArray[2] });
              
            }else if(this.data['avaliacao'] == "3b"){
                console.log('editando')
                var dataArray = this.data['materia'].segundaChamadaAvaliacaoTres.split('/')
                console.log(dataArray)
                this.date = new FormControl({ dia: dataArray[0], mes: dataArray[1], ano: dataArray[2] });
            }
        }
    }

    // onNoClick(): void {
    //   this.dialogRef.close();
    // }
    //date = new Date;

    salvar() {
        //this.data['materia'].avaliacaoUm = new Date(this.date.value).toLocaleDateString()
        console.log(this.date.value);
        console.log(this.date.valid);
        console.log(this.data['materia']);
        if (this.date.valid) {

            if (this.data['avaliacao'] == "1a") {
                this.data['materia'].avaliacaoUm = new Date(this.date.value).toLocaleDateString()
            } else if (this.data['avaliacao'] == "2a"){
                this.data['materia'].avaliacaoDois = new Date(this.date.value).toLocaleDateString()
            }else if(this.data['avaliacao'] == "3a"){
                this.data['materia'].avaliacaoTres = new Date(this.date.value).toLocaleDateString()
            }else if (this.data['avaliacao'] == "1b") {
                this.data['materia'].segundaChamadaAvaliacaoUm = new Date(this.date.value).toLocaleDateString()
            } else if (this.data['avaliacao'] == "2b"){
                this.data['materia'].segundaChamadaAvaliacaoDois = new Date(this.date.value).toLocaleDateString()
            }else if(this.data['avaliacao'] == "3b"){
                this.data['materia'].segundaChamadaAvaliacaoTres = new Date(this.date.value).toLocaleDateString()
            }

            this._http.put(`${this.BaseUrl}/pedag/agendas`, this.data['materia'], {})
                .subscribe(response => {

                },
                    (error) => { console.log(error) },
                    () => {

                        this.dialogRef.close({ clicked: "SIM" });
                    })


        }
    }
    onFocusOutDateEvent(event: any, valor: any) {
        console.log(event);
        console.log(this.date.value);
        console.log(this.date.valid);
        console.log(valor);
        console.log(event.target.value);



        // console.log(this.colaboradorForm.get('nascimento').value)
        // var dataForm: Date = new Date(this.colaboradorForm.get('nascimento').value)

        // let timeDiff = Math.abs(Date.now() - dataForm.getTime());
        // let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        // console.log(age)
        // if (age < 18 && age != NaN) {
        //     this.showTabMenorIdade = true
        //     this.showPerguntaRespFinanc = false
        //     this.showFormRespFinanc = false
        //     this.colaboradorForm.get('temRespFin').setValue(true)
        // } else if (age > 18 && age != NaN) {
        //     this.showTabMenorIdade = false
        //     this.showPerguntaRespFinanc = true
        //     if (this.checkedRespFinanc.sim == true) {
        //         this.showFormRespFinanc = false
        //     } else {
        //         this.showFormRespFinanc = true
        //     }
        // }
    }

    

}


export const Avaliacao = [
    { type: 1, value: '1ª Avaliação' },
   // { type: 'segundaChamadaAvaliacaoUm', value: '2º Chamada aval. 1' },
    { type: 2, value: '2ª Avaliação' },
    //{ type: 'segundaChamadaAvaliacaoDois', value: '2º Chamada aval. 2' },
    { type: 3, value: '3ª Avaliação' }
    //{ type: 'segundaChamadaAvaliacaoTres', value: '2º Chamada aval. 3' }
   // { type: 'irmao', value: 'Irmão/Irmã' }

]