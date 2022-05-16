import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/_shared/services/basecomponent.component';
import { FinanceiroService } from '../../services/financ.service';
import { BancocreateConfigComponent } from './create/bancocreate-config.component';
import { OpenBancoCreateConfigModal, OpenBancoEditConfigModal } from "../../services/financ-modal";
import { ModalConfirmarComponent } from 'src/app/_shared/components/modal-confirmar/modal-confirmar.component';
import { ModalconfirmarConfig } from '../../../_shared/services/shared.modal'
import { BancoeditConfigComponent } from './edit/bancoedit-config.component';

@Component({
  selector: 'app-bancos-config',
  templateUrl: './bancos-config.component.html',
  styleUrls: ['./bancos-config.component.scss']
})
export class BancosConfigComponent extends BaseComponent implements OnInit {

  public bancos: any[] = new Array<any>()

  constructor(
    private _finService: FinanceiroService,
    override _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private _modal: MatDialog,
    public dialogRef: MatDialogRef<BancosConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(_snackBar);
  }

  ngOnInit(): void {
    this.GetBancos()
  }


  private GetBancos() {

    this._finService.GetBancos()
      .subscribe({
        next: (resp: any) => { this.GetBancosSucesso(resp) },
        error: (error) => { this.GetBancosErro(error) },
        complete: () => {
          this.initProgressBar = 'hidden'
          this.showForm = true
        }
      })
  }

  private GetBancosSucesso(resp: any) {

    this.bancos = Object.assign([], resp['result'])
    // this.initProgressBar = 'hidden'
    //this.showForm = true

  }

  private GetBancosErro(error: any) {
    this.initProgressBar = 'hidden'
    this.OpenSnackBarErrorDefault()
  }

  get disabledOpenEditButton(){
    return false
  } 

  public CreateBanco(): void {
    const dialogRef = this._modal
      .open(BancocreateConfigComponent, OpenBancoCreateConfigModal());
    dialogRef.afterClosed().subscribe(data => {
      if (data['saved'] == true)
        this.GetBancos()
    });
  }

  public RemoveBanco(bancoId:any){

    const dialogRef = this._modal
            .open(ModalConfirmarComponent, ModalconfirmarConfig(
              `configuracao-financ/banco/${bancoId}`,
              'delete',
              'Deseja remover o banco?',
              'Banco deletado com sucesso.'
            ));
        dialogRef.afterClosed().subscribe((data) => {
            if (data.confirm == true) {
              this.GetBancos()
            }
        })
  }

  public EditarBanco(bancoId: any){
    const dialogRef = this._modal
            .open(BancoeditConfigComponent, OpenBancoEditConfigModal(bancoId));
        dialogRef.afterClosed().subscribe((data) => {
            if (data.saved == true) {
              this.GetBancos()
            }
        })
  }

  get podeDeletar() {

    return this.tokenInfo.role == 'SuperAdm'
  }

}
