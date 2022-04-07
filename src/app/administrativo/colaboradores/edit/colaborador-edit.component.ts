import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { HighlightTrigger } from "src/app/_shared/animation/animation";
import { environment } from "src/environments/environment";
import { HelpersService } from "src/app/_shared/components/helpers/helpers.component";
import { AdmService } from "../../services/adm.service";

@Component({
    selector: 'editcolaboradoresmodal',
    templateUrl: './colaborador-edit.component.html',
    styleUrls: ['./colaborador-edit.component.scss'],
    animations: [HighlightTrigger]
})

export class EditColaboradoresComponent implements OnInit {

    baseUrl = environment.baseUrl;
    originalColaborador: any;

    public initProgressBar = 'visible'
    public saveBar = 'hidden'
   // unidades = Unidades;
    showMensagem = false
    mensagem = ''
    cpf = ''
    showForm = false

    //public cepReturn: CepReturn = new CepReturn();
    cargos: any[] = new Array<any>();
    ativo = true;
    public colaboradorForm: FormGroup

    constructor(
        private _helper: HelpersService,
        private _admService: AdmService,
        private http: HttpClient,
        private _fb: FormBuilder,
        public dialogRef: MatDialogRef<EditColaboradoresComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.colaboradorForm = _fb.group({
            id: [''],
            nome: ['', [Validators.required, Validators.minLength(5)]],
            email: [''],
            cpf: [''],
            celular: [null, [Validators.required, Validators.minLength(5)]],
            cargoId: ['', [Validators.required]],
            unidadeId: [''],
            ativo: [true, [Validators.required]],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            complemento: [''],
            numero: ['', [Validators.required]],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]],
            dataCriacao: [''],
            supervisorId:['']
        })
    }

    tentando = true
    get teste() {
        return this.tentando
    }
    get desabilitar() {
          
            if (this.colaboradorForm.valid &&
                JSON.stringify(this.originalColaborador) !=
                JSON.stringify(this.colaboradorForm.value)) {
    
                return this.saveBar != 'hidden'
            } else {
                return true
            }
    }

    ngOnInit() {       
        this.getColaborador();
    }

    getColaborador() {

        this.http.get(`${this.baseUrl}/colaboradores/Cargo/${this.data['colaborador'].id}`)
        .subscribe({
            next: (response: any) => { 
                this.cargos = Object.assign([], response['values'])
                this.colaboradorForm.patchValue(response['colaborador']);
                this.originalColaborador = JSON.parse(JSON.stringify(this.colaboradorForm.value))
                this.dialogRef.addPanelClass('myeditcolab-class')
                    this.showForm = true
                    this.initProgressBar = 'hidden'
			},
            error: (error) => { 
                this.initProgressBar = 'hidden'
			}
        })

    }
    

    disabledSpinner = false
    edit(form: any) {
      
        if (this.colaboradorForm.valid) {
            this.saveBar = 'visible'
          
            this.http.put(`${this.baseUrl}/colaboradores`, this.colaboradorForm.value, {})
                .subscribe(response => {

                }, err => {
                    console.log(err)
                    this.saveBar = 'hidden'
                },
                    () => {
                        this._helper.openSnackBarSucesso('Colaborador editado com sucesso.')
                        this.saveBar = 'hidden'
                     
                        this.dialogRef.close();

                    });
        }
    }



    openSnackBar() {

        this._helper.openSnackBarError('ERRO')
       
    }    

    consultaCEP(CEP: string) {

        if (this.colaboradorForm.get('cep')?.valid) {

            CEP = CEP.replace('-', '');
            CEP = CEP.replace('.', '');

            this._admService.CepConsulta(this.colaboradorForm.get('cep')?.value)
                .subscribe(response => {

                    this.colaboradorForm.get('logradouro')?.setValue(response["logradouro"].toUpperCase())
                    this.colaboradorForm.get('bairro')?.setValue(response["bairro"].toUpperCase())
                    this.colaboradorForm.get('cidade')?.setValue(response["localidade"].toUpperCase())
                    this.colaboradorForm.get('uf')?.setValue(response["uf"].toUpperCase())

                }, err => {  },
                    () => {  });
        }
    }
}