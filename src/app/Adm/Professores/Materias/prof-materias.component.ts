import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { SpinnerParams } from "src/app/_shared/models/spinner.model";
import { AddDispoComponent } from "./AddDisponibilidade/add-dispo.component";
import { MatChipInputEvent } from "@angular/material/chips";
import { AddMatComponent } from "./AddMateria/add-mat.component";
import { EditDispoComponent } from "./EditDisponibilidade/edit-dispo.component";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";

@Component({
    selector: 'profmateriasmodal',
    templateUrl: './prof-materias.component.html',
    styleUrls: ['./prof-materias.component.scss'],
    animations: [HighlightTrigger]
})

export class ProfMateriasComponent implements OnInit {

    hide = true;


    SpinnerParam: SpinnerParams = {
        diameter: 30,
        marginleft: 10,
        margintop: 0
    }
    baseUrl = environment.baseUrl;
    mostrarModalPrincipal = true
    public unidades: any[] = new Array<any>()
    public typePacotes: any[] = new Array<any>()
    public profMaterias: any[] = new Array<any>()
    public materias: any[] = new Array<any>()
    public disponibilidades: any[] = new Array<any>()

    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public disponibilidadeForm: FormGroup
    public materiaForm: FormGroup
    public unidadeForm: FormGroup

    constructor(
        private _fb: FormBuilder,
        private _helpers: HelpersService,
        private _http: HttpClient,
        private _modal: MatDialog,
        public dialogRef: MatDialogRef<ProfMateriasComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.unidadeForm = _fb.group({
            unidadeId: ['', [Validators.required]],

            //dias

        })
        this.disponibilidadeForm = _fb.group({
            //unidadeId: ['', [Validators.required]],

            //dias

        })
        this.materiaForm = _fb.group({
            materiaId: ['', [Validators.required]],

            //dias

        })
        this.disponibilidadeForm = _fb.group({
            unidadeId: ['', [Validators.required]],

            //dias

        })
    }

    keywords = new Set(['Domingo', 'Segunda-feira', 'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado']);
    formControl = new FormControl(['angular']);

    //   addKeywordFromInput(event: MatChipInputEvent) {
    //     if (event.value) {
    //       this.keywords.add(event.value);
    //       event.chipInput!.clear();
    //     }
    //   }

    //   removeKeyword(keyword: string) {
    //     this.keywords.delete(keyword);
    //   }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        //this.dialogRef.removePanelClass('my-class')
        //this.dialogRef.addPanelClass('my-class')
        console.log(this.data['prof'])
        this.GetInfos()


    }

    GetInfos() {

        this._http.get(`${this.baseUrl}/professor/materias/${this.data['prof'].id}`)
            .subscribe(resp => {
                this.unidades = resp['unidades']
                this.typePacotes = resp['typePacotes']
                this.profMaterias = resp['profMaterias']
                this.disponibilidades = resp['disponibilidades']
                this.length = this.profMaterias.length
            },
                (error) => { 
                    this.showDeleteSpinner = false
                },
                () => {
                    console.log(this.disponibilidades)
                    this.showDeleteSpinner = false
                    this.mostrarModalPrincipal = false

                    this.disabledDelete = false
                    this.dialogRef.addPanelClass('my-class')
                })

    }

    showAddIcon = false
    clearFilter(typeId) {

        if (typeId == '') {
            this.materias = new Array<any>()
            this.showAddIcon = false
            this.materiaForm.get('materiaId').setValue('')
            return;
        }
        this.materias = new Array<any>()
        console.log(typeId)
        this.materiaForm.get('materiaId').setValue('')
        this._http.get(`${this.baseUrl}/materia-template/filtro/${typeId}`)
            .subscribe(resp => {
                this.materias = resp['materias']

            },
                (error) => { },
                () => {


                    // console.log(this.unidades)
                    // this.mostrarModalPrincipal = false
                    // this.dialogRef.addPanelClass('my-class')
                })


    }

    addMateria(mat) {
        if (mat == '') {
            //this.materias = new Array<any>()
            this.showAddIcon = false
            return;
        }
        this.showAddIcon = true


    }

    adicionar() {

        var mat = this.profMaterias.find(element => element.pacoteMateriaId == this.materiaForm.get('materiaId').value)
        console.log(mat)

        if (mat == undefined) {
            this._http.post(`${this.baseUrl}/professor/materia/${this.data['prof'].id}/${this.materiaForm.get('materiaId').value}`, {})
                .subscribe(resp => {

                },
                    (error) => { },
                    () => {
                        this.GetProfessorMaterias();
                    })
        }
    }

    adicionarUnidade() {
        console.log()
    }



    removeMateria(profMateriaId) {
        this.showDeleteSpinner = true
        this._http.delete(`${this.baseUrl}/professor/materia/${profMateriaId}`, {})
            .subscribe(resp => {
                //  this.unidades = resp['unidades']
                // this.typePacotes = resp['typePacotes']
            },
                (error) => { },
                () => {
                    this.GetProfessorMaterias();
                    //console.log(this.unidades)
                    //  this.mostrarModalPrincipal = false
                    // this.dialogRef.addPanelClass('my-class')
                })

    }

    GetProfessorMaterias() {
        this._http.get(`${this.baseUrl}/professor/materias-professor/${this.data['prof'].id}`)
            .subscribe(resp => {
                //  this.unidades = resp['unidades']
                // this.typePacotes = resp['typePacotes']
                this.profMaterias = resp['profMaterias']
                this.length = this.profMaterias.length
            },
                (error) => { 
                    this.showDeleteSpinner = false
                },
                () => {
                    this.showDeleteSpinner = false
                    //  console.log(this.unidades)
                    //  this.mostrarModalPrincipal = false
                    //  this.dialogRef.addPanelClass('my-class')
                })
    }

    openAddDispoModal(): void {
        const dialogRef = this._modal
            .open(AddDispoComponent, {
                minHeight: '400px',
                width: '480px',
                //  panelClass: 'my-class',
                data: { unidades: this.unidades, profId: this.data['prof'].id },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {

                //this.atualizarUnidadesDisponiveis();
                
                this.GetInfos()
                //  this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === "Cancel") {

            }
        });
    }

    showDeleteSpinner=false
    get disableDeleteButton(){

        if(this.showDeleteSpinner) return true


        return false
    }

    opeEditDispoModal(dispo): void {
        const dialogRef = this._modal
            .open(EditDispoComponent, {
                minHeight: '400px',
                width: '480px',
                //  panelClass: 'my-class',
                data: { dispo: dispo, profId: this.data['prof'].id },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === true) {
                this._helpers.openSnackBar("Disponibilidade editada com sucesso")
                //this.atualizarUnidadesDisponiveis();
                this.GetInfos()
                //  this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === false) {

            }
        });
    }

    changePage(event) {
        console.log(event.pageIndex)
        this.pageIndex = event.pageIndex
    }

    get profMateriasSlice(): any[] {
        let pageIndex = ((this.pageIndex + 1) - 1) * this.pageSize
        return this.profMaterias.slice(pageIndex, pageIndex + 5);
    }

    disabledDelete = false
    length = 0
    pageSize = 5
    pageIndex = 0
    openAddMatModal(): void {
        const dialogRef = this._modal
            .open(AddMatComponent, {
                // minHeight: '400px',
                width: '550px',
                //  panelClass: 'my-class',
                data: { profId: this.data['prof'].id, materias: this.profMaterias },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === true) {
                // this.disabledDelete = false
                //this.atualizarUnidadesDisponiveis();
                this.disabledDelete = true
                this.showDeleteSpinner = true
                this.GetInfos()
                //  this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === "Cancel") {

            }
        });
    }

    atualizarUnidadesDisponiveis() {

        this._http.get(`${this.baseUrl}/professor/unidades-disponibilidades/${this.data['prof'].id}`)
            .subscribe(resp => {
                this.unidades = resp['unidades']
            },
                (error) => { },
                () => {

                })
    }

}