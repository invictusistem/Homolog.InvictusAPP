import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/_shared/services/basecomponent.component';

@Component({
  selector: 'app-transf-interna',
  templateUrl: './transf-interna.component.html',
  styleUrls: ['./transf-interna.component.scss']
})
export class TransfInternaComponent extends BaseComponent implements OnInit {

  public aluno: any
  public podeTransf = false
  public turmas: any[] = new Array<any>();
  public unidades: any[] = new Array<any>();
  public showDivPesquisa = true
  public showDivForm = false
  public pesquisaForm: FormGroup
  public transfForm: FormGroup
  searchCpfProgressBar = 'hidden'
  msgDebito = false
  efetivarTransf = 'hidden'
  showTurmasAndamento = false

  showMensagem = false
  mensagem = ""

  constructor(
    override _snackBar: MatSnackBar,
    private _http: HttpClient,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<TransfInternaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    super(_snackBar);
    this.pesquisaForm = _fb.group({
      matricula: ['', [Validators.required]]
    })

    this.transfForm = _fb.group({
      turmaOrigemId: [''],
      matriculaId: [''],
      unidadeId: [''],
      turmaDestinoId: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  showTurmaDropDown = false

  consulta() {

    if (this.pesquisaForm.valid) {
      this.searchCpfProgressBar = 'visible'
      this.showMensagem = false

      //let cpf = this.pesquisaForm.get('cpf')?.value

      this._http.get(`${this.baseUrl}/pedag/matricula/transf-unidade/${this.pesquisaForm.get('matricula')?.value}`)

        .subscribe((response: any) => {
          this.aluno = response['aluno']
          this.podeTransf = response['podeTransf']
          this.unidades = response['unidades']
          if(this.podeTransf){
            this.msgDebito = false
            this.efetivarTransf = 'visible'
          }else{
            this.msgDebito = true
            this.efetivarTransf = 'hidden'
          }
          

        }, (err) => {
          this.searchCpfProgressBar = 'hidden'
          if (err['status'] == 404) {
            this.searchCpfProgressBar = 'hidden'
            this.mensagem = "Matr??culla n??o localizada"
            this.showMensagem = true
          } else {
            this.OpenSnackBarErrorDefault()
          }


        },
          () => {
            this.searchCpfProgressBar = 'hidden'
            this.dialogRef.addPanelClass('transf-unidade-class')
            // this.alunoCPF = cpf
            // this.alunoForm.get('cpf')?.setValue(this.alunoCPF)
            this.showDivPesquisa = false
            this.showDivForm = true
          });
    }


  }

  BuscarTurmas(unidadeId:any){

    var matriculaId =this.aluno.matriculaId
    this._http.get(`${this.baseUrl}/pedag/matricula/transf-unidade-turmas/${matriculaId}/${unidadeId}`)
      .subscribe({
        next: (resp:any) => { 
          this.showTurmaDropDown = true
          this.turmas = resp['turmas']
         },
        error: (resp:any) => {  
          if(resp['status'] == 404){
            this.OpenSnackBarError("N??o foram localizadas turmas dispon??veis")
          }else{
            this.OpenSnackBarErrorDefault()
          }
        }
      })
  }

  get disabledButton() {
    if (this.transfForm.valid) {
      return this.disabledSaveButton == 'visible'
    } else {
      return true
    }
  }

  public Transferir() {

    if (this.transfForm.valid) {

      this.disabledSaveButton == 'visible'


    }

  }

}