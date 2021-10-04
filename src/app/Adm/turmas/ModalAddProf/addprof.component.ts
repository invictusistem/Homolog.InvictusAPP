import { getTreeMultipleDefaultNodeDefsError } from "@angular/cdk/tree";
import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { environment } from "src/environments/environment";
import { ProfResponse } from "../CreateModal/createcurso.component";

@Component({
    selector: 'addprof-modal',
    templateUrl: './addprof.component.html'
    //styleUrls: ['./editcurso.component.scss']
})

export class AddProfessorModalComponent implements OnInit {

    private baseUrl = environment.baseUrl
    profResp: ProfResponse[] = new Array<ProfResponse>();

    constructor(
        private _http: HttpClient,
        public dialogRef: MatDialogRef<AddProfessorModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }
    ngOnInit() {
        this.getProfessores()
        console.log(this.data)
    }

    getProfessores() {

        //this.http.get(`${this.baseUrl}/colaboradores/professores/?unidade=Campo Grande&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`)
        this._http.get(`${this.baseUrl}/colaboradores/professores/${this.data["turmaId"]}`)
            .subscribe(
                (result) => {

                    console.log(result)

                    this.profResp = Object.assign([], result)

                    this.profResp.forEach(element => {
                        element.checked = false
                    });

                    //this.showProflist = true
                    //this.profResp = result['data']
                    //this.professores = result['data']
                    console.log(this.profResp)
                    //  this.profResp.length > 0 ? this.showProflist = true :
                    //  this.showProflist = false

                },
                (error) => { console.log(error) },
                () => {

                    //this.showProflist = true
                }
            )
    }

    salvarProfs() {
        console.log(this.listProfId)

        this.dialogRef.close({ clicked: "OK", profsIds: this.listProfId });
    }

    listProfId: number[] = new Array<number>()
    onCheckboxChange(event: any, profId) {
        console.log(profId)
        console.log(event.checked)

        if (event.checked) {
            this.listProfId.push(profId)
        } else {
            let index = this.listProfId.indexOf(profId)
            this.listProfId.splice(index, 1);
        }

        console.log(this.listProfId)
    }
}