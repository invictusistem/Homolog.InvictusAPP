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
import { Produto } from "src/app/_shared/models/produto.model";



//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'produto-createmodal',
    templateUrl: './produto-create.component.html',
    styleUrls: ['./produto-create.component.scss'],
    animations: [HighlightTrigger]
})

export class ProdutoCreateComponent implements OnInit {

    // pageSize: number = 5;
    // genericTasks: GenericTask[] = new Array<GenericTask>();
    // length: number;
    // pageEvent: PageEvent;
    baseUrl = environment.baseUrl;
    //public cepReturn: CepReturn = new CepReturn();
    public produtoForm: FormGroup;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public unidades: any[];
    // public validadeEmailMsg = false
    // public validadeCPFMsg = false
    //cargos = Cargos;
    //mensagem = "";
    //showMensagem = false
    //public bairro: string = null;
    //@Input() disabled = true;
    //unidades = Unidades;//: string[] = new Array("Campo Grande II", "Jacarepaguá");
    constructor(
        //private service: AdmService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fb: FormBuilder,
        private _http: HttpClient,
        public dialogRef: MatDialogRef<ProdutoCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.produtoForm = _fb.group({
            // templateName: ['', [Validators.required, Validators.minLength(5)]],
            // newCat: [,[Validators.required, Validators.minLength(3)]],
            // newFunc: [, [Validators.required, Validators.minLength(3)]]
            nome: ['', [Validators.required, Validators.minLength(5)]],
            descricao: ['', [Validators.required]],
            preco: ['', [Validators.required]],
            precoCusto: ['', [Validators.required]],
            quantidade: [, [Validators.required, Validators.min(1)]],
            nivelMinimo: [, [Validators.required]],
            unidadeId: ['', [Validators.required]],
            observacoes: [''],

        })
    }

    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        // console.log(this.tokenInfo.Unidade);
        // console.log(this.tokenInfo.Codigo);
        // console.log(this.tokenInfo);
        // this.colaboradorForm.get('email').setErrors({ 'incorrect': true });
        // this.colaboradorForm.get('cpf').setErrors({ 'incorrect': true });
        //this.colaboradorForm.get('unidade').setValue(this.tokenInfo.Codigo)
        // console.log("on init")
        //this.getTasks(1, this.pageSize);
        //this.colaboradorForm.get('logradouro').disable()
        this.GetUnidades()
    }

    GetUnidades(){

        this._http.get(`${this.baseUrl}/unidade`)
        .subscribe(resp => {
            this.unidades = Object.assign([], resp)
        },
        (err)=> { console.log(err)},
        () => { 

        })

    }
    //     ngOnChanges() {
    //         logradouro
    // cidade
    // uf
    // bairro

    //     }

    // save(form: any) {
    //     //const novoColaborador = JSON.stringify(form.value);
    //     console.log(form)

    //     //this.redi(["./adm/colaboradores"]);
    //     this.http.post(`${this.baseUrl}/colaboradores`, form, {
    //         //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {

    //         headers: new HttpHeaders({
    //             "Content-Type": "application/json",
    //             "Authorization": "Bear "
    //         })
    //     }).subscribe(response => {

    //         console.log(response)


    //         this.dialogRef.close();
    //     }, err => { },
    //         () => { });
    // }

    onSubmit(form: FormGroup) {

        var produto = new Produto();
        produto = form.value
        console.log(form.value)
        console.log(form.valid)
        //produto.toFloat(form.value["preco"])
        var preco = parseFloat(form.value["preco"])
        var precoFloat = preco.toFixed(2)
        console.log(precoFloat)
        produto.preco =  parseFloat(preco.toFixed(2))
        console.log(produto)
        //.toFixed(2)

        if (form.valid) {


            this._http.post(`${this.baseUrl}/financeiro/produto`, produto, {

            }).subscribe(response => {

                console.log(response)

            }, (err) => {
                console.log(err)

            },
                () => {

                    this.dialogRef.close({ clicked: "Ok" });
                });
        }
    }

    openSnackBar() {
        this._snackBar.open('Colaborador salvo com sucesso.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'green-snackbar',
            duration: 3 * 1000,
        });
    }

    // buscarEmail(event: any) {
    //     if (this.colaboradorForm.get('email').valid) {
    //         this.validadeEmailMsg = false
    //         this.http.get(`${this.baseUrl}/adm/aluno/email/${event.target.value}`, {
    //             headers: new HttpHeaders({
    //                 "Content-Type": "application/json",
    //                 "Authorization": "Bear "
    //             })
    //         }).subscribe(response => {

    //         }, (err) => {
    //             if (err['status'] == 409) {
    //                 this.validadeEmailMsg = true
    //                 this.colaboradorForm.get('email').setErrors({ 'incorrect': true });
    //             }
    //         },
    //             () => {
    //                 this.colaboradorForm.get('email').setErrors(null);
    //             });

    //         //this.colaboradorForm.get('email').setErrors({ 'incorrect': true });

    //     }
    // }

    // buscarCPF(event: any) {
    //     // console.log(event.target.value)
    //     console.log(this.colaboradorForm.get('cpf').value)
    //     console.log(this.colaboradorForm.get('cpf').valid)
    //     console.log(this.colaboradorForm.get('cpf').value.length)
    //     if (this.colaboradorForm.get('cpf').valid) {
    //         this.validadeCPFMsg = false
    //         let cpf = this.colaboradorForm.get('cpf').value
    //         //this.http.get(`${this.baseUrl}/adm/aluno/cpf/${event.target.value}`, {
    //         this.http.get(`${this.baseUrl}/adm/aluno/cpf/${cpf}`, {
    //             headers: new HttpHeaders({
    //                 "Content-Type": "application/json",
    //                 "Authorization": "Bear "
    //             })
    //         }).subscribe(response => {

    //         }, (err) => {
    //             if (err['status'] == 409) {
    //                 this.validadeCPFMsg = true
    //                 this.colaboradorForm.get('cpf').setErrors({ 'incorrect': true });
    //             }
    //         },
    //             () => {
    //                 this.colaboradorForm.get('cpf').setErrors(null);
    //             });

    //         //this.colaboradorForm.get('email').setErrors({ 'incorrect': true });

    //     }
    // }
    // https://viacep.com.br/ws/01001000/json/
    // consultaCEP(CEP: string) {
    //     console.log(CEP);

    //     this.http.get(`https://viacep.com.br/ws/${CEP}/json/`, {

    //     }
    //     )
    //         .subscribe(response => {

    //             console.log(response)
    //             // this.cepReturn = new CepReturn(
    //             //     response["logradouro"],
    //             //     response["bairro"],
    //             //     response["localidade"],
    //             //     response["uf"]);
    //             //console.log(this.cepReturn)
    //             this.colaboradorForm.get('logradouro').setValue(response["logradouro"]);
    //             this.colaboradorForm.get('bairro').setValue(response["bairro"]);
    //             this.colaboradorForm.get('cidade').setValue(response["localidade"]);
    //             this.colaboradorForm.get('uf').setValue(response["uf"]);
    //             //this.bairro = this.cepReturn.bairro
    //             // const token = (<any>response).accessToken;
    //             // console.log(response)
    //             // localStorage.setItem("jwt", token);
    //             // this.invalidLogin = false;
    //             // this.router.navigate(["/main"]);
    //         }, err => { console.log(err) },
    //             () => { console.log('finaly') });
    // }

    onOkClick() {
        //console.log("I do nothing");
        this.dialogRef.close({ clicked: "Ok" });
    }
    // login(form: NgForm) {
    //     const credentials = JSON.stringify(form.value);
    //     console.log(credentials)
    //     this.http.post("https://localhost:44370/api/identity/login", credentials, {
    //     //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {

    //         headers: new HttpHeaders({
    //             "Content-Type": "application/json"
    //         })
    //     }).subscribe(response => {
    //         const token = (<any>response).accessToken;
    //         console.log(response)
    //         localStorage.setItem("jwt", token);
    //         this.invalidLogin = false;
    //         this.router.navigate(["/main"]);
    //     }, err => {
    //         this.invalidLogin = true;
    //     });
    // }
    // getTasks(actualPage: number, pageSize: number) {
    //     this.service.getTasks(actualPage, pageSize)
    //         .subscribe(
    //             tasks => {
    //                 console.log(tasks)
    //                 this.genericTasks =  Object.assign([],tasks["data"]);
    //                 this.length = tasks["totalItemsInDatabase"];

    //             },
    //             (err) => {
    //                 console.log("err erro")


    //             },
    //             () => { console.log('ok get') },
    //         )

    // }

    // addNewItem(value: string) {
    //     console.log(value)
    //     this.newItemEvent.emit(value);
    // }

    // adicionar(taskAded: GenericTask) {
    //     console.log(taskAded)
    //     let templateTask:TemplateTasks = new TemplateTasks()
    //     templateTask.genericTaskId = taskAded.id
    //     templateTask.name = taskAded.name
    //     templateTask.hour = taskAded.hour
    //     templateTask.minute = taskAded.minute
    //     console.log(templateTask)

    //     this.data.templateTasks.push(templateTask)

    //     console.log(this.data.templateTasks)
    //     console.log('adicionar task')
    // }


    // //mat-dialog-container
    // onNoClick(): void {
    //     this.dialogRef.close();
    // }
    // pageIndexNumber: number = 0;
    // clicar(evento: any) {
    //     console.log(evento)

    //     this.pageIndexNumber = (evento.pageIndex * this.pageSize)
    //     this.getTasks(evento.pageIndex + 1, this.pageSize);
    // }
}