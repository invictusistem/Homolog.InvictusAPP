import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavigationExtras, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SpinnerParams } from "src/app/_shared/models/spinner.model";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";
import { AuthService } from "src/app/_Auth/auth.service";

@Component({
    selector: 'selectunidade-modal',
    templateUrl: './selectunidade.component.html',
    styleUrls: ['./selectunidade.component.scss'],
    animations: [HighlightTrigger]
})

export class SelectUnidadeComponent implements OnInit {

    mostrarModalPrincipal = true
    public unidades: any[] = new Array<any>()
    public disableDropDown = false
    public initProgressBar = 'hidden'
    //baseUrl = environment.baseUrl;
   // public cepReturn: CepReturn = new CepReturn();
    public colaboradorForm: FormGroup;
   // private jwtHelper = new JwtHelperService();
   // public tokenInfo: TokenInfos = new TokenInfos();
    //public validadeEmailMsg = false
   // public validadeCPFMsg = false
    //public disabledSpinner = false
   // showForm = false
   // cargos: any[] = new Array<any>()
   // mensagem = "";
   // showMensagem = false
   // msgErros: any

    constructor(
        //private _snackBar: MatSnackBar,
       // private _helper: HelpersService,
       public router: Router,
        private _fb: FormBuilder,
        private authService: AuthService,
        //private http: HttpClient,
        public dialogRef: MatDialogRef<SelectUnidadeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        // this.colaboradorForm = _fb.group({
        
        // })
    }

   

    ngOnInit() {
       
        this.unidades = this.data['unidades']
    }

    unidadeSelected(id){
        
        this.disableDropDown = true
        this.initProgressBar = 'visible'


        this.login(id)

      //  this.dialogRef.close({ clicked: true, unidadeId: id });
    }

    login(unidadeId) {
       // console.log(this.authForm.value)
        //console.log(unidadeId)
        
    
        //if (this.authForm.valid) {
          this.authService.login(this.data['form'], unidadeId)
            .subscribe(
              sucesso => { this.loginSucesso(sucesso) },
              falha => { this.loginError(falha) });
        //}
      }

      loginSucesso(resposta){
        const navigationExtras: NavigationExtras = { state: { data: 'From Login' } };
        this.router.navigate(['/adm'], navigationExtras);
        this.dialogRef.close();
      }

      loginError(erro){

      }

    


}