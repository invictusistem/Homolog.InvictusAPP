import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { HighlightTrigger } from "src/app/_shared/animation/animation";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { CreateColaboradorModalConfig, EditColaboradorModalConfig } from "../services/adm-modal";
import { AdmService } from "../services/adm.service";
import { CreateColaboradoresComponent } from "./create/colaborador-create.component";
import { EditColaboradoresComponent } from "./edit/colaborador-edit.component";

@Component({
    selector: "colaboradores-app",
    templateUrl: './colaboradores.component.html',
    styleUrls: ['./colaboradores.component.scss'],
    animations: [HighlightTrigger]
})

export class ColaboradoresComponent implements OnInit {

    // paginated
    length: number = 0
    pageSize: number = 5;
    pageEvent: PageEvent = new PageEvent()
    pageIndexNumber: number = 0;
    currentPageTeste = 1

    // baseUrl
    //baseUrl = environment.baseUrl;

    colaboradores: any[] = new Array<any>();

    spinnerSearch = 'hidden'
    showMessageNoColaborador = false
    mensagem: string = "";
    public tokenInfo: TokenInfos = new TokenInfos();
    public pesquisarForm: FormGroup

    @ViewChild(MatPaginator) paginator: MatPaginator | undefined

    constructor(
        private _admService: AdmService,
       // private _http: HttpClient,
        private _fb: FormBuilder,
        private _modal: MatDialog
    ) {
        this.pesquisarForm = _fb.group({
            nome: ['', [Validators.required]],
            email: ['', [Validators.required]],
            cpf: ['', [Validators.required]],
            ativo: [false],
            todasUnidades:[false]
        });

        this.pesquisarForm.valueChanges.subscribe(
            (form: any) => {

                if (this.pesquisarForm.get('nome')?.value == '' &&
                    this.pesquisarForm.get('email')?.value == '' &&
                    this.pesquisarForm.get('cpf')?.value == '') {

                    this.pesquisarForm.controls['nome'].setErrors({ required: true });
                    this.pesquisarForm.controls['email'].setErrors({ required: true });
                    this.pesquisarForm.controls['cpf'].setErrors({ required: true });
                } else {
                    this.pesquisarForm.controls['nome'].setErrors(null);

                    this.pesquisarForm.controls['email'].setErrors(null)

                    this.pesquisarForm.controls['cpf'].setErrors(null);
                }
            }
        );
    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        
    }

    //OnSelect

    onSubmit(event?: any) {

        this.showMessageNoColaborador = false

        if (this.pesquisarForm.valid) {
            this.spinnerSearch = 'visible'

            if (event != undefined) {
                this.currentPageTeste = event.pageIndex + 1
            } else {
                this.currentPageTeste = 1
            }

            this._admService.getColaboradores(this.pageSize, this.currentPageTeste, this.pesquisarForm.value)
                .subscribe(
                    sucesso => { this.processarSucesso(sucesso, event) },
                    falha => { this.processarFalha(falha) }
                );
        }

        return event

    }

    processarSucesso(response: any, event?: any) {

        this.colaboradores = Object.assign([], response['data']);

        this.length = response['totalItemsInDatabase']

        this.spinnerSearch = 'hidden'
        if (event != undefined) {
            this.pageIndexNumber = (event.pageIndex * this.pageSize)
        } else {
            this.pageIndexNumber = 0
            console.log(this.paginator)
            if (this.paginator != undefined) {
                this.paginator.firstPage();
            }
        }

       

    }

    processarFalha(fail: any) {

        if (fail['status'] == 404) {
            this.mensagem = "Sua pesquisa não encontrou nenhum registro correspondente"
            this.showMessageNoColaborador = true
            this.colaboradores = new Array<any>();
        }
        if (fail['status'] != 404) {
            this.mensagem = "Ocorreu um erro desconhecido, por favor, procure o administrador do sistema"
            this.showMessageNoColaborador = true
            this.colaboradores = new Array<any>();
        }

        this.spinnerSearch = 'hidden'
    }

    get disabledOpenEditButton() {

        return this.spinnerSearch != 'hidden'
    }

    openCreateUserModal(): void {
        const dialogRef = this._modal
            .open(CreateColaboradoresComponent, CreateColaboradorModalConfig());
        dialogRef.afterClosed().subscribe((data) => {

        });
    }

    openEditUserModal(item: any): void {
        const dialogRef = this._modal
            .open(EditColaboradoresComponent, EditColaboradorModalConfig(item));
        dialogRef.afterClosed().subscribe(data => {
        });
    }

}


export class Parametros {
    constructor(
        public nome?: string,
        public email?: string,
        public cpf?: string) { }
}