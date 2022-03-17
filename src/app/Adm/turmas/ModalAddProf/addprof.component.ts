import { getTreeMultipleDefaultNodeDefsError } from "@angular/cdk/tree";
import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";
import { environment } from "src/environments/environment";
import { AdmService } from "../../services/adm.services";
import { ProfResponse } from "../CreateModal/createcurso.component";
import { SaveProfsCommand } from "../EditModal/editcurso.component";

@Component({
    selector: 'addprof-modal',
    templateUrl: './addprof.component.html',
    styleUrls: ['./addprof.component.scss'],
    animations: [HighlightTrigger]
})

export class AddProfessorModalComponent implements OnInit {

    private baseUrl = environment.baseUrl
    public profRespOriginal: any[] = new Array<any>();
    public profResp: any[] = new Array<any>();
    public initProgressBar = 'visible'
    public showContent = false
    listProfId: any[] = new Array<any>()

    constructor(
        private _admService: AdmService,
        private _helper:HelpersService,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<AddProfessorModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }
    ngOnInit() {
       // console.log(this.data['turmaId'])
        this.getProfessores()
    }

    getProfessores() {

        this._http.get(`${this.baseUrl}/pedag/turma/professores/${this.data["turmaId"]}`)
            .subscribe(result => {

                this.profResp = result['profs']// Object.assign([], result)
                this.profRespOriginal = Object.assign([], result['profs']) //.patchValue(response['colaborador']);
                this.profResp = JSON.parse(JSON.stringify(this.profRespOriginal))

            },
                (error) => {
                   // console.log(error)
                    if(error['status'] == 404){
                        this._helper.openSnackBarError("Não professores com disponibilidades para essa turma.")
                        this.dialogRef.close({clicked: false});
                    }else{
                        this._helper.openSnackBarErrorDefault();
                        this.dialogRef.close({clicked: false});
                    }
                },
                () => {
                    //console.log(this.profResp)
                    this.dialogRef.addPanelClass('turmaaddprof-class')
                    this.initProgressBar = 'hidden'
                    this.showContent = true
                }
            )
    }

    salvarProfs() {
        //  console.log(this.listProfId)
        this.addProfIcon = true
        this.initProgressBar = 'visible'
        var saveProfs: SaveProfsCommand = new SaveProfsCommand();
        saveProfs.turmaId = this.data['turmaId']
        saveProfs.listProfsIds = this.listProfId
        //console.log(saveProfs)
        this._admService.AddProfNaTurma(saveProfs)
            .subscribe(
                sucess => { this.salvarProfsSucesso(sucess) },
                falha => { this.salvarProfsError(falha) }
            )
    }

    private salvarProfsSucesso(resp) {
        this.dialogRef.close({ clicked: true });
        this.addProfIcon = false
        this.initProgressBar = 'hidden'
    }

    private salvarProfsError(erro) {
        this.addProfIcon = false
        this.initProgressBar = 'hidden'
    }

    //console.log(this.data['turma'].id)
    //console.log(profIds)
    //         var saveProfs: SaveProfsCommand = new SaveProfsCommand();
    // saveProfs.turmaId = this.data['turma'].id
    // saveProfs.listProfsIds = profIds
    // console.log(saveProfs)
    // this._http.post(`${this.BaseUrl}/pedag/turma/professores`, saveProfs, {

    // })
    //     .subscribe(
    //         (response) => {
    //             console.log(response)

    //             //

    //         },
    //         (error) => { console.log(error) },
    //         () => {

    //             this.GetInformacoesDaTurma(this.data['turma'].id);
    //             //console.log(this.alunos)

    //         }
    //     )

    get DisabledSave() {

        return JSON.stringify(this.profRespOriginal) != JSON.stringify(this.profResp)
    }

    public AddProf(profId) {
        this.addProfIcon = true
        this.listProfId.push(profId)

        this.salvarProfs()

    }

    addProfIcon = false
    get disabledAddProf() {

        return this.addProfIcon;
    }


    // onCheckboxChange(event: any, profId) {
    //     console.log(profId)
    //     console.log(event.checked)

    //     if (event.checked) {
    //         this.listProfId.push(profId)
    //     } else {
    //         let index = this.listProfId.indexOf(profId)
    //         this.listProfId.splice(index, 1);
    //     }

    //     console.log(this.listProfId)
    // }
}