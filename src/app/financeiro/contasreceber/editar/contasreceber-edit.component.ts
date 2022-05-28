import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/_shared/services/basecomponent.component';
import { FinanceiroService } from '../../services/financ.service';

@Component({
  selector: 'app-contasreceber-edit',
  templateUrl: './contasreceber-edit.component.html',
  styleUrls: ['./contasreceber-edit.component.scss']
})

export class ContasreceberEditComponent extends BaseComponent implements OnInit {

  public contaForm: FormGroup
  private conta: any
  public alunos: any[] = new Array<any>()
  public fornecedores: any[] = new Array<any>()
  public subcontas: any[] = new Array<any>()
  public bancos: any[] = new Array<any>()
  public eHfornecedor = true

  constructor(
    override _snackBar: MatSnackBar,
    private _financService: FinanceiroService,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<ContasreceberEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    super(_snackBar);

    this.contaForm = _fb.group({
      vencimento: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      ehFornecedor: [true],
      pessoaId: ['', [Validators.required]],
      historico: [''],
      subcontaId: ['', [Validators.required]],
      bancoId: ['', [Validators.required]]
    })

    this.contaForm.get('ehFornecedor')?.valueChanges.subscribe(
      (form: any) => {

        if (this.contaForm.get('ehFornecedor')?.value) {
          this.contaForm.get('pessoaId')?.setValue('')
          this.eHfornecedor = true
        } else {
          this.contaForm.get('pessoaId')?.setValue('')
          this.eHfornecedor = false
        }
      }
    );

  }

  ngOnInit() {


    this.GetContaReceber()
  }

  private GetContaReceber() {
    this._financService.GetContaReceber(this.data['id'])
      .subscribe({
        next: (resp: any) => {
          this.contaForm.patchValue(resp['conta']);
          this.conta = JSON.parse(JSON.stringify(this.contaForm.value))
        },
        error: (error: any) => { this.initProgressBar = 'hidden'; this.OpenSnackBarErrorDefault() },
        complete: () => { this.GetAlunosFromUnidade() }
      })
  }

  public GetAlunosFromUnidade() {
    // GetAlunosFromUnidade
    this._financService.GetAlunosFromUnidade()
      .subscribe({
        next: (resp: any) => { this.alunos = Object.assign([], resp['matriculados']) },
        error: (error: any) => { this.initProgressBar = 'hidden'; this.OpenSnackBarErrorDefault() },
        complete: () => { this.GetFornecedoresFromUnidade() }
      })
  }

  public GetFornecedoresFromUnidade() {
    // GetFornecedoresFromUnidades
    this._financService.GetFornecedoresFromUnidades()
      .subscribe({
        next: (resp: any) => { this.fornecedores = Object.assign([], resp['fornecedores']) },
        error: (error: any) => { this.initProgressBar = 'hidden'; this.OpenSnackBarErrorDefault() },
        complete: () => { this.GetAllBancosFromUnidade() }
      })
  }

  public GetAllBancosFromUnidade() {
    //GetBancosAtivosFromUnidade
    this._financService.GetBancosAtivosFromUnidade()
      .subscribe({
        next: (resp: any) => { this.bancos = Object.assign([], resp['result']) },
        error: (error: any) => { this.initProgressBar = 'hidden'; this.OpenSnackBarErrorDefault() },
        complete: () => { this.GetAllSubcontasFromUnidade() }
      })
  }

  public GetAllSubcontasFromUnidade() {
    // GetSubcontasAtivas
    this._financService.GetSubcontasAtivas()
      .subscribe({
        next: (resp: any) => { this.subcontas = Object.assign([], resp['result']) },
        error: (error: any) => { this.initProgressBar = 'hidden'; this.OpenSnackBarErrorDefault() },
        complete: () => {
          //
          this.dialogRef.addPanelClass('contareceber-nova-class')
          this.initProgressBar = 'hidden'
          this.showForm = true
        }
      })
  }

  get disabledButtonSave() {
    if (this.contaForm.valid &&
      JSON.stringify(this.conta) !=
      JSON.stringify(this.contaForm.value)) {

      return this.matProgressSaveButton != 'hidden'
  } else {
      return true
  }
  }

  public Save() {
    this.matProgressSaveButton = 'visible'
    this._financService.EditContaReceber(this.contaForm.value)
      .subscribe({
        next: (resp: any) => { this.OpenSnackBarSucesso('Conta editada com sucesso.'); this.dialogRef.close({ saved: true }) },
        error: (error: any) => { this.matProgressSaveButton = 'hidden'; this.OpenSnackBarErrorDefault() },
        complete: () => { }
      })
  }

}