import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/_shared/services/basecomponent.component';
import { ContasreceberNovaComponent } from '../../contasreceber/nova/contasreceber-nova.component';
import { FinanceiroService } from '../../services/financ.service';

@Component({
  selector: 'app-contaspagar-nova',
  templateUrl: './contaspagar-nova.component.html',
  styleUrls: ['./contaspagar-nova.component.scss']
})
export class ContaspagarNovaComponent extends BaseComponent implements OnInit {

  public contaForm: FormGroup
  public pessoas: any[] = new Array<any>()
  public subcontas: any[] = new Array<any>()
  public bancos: any[] = new Array<any>()

  constructor(
    override _snackBar: MatSnackBar,
    private _financService: FinanceiroService,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<ContasreceberNovaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    super(_snackBar);

    this.contaForm = _fb.group({
      vencimento: [''],
      valor: [''],
      pessoa: [''],
      subcontaId: [''],
      centroCustoId: [''],
      meioPgmId: [''],
      contaId: [''],
      bancoId: [''],
      historico: ['']
    })

  }

  ngOnInit() {

    //
    this.dialogRef.addPanelClass('contapagar-nova-class')
    this.initProgressBar = 'hidden'
    this.showForm = true
  }

  get disabledButtonSave() {
    if (this.contaForm.valid) {
      return this.matProgressSaveButton != 'hidden'
    } else {
      return true
    }
  }

  public Save() {

  }

}