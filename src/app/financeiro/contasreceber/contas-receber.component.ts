import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/_shared/services/basecomponent.component';
import { FinanceiroService } from '../services/financ.service';
import { OpenEditarContaReceberModal, OpenNovaContaReceberModal } from '../services/financ-modal'
import { ContasreceberNovaComponent } from './nova/contasreceber-nova.component';
import { ContasreceberEditComponent } from './editar/contasreceber-edit.component';
import { ConfirmAcaoModalComponent } from 'src/app/_shared/components/acao-confirm/confirm-acao.component';
import { ConfirmAcaoModalConfig } from "src/app/_shared/services/shared.modal";

@Component({
  selector: 'app-contas-receber',
  templateUrl: './contas-receber.component.html',
  styleUrls: ['./contas-receber.component.scss']
})

export class ContasReceberComponent extends BaseComponent implements OnInit {

  public pesquisarForm: FormGroup
  public meiosPagamento: any[] = new Array<any>()
  public contas: any[] = new Array<any>()
  public disabledForm = true
  public totalAtraso: any
  public totalreceber: any

  constructor(
    override _snackBar: MatSnackBar,
    private _financService: FinanceiroService,
    private _fb: FormBuilder,
    private _modal: MatDialog
  ) {

    super(_snackBar);

    this.pesquisarForm = _fb.group({
      meioPagamentoId: [null],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]]
    });

  }
  ngOnInit() {
    this.spinnerSearch = "visible"
    this.GetMeiosPagamento()
  }

  private GetMeiosPagamento() {

    this._financService.GetMeioPagamentos()
      .subscribe({
        next: (resp: any) => {
          this.meiosPagamento = Object.assign([], resp['result'])
          this.spinnerSearch = "hidden"
          this.disabledForm = false
        },
        error: (fail: any) => {
          this.spinnerSearch = "hidden"
          this.OpenSnackBarErrorDefault()
        }
      })

  }


  public Pesquisar(event?: any) {

    this.showMessageNotFound = false

    if (this.pesquisarForm.valid) {
      this.spinnerSearch = 'visible'
      this.showMessageNotFound = false
      this.contas = new Array<any>()
      this._financService.GetContasReceber(
        this.pesquisarForm.get('meioPagamentoId')?.value,
        new Date(this.pesquisarForm.get('start')?.value).toISOString(),
        new Date(this.pesquisarForm.get('end')?.value).toISOString())
        .subscribe({
          next: (resp: any) => {
            this.totalAtraso = resp['totalAtraso']

            this.totalreceber = resp['totalreceber']
            this.contas = Object.assign([], resp['contas'])
            this.spinnerSearch = 'hidden'
          },
          error: (fail: any) => {
            this.spinnerSearch = 'hidden'
            if (fail['status'] == 404) {
              this.showMessageNotFound = true
              this.mensagemNotFound = "Nenhum registro foi localizado no período informado."
            } else {
              this.OpenSnackBarErrorDefault()
            }
          }
        });
    }

    //return event

  }

  public DeletarConta(id: any) {

    const dialogRef = this._modal
      .open(ConfirmAcaoModalComponent, ConfirmAcaoModalConfig());
    dialogRef.afterClosed().subscribe((data) => {

      if (data.clicked == true) {

        this._financService.DeletarConta(id)
          .subscribe(
            {
              next: (resp: any) => { },
              error: (error: any) => { }
            })
      }
    })

  }

  public OpenNovaContaReceberModal() {
    const dialogRef = this._modal
      .open(ContasreceberNovaComponent, OpenNovaContaReceberModal());
    dialogRef.afterClosed().subscribe((data) => {

    });
  }

  public OpenEditContaReceberModal(contaId: any) {
    const dialogRef = this._modal
      .open(ContasreceberEditComponent, OpenEditarContaReceberModal(contaId));
    dialogRef.afterClosed().subscribe((data) => {

    });
  }

}