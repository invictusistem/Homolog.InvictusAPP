import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/_shared/services/basecomponent.component';

@Component({
  selector: 'app-transf-turmas',
  templateUrl: './transf-turmas.component.html',
  styleUrls: ['./transf-turmas.component.scss']
})
export class TransfTurmasComponent extends BaseComponent implements OnInit {

  public aluno:any
  public turmas: any[] = new Array<any>();
  public showDivPesquisa = true
  public showDivForm = false
  public pesquisaForm: FormGroup
  public transfForm: FormGroup
  searchCpfProgressBar = 'hidden'
  showMensagem = false
  mensagem = ""

  constructor(
    override _snackBar: MatSnackBar,
    private _http: HttpClient,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<TransfTurmasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    super(_snackBar);
    this.pesquisaForm = _fb.group({
      matricula: ['', [Validators.required]]
    })

    this.transfForm = _fb.group({
      turmaOrigemId: [''],
      matriculaId: [''],
      turmaDestinoId: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  consulta() {

    if (this.pesquisaForm.valid) {
      this.searchCpfProgressBar = 'visible'
      this.showMensagem = false

      //let cpf = this.pesquisaForm.get('cpf')?.value

      this._http.get(`${this.baseUrl}/pedag/matricula/transf-turma/${this.pesquisaForm.get('matricula')?.value}`)

        .subscribe((response: any) => {
            this.aluno = response['aluno']
            this.turmas = response['turmas']

        }, (err) => {
          this.searchCpfProgressBar = 'hidden'
          if(err['status'] == 404){
          this.searchCpfProgressBar = 'hidden'
          this.mensagem = "Matrículla não localizada nessa unidade"
          this.showMensagem = true
          }else{
            this.OpenSnackBarErrorDefault()
          }

          
        },
          () => {
            
            this.searchCpfProgressBar = 'hidden'
            this.dialogRef.addPanelClass('transf-turma-class')
            // this.alunoCPF = cpf
            // this.alunoForm.get('cpf')?.setValue(this.alunoCPF)
            this.showDivPesquisa = false
            this.showDivForm = true
          });
    }


  }

  get disabledButton() {
    return true
    if (this.transfForm.valid) {
      return this.disabledSaveButton == 'visible'
    } else {
      return true
    }
  }

  public Transferir() {

    if(this.transfForm.valid){

      this.disabledSaveButton == 'visible'


    }

  }

}
