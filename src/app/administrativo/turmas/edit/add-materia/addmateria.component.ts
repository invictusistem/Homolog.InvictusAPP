import { getTreeMultipleDefaultNodeDefsError } from "@angular/cdk/tree";
import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HighlightTrigger } from "src/app/_shared/animation/animation";
import { environment } from "src/environments/environment";

@Component({
    selector: 'addmateria-modal',
    templateUrl: './addmateria.component.html',
    styleUrls: ['./addmateria.component.scss'],
    animations: [HighlightTrigger]
})

export class AddPMateriaModalComponent implements OnInit {

    private baseUrl = environment.baseUrl
    materias: any[] = new Array<any>();
    public initProgressBar = 'visible'
    public showContent = false
    public disabledSaveButton = false

    constructor(
        private _http: HttpClient,
        public _dialogRef: MatDialogRef<AddPMateriaModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }
    ngOnInit() {
        this.getMateria()
    }

    getMateria() {

        //this.http.get(`${this.baseUrl}/colaboradores/professores/?unidade=Campo Grande&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`)
        this._http.get(`${this.baseUrl}/pedag/turma/materias/${this.data['turmaId']}/${this.data['professor'].id}`)
            .subscribe(
                (result: any) => {

                    console.log(result['matsView'])
                    this.materias = Object.assign([], result['matsView'])
                  
                    console.log(this.materias)
                  

                },
                (error) => { console.log(error) },
                () => {
                    this.initProgressBar = 'hidden'
                    this.showContent = true
                    this._dialogRef.addPanelClass('turmaaddmateria-class')
                    // this.materias.forEach(element => {
                    //     console.log(element.profId)
                        
                    // });

                    
                }
            )
    }

    get sabeButtom(){

        return this.disabledSaveButton
    }

    Checar(){
        return true
    }
    checked = true
    Atualizar() {
        // console.log(this.listProfId)
        // console.log(this.data['turmaId'])
        // console.log(this.data['professor'])
        // this.materias.forEach(element => {
        //     console.log(element.temProfessor)
        //     if(element.temProfessor){
        //         element.profId = this.data['professor'].id
        //     }else{
        //         element.profId = 0
        //     }
        // });

       // console.log(this.materias)
       this.initProgressBar = 'visible'
       
       this.disabledSaveButton = true
        this._http.put(`${this.baseUrl}/pedag/turma/materias/${this.data['turmaId']}/${this.data['professor'].id}`, this.materias,{

        })
        .subscribe(
            (result) => {

              //  console.log(result)

            },
            (error) => { 
               // console.log(error) 
            },
            () => {
                this._dialogRef.close({ clicked: true, profsIds: this.listProfId });
            }
        )

        
    }

    listProfId: number[] = new Array<number>()

    onCheckboxChange(event: any) {
        //console.log(profId)
        console.log(event.checked)
        console.log(this.materias)
       // console.log(this.data['professor'])
        // if (event.checked) {
        //     this.listProfId.push(profId)
        // } else {
        //     let index = this.listProfId.indexOf(profId)
        //     this.listProfId.splice(index, 1);
        // }

        // console.log(this.listProfId)
    }
}