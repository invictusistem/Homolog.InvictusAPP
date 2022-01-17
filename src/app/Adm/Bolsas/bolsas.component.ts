import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { AdmService } from "../services/adm.services";
import { CreateBolsaModalConfig, ShowSenhaModalConfig } from "../services/modal.config";
import { CreateBolsaComponent } from "./CreateBolsa/createbolsa.component";
import { ShowSenhaComponent } from "./ShowSenha/showsenha.component";

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

    GetTypePacotesSucesso(resposta) {
        this.typesPacotes = Object.assign([], resposta['typePacotes']);
        this.initProgressBar = 'hidden'
    }

    GetTypePacotesErro(error) {
        this.initProgressBar = 'hidden'
    }

    Pesquisar() {
        this.showMessageNoBolsas = false
        if (this.pesquisarForm.valid) {
            this.initProgressBar = 'visible'
            this._admService.GetBolsas(this.pesquisarForm.get('typePacoteId').value)
                .subscribe(
                    resposta => { this.PesquisarSucesso(resposta) },
                    falha => { this.PesquisarFalha(falha) }
                )
        }
    }

    PesquisarSucesso(resp) {
        this.bolsas = Object.assign([], resp['bolsas'])
        this.initProgressBar = 'hidden'
    }

    PesquisarFalha(Error) {
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

    verCodigoBolsa(bolsaId) {
        //this.showMessageNoBolsas = false
        //if(this.pesquisarForm.valid){
        //this.initProgressBar = 'visible'
        this._admService.GetBolsaSenha(bolsaId)
            .subscribe(
                resposta => { this.showSenha(resposta) },
                falha => { }
            )
    }

    showSenha(resp): void {

        // openCreateBolsaModal(): void {
        const dialogRef = this._modal
            .open(ShowSenhaComponent, ShowSenhaModalConfig(resp['senha']));
        dialogRef.afterClosed().subscribe((data) => {

        });
    }

}



