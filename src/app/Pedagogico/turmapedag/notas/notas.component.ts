import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { AgendaProvas } from "src/app/_shared/models/agenda.modal";
import { Materia } from "src/app/_shared/models/materia.model";
import { AlunosNotas, Materias, NotasViewModel } from "src/app/_shared/models/Turma.model";
import { environment } from "src/environments/environment";
import { NotasDisciplinas } from "../../Pedag-Models/notasdisciplinas.model";


@Component({
    selector: 'notas-app',
    templateUrl: './notas.component.html',
    styleUrls: ['./notas.component.scss'],
    animations: [HighlightTrigger]

})

export class NotasComponent implements OnInit {

    teste: any;
    materias: any[] = new Array<any>();
    agendaProvas: AgendaProvas = new AgendaProvas();
    notasDisciplinas: NotasDisciplinas[] = new Array<NotasDisciplinas>()

    private BaseUrl = environment.baseUrl
    showTable = false
    materiaFilter: NotasViewModel = new NotasViewModel();
   

    public searchForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _http: HttpClient,
        @Inject(MAT_DIALOG_DATA) public data: any) { 
            this.searchForm = _fb.group({
                materiaId: ['', [Validators.required]]
            })
        }
    

    ngOnInit() {
        console.log('notas component')
        console.log(this.data)
        
        this.getMaterias(this.data['turma'].id);
       
    }
   

    atualMateria: any;
    buscarNotas(materia) {
       console.log(materia)
       //materia.preventDefault();
       // if(this.searchForm.valid && materia == 'buscar'){

        this.atualMateria = materia
        
        this._http.get(`${this.BaseUrl}/pedag/turma/notas/${this.data['turma'].id}/${materia.id}`)
            .subscribe(resp => {
                console.log(resp)
                this.notasDisciplinas = Object.assign([], resp['notas']);
            },
                (error) => { console.log(error) },
                () => {
                    this.showTable = true
                   
                    
                    var discJson = JSON.stringify(this.notasDisciplinas)
                   
                })

           // }

    }
    clickado(){
        console.log('click')
    }

    salvar(){


         console.log(this.notasDisciplinas)
        this._http.put(`${this.BaseUrl}/pedag/turma/notas`, this.notasDisciplinas,{})
            .subscribe(response => {
                    
                },
                (error) => { console.log(error) },
                () => {
                  this.buscarNotas(this.atualMateria)
                }

            )

    }

    atualModuloId=0
    getMaterias(turmaId) {
       
        this.atualModuloId = turmaId
         this._http.get(`${this.BaseUrl}/turma/materias-notas/${turmaId}`)
            .subscribe(
                response => {
                    this.materias = Object.assign([], response['materias'])
                },
                (error) => { console.log(error) },
                () => {
                    console.log(this.materias)
                }

            )
    }


  

}


