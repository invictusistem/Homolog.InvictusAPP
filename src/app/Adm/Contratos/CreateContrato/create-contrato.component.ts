import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { MatSnackBar } from "@angular/material/snack-bar";



//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'createcontratomodal',
    templateUrl: './create-contrato.component.html',
   // styleUrls: ['./create-contrato.component.scss'],
    animations: [HighlightTrigger]
})

export class CreateContratoComponent implements OnInit {
    public htmlContent: any;
    public typePacotes: any
    // pageSize: number = 5;
    // genericTasks: GenericTask[] = new Array<GenericTask>();
    // length: number;
    // pageEvent: PageEvent;
    baseUrl = environment.baseUrl;
    public cepReturn: CepReturn = new CepReturn();
    public contratoForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public validadeEmailMsg = false
    public validadeCPFMsg = false
    cargos = Cargos;
    mensagem = "";
    showMensagem = false
    //public bairro: string = null;
    //@Input() disabled = true;
    unidades = Unidades;//: string[] = new Array("Campo Grande II", "Jacarepaguá");
    constructor(
        //private service: AdmService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<CreateContratoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.contratoForm = _fb.group({
            titulo: ['', [Validators.required]],
            pacoteId: ['', [Validators.required]],
            ativo: [true],
            conteudo: ['', [Validators.required]],
           
        })

    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.GetTypes()
       
    }

    private GetTypes() {

        this._http.get(`${this.baseUrl}/unidade/typepacote`)
            .subscribe(resp => {
                this.typePacotes = resp['types']
            },
                (error) => { console.log(error) },
                () => { })
    }
   
    // salvar(){
    //    // console.log(form.value)
    //     console.log(JSON.stringify(this.htmlContent))

    //     let content = { content: JSON.stringify(this.htmlContent) }
    //     console.log(content)

    //     this._http.post(`${this.baseUrl}/mensagem`,content, {
    //         headers: new HttpHeaders({
    //                         "Content-Type": "application/json"
    //                     })

    //     })
    //     .subscribe(resp => { 

    //     }, (error) => { console.log(error)},
    //     () => {})
    // }

    onSubmit(form: FormGroup) {
       
       
        console.log(form.value)
        console.log(this.htmlContent)

        if(this.contratoForm.valid){

            this._http.post(`${this.baseUrl}/unidade/contrato`,form.value, {})
            .subscribe(resp => { 
    
            }, (error) => { console.log(error)},
            () => {
                this.dialogRef.close({ clicked: "Ok" });
            })

        }
       
    }


}