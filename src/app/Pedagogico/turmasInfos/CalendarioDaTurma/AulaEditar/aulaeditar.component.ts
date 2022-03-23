import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PedagogicoService } from "src/app/Pedagogico/service/pedagogico.service";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { environment } from "src/environments/environment";

// export const MY_FORMATS = {
//     parse: {
//       dateInput: 'dd/MM/YYYY',
//     },
//     display: {
//       dateInput: 'dd/MM/YYYY',
//       //monthYearLabel: 'MMM YYYY',
//       //dateA11yLabel: 'LL',
//       //monthYearA11yLabel: 'MMMM YYYY',
//     },
//   };

@Component({
    selector: 'aulaeditarmodaldialog',
    templateUrl: './aulaeditar.component.html',
    styleUrls: ['./aulaeditar.component.scss'],
    // providers: [
    //     {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    //   ],
    animations: [HighlightTrigger]
})
export class AulaEditarModal implements OnInit {

    //private _baseUrl = environment.baseUrl
    public initProgressBar = 'visible'
    public disabledProfForm = false
    public saveSpinner = 'hidden'
    public showContent = false
    public aula: any
    public originalAula: any
    public salas: any[] = new Array<any>()
    public materias: any[] = new Array<any>()
    public professores: any[] = new Array<any>()
    public aulaForm: FormGroup
    constructor(
        //private _http: HttpClient,
        private _pedagService: PedagogicoService,
        private _fb: FormBuilder,
        public dialogRef: MatDialogRef<AulaEditarModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.aulaForm = _fb.group({
            id: [''],
            professorId: [''],
            materiaId: [''],
            salaId: [''],
            diaAula:[''],
            horaInicial:['',[Validators.required]],
            horaFinal:['',[Validators.required]]
        })

        this.aulaForm.valueChanges.subscribe(
            (form: any) => {

                if (this.aulaForm.get('professorId').value !=
                    "00000000-0000-0000-0000-000000000000") {

                    this.aulaForm.controls['materiaId'].setValidators([Validators.required])
                } else {
                    this.aulaForm.controls['materiaId'].clearValidators()
                }
            }
        );
    }

    ngOnInit() {
        //this.dialogRef.addPanelClass('auladetalhe-class')
        // this.GetAulaInfos()
        this.GetAulaInfos()
    }

    get VerificarObrigariedade() {
        if (this.aulaForm.get('professorId').value !=
            "00000000-0000-0000-0000-000000000000") {
            return Validators.required
        } else {
            return null
        }
    }

    private GetAulaInfos() {

        this._pedagService.GetAulaEditViewModel(this.data['caled'].id)
            .subscribe(
                sucesso => { this.GetAulaInfosSucesso(sucesso) },
                falha => { this.GetAulaInfosFalha(falha) }
            )
    }

    private GetAulaInfosSucesso(resp) {
        this.aula = resp['aula']
      //  console.log(this.aula)
        this.salas = resp['salas']
        this.materias = resp['materias']
        this.professores = resp['profsDisponiveis']
        this.aulaForm.get("id").setValue(this.aula.id)
        this.aulaForm.get("professorId").setValue(this.aula.professorId)
        this.aulaForm.get("materiaId").setValue(this.aula.materiaId)
        this.aulaForm.get("salaId").setValue(this.aula.salaId)
        this.aulaForm.get("diaAula").setValue(this.aula.diaAula)
        this.aulaForm.get("horaInicial").setValue(this.aula.horaInicial)
        this.aulaForm.get("horaFinal").setValue(this.aula.horaFinal)
        //this.aulaForm.patchValue(resp['aluno']);
        this.originalAula = JSON.parse(JSON.stringify(this.aulaForm.value))
        //this.aulaForm.get('salaId').disable()

        this.dialogRef.addPanelClass('aulaeditar-class')
        this.initProgressBar = 'hidden'
        this.showContent = true
    }

    private GetAulaInfosFalha(error) {

    }

    

    get disabledSaveButton(){

        if (this.aulaForm.valid &&
            JSON.stringify(this.originalAula) !=
            JSON.stringify(this.aulaForm.value)) {

            return this.saveSpinner != 'hidden'
        } else {
            return true
        }
    }

    public ChangeMateria() {
        if (this.aulaForm.get("materiaId").value == "00000000-0000-0000-0000-000000000000") {
            this.aulaForm.get("professorId").setValue("00000000-0000-0000-0000-000000000000")
            this.disabledProfForm = true
            //this.aulaForm.get("professorId").disable()
            return;
        }
        this.disabledProfForm = false
        this.aulaForm.get("professorId").setValue("00000000-0000-0000-0000-000000000000")

        this._pedagService.GetProfsHabilitados(
            this.aulaForm.get("id").value,
            this.aulaForm.get("materiaId").value)
            .subscribe(
                sucesso => { this.ChangeMateriaSucesso(sucesso) },
                error => { this.ChangeMateriaError(error) }
            )

        /*
         if - materia == 00000000-0000-0000-0000-000000000000
         se sim = tira o professor e deixa a aula sem professor
         se nao = tira o profe temporariamente, vai no back
                 e pega os prof q podem lecionar aquela matéria
         e se voltar a lita de prof vazia (nao tem prof habilitado para aquela mat?)
         deixa sem professor ?
         */

        /*
        if - professor == 00000000-0000-0000-0000-000000000000
        se sim, deixa do jeito q está podendo salvar sem prof
        se nao - trazer as materias q aquele prof pode dar e nao deixar salvar
        sem matéria
        */

    }

    private ChangeMateriaSucesso(resp) {
       // console.log(resp)
        this.professores = resp['profsDisponiveis']
       // console.log(this.professores)
    }

    private ChangeMateriaError(error) {

        if (error['error'].status == 404) {
            this.professores = new Array<any>()

        }



    }

    public ChangeProfessor(professor) {

    }

    public SaveEdit(form) {

        this.saveSpinner = 'visible'
       // console.log(this.aulaForm.value)
        this._pedagService.EditAula(this.aulaForm.value, this.data['caled'].id)
            .subscribe(
                sucesso => { this.SaveEditSucesso(sucesso) },
                falha => { this.SaveEditFalha(falha) }
            )
    }

    private SaveEditSucesso(resp) {
        this.saveSpinner = 'hidden'
        this.dialogRef.close({ result: true, aula: resp['aula'] })
    }

    private SaveEditFalha(error) {
        this.saveSpinner = 'hidden'
       // this.dialogRef.close({ result: false })
    }
}

