// import { Component, Inject, OnInit } from "@angular/core";
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { CepReturn } from "src/app/_shared/models/cepreturn.model";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { Router } from "@angular/router";
// import { environment } from "src/environments/environment";
// import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
// import { JwtHelperService } from "@auth0/angular-jwt";
// import { TokenInfos } from "src/app/_shared/models/token.model";
// import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
// import { MatSnackBar } from "@angular/material/snack-bar";




// //import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

// @Component({
//     selector: 'criarleadmodal',
//     templateUrl: './criar-lead.component.html',
//     styleUrls: ['./criar-lead.component.scss'],
//     animations: [HighlightTrigger]
// })

// export class LeadIndividualCriarComponent implements OnInit {

//     // pageSize: number = 5;
//     // genericTasks: GenericTask[] = new Array<GenericTask>();
//     // length: number;
//     // pageEvent: PageEvent;
//     baseUrl = environment.baseUrl;
//     public cepReturn: CepReturn = new CepReturn();
//     public colaboradorForm: FormGroup;
//     private jwtHelper = new JwtHelperService();
//     public tokenInfo: TokenInfos = new TokenInfos();
//     public validadeEmailMsg = false
//     public validadeCPFMsg = false
//     public disabledSpinner = false
//     //cargos = Cargos;
//     mensagem = "";
//     showMensagem = false
//     //public bairro: string = null;
//     //@Input() disabled = true;
//     unidades = Unidades;//: string[] = new Array("Campo Grande II", "Jacarepaguá");
//     constructor(
//         //private service: AdmService,
//         private _snackBar: MatSnackBar,
//         private router: Router,
//         private _fb: FormBuilder,
//         private http: HttpClient,
//         public dialogRef: MatDialogRef<LeadIndividualCriarComponent>,
//         @Inject(MAT_DIALOG_DATA) public data: any) {
//         this.colaboradorForm = _fb.group({

//             nome: ['', [Validators.required, Validators.minLength(5)]],
//             email: ['', [Validators.required, Validators.email]],           
//             telefone: [null, [Validators.required]],
//             bairro: ['', [Validators.required, Validators.minLength(1)]],
//             cursoPretendido: ['', [Validators.required, Validators.minLength(1)]],
//             unidade:  ['', [Validators.required, Validators.minLength(1)]]//,
//         })
//     }

//     ngOnInit() {
//         const token = localStorage.getItem('jwt')
//         this.tokenInfo = this.jwtHelper.decodeToken(token)

//     }

//     showForm = false

//     onSubmit(form: FormGroup) {

//         if (form.valid) {


//             this.http.post(`${this.baseUrl}/colaboradores`, form.value, {

//             }).subscribe(response => {

//             }, (err) => {
//                 console.log(err)
//                 console.log(err['error'].mensagem)
//                 this.mensagem = err['error'].mensagem
//                 this.showMensagem = true
//             },
//                 () => {

//                     this.openSnackBar()

//                     this.dialogRef.close({ clicked: "Ok" });
//                 });
//         }
//     }

//     buscarEmail(event){

//     }

//     openSnackBar() {
//         this._snackBar.open('Lead cadastrada com sucesso.', '', {
//             horizontalPosition: 'center',
//             verticalPosition: 'top',
//             panelClass: 'green-snackbar',
//             duration: 3 * 1000,
//         });
//     }



// }