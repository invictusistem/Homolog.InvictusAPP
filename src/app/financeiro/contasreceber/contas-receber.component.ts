import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/_shared/services/basecomponent.component';
import { FinanceiroService } from '../services/financ.service';
import { OpenNovaContaReceberModal } from '../services/financ-modal'
import { ContasreceberNovaComponent } from './nova/contasreceber-nova.component';

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

    if (this.pesquisarForm.valid || this.tokenInfo['role'] == 'SuperAdm') {


      this._financService.GetContasReceber(
        this.pesquisarForm.get('meioPagamentoId')?.value,
        new Date(this.pesquisarForm.get('start')?.value).toISOString(),
        new Date(this.pesquisarForm.get('end')?.value).toISOString())
        .subscribe({
          next: (resp: any) => { },
          error: (fail: any) => { }
        });
    }

    //return event

  }

  public OpenNovaContaReceberModal() {
    const dialogRef = this._modal
      .open(ContasreceberNovaComponent, OpenNovaContaReceberModal());
    dialogRef.afterClosed().subscribe((data) => {

    });
  }

}