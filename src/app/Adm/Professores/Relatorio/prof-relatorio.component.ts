import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";
import { AdmService } from "../../services/adm.services";

@Component({
    selector: 'prof-relatoriomodal',
    templateUrl: './prof-relatorio.component.html',
    styleUrls: ['./prof-relatorio.component.scss'],
    animations: [HighlightTrigger]
})

export class ProfRelatorioComponent implements OnInit {

    public initProgressBar = 'hidden'
    public showContent = false
    public rangeForm: FormGroup 
    public relatorio: any

    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();

    constructor(
        private _helper: HelpersService,
        private _admService: AdmService,
        private _fb: FormBuilder,
        private http: HttpClient,
        private _dialogRef: MatDialogRef<ProfRelatorioComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

            this.rangeForm = _fb.group({
                rangeIni: ['',[Validators.required]],
                rangeFinal: ['',[Validators.required]]
            })
    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        console.log(this.data)
    }

    public Pesquisar(){

        if(this.rangeForm.valid){
            this.initProgressBar = 'visible'
            //console.log(this.rangeForm.value)
            this._admService.GetRelatorioProfessor(this.rangeForm.get('rangeIni').value,
                                                   this.rangeForm.get('rangeFinal').value,
                                                   this.data['prof'].id)
                .subscribe(
                    sucesso => { this.PesquisarSucesso(sucesso) },
                    falha => { this.PesquisarError(falha) }
                )
        }
    }

    private PesquisarSucesso(resp){
        this.initProgressBar = 'hidden'
        this.relatorio = resp['result']
        this._dialogRef.addPanelClass('profrelatorio-class')
        this.showContent = true
    }

    private PesquisarError(error){
        this.initProgressBar = 'hidden'
    }



}