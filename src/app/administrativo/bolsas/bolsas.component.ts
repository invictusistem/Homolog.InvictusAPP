import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { HighlightTrigger } from "src/app/_shared/animation/animation";
import { CreateBolsaModalConfig, EditBolsaModalConfig, ShowSenhaModalConfig } from "../services/adm-modal";
import { AdmService } from "../services/adm.service";
import { CreateBolsaComponent } from "./create/create-bolsa.component";
import { EditBolsaComponent } from "./edit/edit-bolsa.component";
import { ShowSenhaComponent } from "./show/show-senha.component";

@Component({
    selector: "bolsas-app",
    templateUrl: './bolsas.component.html',
    styleUrls: ['./bolsas.component.scss'],
    animations: [HighlightTrigger]
})

export class BolsasComponent {

    public initProgressBar = 'hidden'
    public typesPacotes: any[] = new Array<any>();
    public bolsas: any[] = new Array<any>()
    public showMessageNoBolsas = false

    public pesquisarForm: FormGroup

    constructor(
        private _admService: AdmService,
        private _fb: FormBuilder,
        private _modal: MatDialog
    ) {
        this.pesquisarForm = _fb.group({
            typePacoteId: ['', [Validators.required]]
        })
    }

    returnOnSelect(){
        return false
    }

    ngOnInit() {
        this.GetTypePacotes();
    }

    GetTypePacotes() {
        this.initProgressBar = 'visible'
        this._admService.getTypePacotes()
            .subscribe(
                sucesso => { this.GetTypePacotesSucesso(sucesso) },
                falha => { this.GetTypePacotesErro(falha) }
            )

    }

    GetTypePacotesSucesso(resposta:any) {
        this.typesPacotes = Object.assign([], resposta['typePacotes']);
        this.initProgressBar = 'hidden'
    }

    GetTypePacotesErro(error:any) {
        this.initProgressBar = 'hidden'
    }

    Pesquisar() {
        this.showMessageNoBolsas = false
        if (this.pesquisarForm.valid) {
            this.initProgressBar = 'visible'
            this._admService.GetBolsas(this.pesquisarForm.get('typePacoteId')?.value)
                .subscribe(
                    resposta => { this.PesquisarSucesso(resposta) },
                    falha => { this.PesquisarFalha(falha) }
                )
        }
    }

    PesquisarSucesso(resp:any) {
        this.bolsas = Object.assign([], resp['bolsas'])
        this.initProgressBar = 'hidden'
    }

    PesquisarFalha(Error:any) {
        this.initProgressBar = 'hidden'
        this.showMessageNoBolsas = true
    }

    openCreateBolsaModal(): void {
        const dialogRef = this._modal
            .open(CreateBolsaComponent, CreateBolsaModalConfig());
        dialogRef.afterClosed().subscribe((data) => {

        });
    }

    get disabledCodigo() {
        return false
    }

    EditarBolsa(bolsaId:any){
        const dialogRef = this._modal
        .open(EditBolsaComponent, EditBolsaModalConfig(bolsaId));
    dialogRef.afterClosed().subscribe((data) => {

    });
    }

    public VerCodigoBolsa(bolsaId:any) {
        this._admService.GetBolsaSenha(bolsaId)
            .subscribe(
                resposta => { this.showSenha(resposta) },
                falha => { }
            )
    }

    showSenha(resp:any): void {

        // openCreateBolsaModal(): void {
        const dialogRef = this._modal
            .open(ShowSenhaComponent, ShowSenhaModalConfig(resp['senha']));
        dialogRef.afterClosed().subscribe((data) => {

        });
    }

}