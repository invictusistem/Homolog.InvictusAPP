import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { AdmService } from "../services/adm.services";
import { ModuloCreateComponentModal, ModuloEditComponentModal } from "../services/modal.config";
import { ModuloCreateComponent } from "./CreateModulo/modulo-create.component";
import { DetailPacoteComponent } from "./DetalhePacote/pacote-detalhe.component";

@Component({
    selector: "modulo-app",
    templateUrl: './modulo.component.html',
    styleUrls: ['./modulo.component.scss'],
    animations: [HighlightTrigger]
})

export class ModuloComponent implements OnInit {

    public pacotes: any[] = new Array<any>()
    public typesPacotes: any = new Array<any>();
    public unidadesAutorizadas: any[] = new Array<any>();

    public tokenInfo: TokenInfos = new TokenInfos();
    private jwtHelper = new JwtHelperService();
    public pesquisarForm: FormGroup

    public showTeste = false

    constructor(
        private _fb: FormBuilder,
        private _admService: AdmService,
        private _modal: MatDialog) {
        this.pesquisarForm = _fb.group({
            typePacoteId: ['', [Validators.required]],
            unidadeId: ['', [Validators.required]]
        });
    }
    
    ngOnInit() {
        
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.unidadesAutorizadas = JSON.parse(this.tokenInfo.UnidadesAutorizadas)
        this.getTypePacotes();
    }

    Pesquisar() {

        if (this.pesquisarForm.valid) {

            this._admService.pesquisarPacote(
                this.pesquisarForm.get('typePacoteId').value,
                this.pesquisarForm.get('unidadeId').value)
                    .subscribe(
                        sucesso => { this.pesquisarSucesso(sucesso) },
                        falha => { this.pesquisarError(falha)})
         }
    }

    pesquisarSucesso(resposta){
        this.pacotes = Object.assign([], resposta['pacotes']);
        
    }

    pesquisarError(error){
        console.log(error)
    }

    getTypePacotes() {

        this._admService.getTypePacotes()
            .subscribe(
                sucesso => { this.getTypePacotesSucesso(sucesso) },
                falha => { this.getTypePacotesError(falha) })
    }

    getTypePacotesSucesso(resposta){
        this.typesPacotes = Object.assign([], resposta['typePacotes']);
        this.showTeste = true
    }

    getTypePacotesError(error){
        console.log(error)
    }    

    createModulo(): void {
        const dialogRef = this._modal
            .open(ModuloCreateComponent, ModuloCreateComponentModal());
        dialogRef.afterClosed().subscribe(
            data => { });
    }    

    openEditModal(modulo: any): void {
        const dialogRef = this._modal
            .open(DetailPacoteComponent, ModuloEditComponentModal(modulo.id));
        dialogRef.afterClosed().subscribe(
            data => { });
    }
}