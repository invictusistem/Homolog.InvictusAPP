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
  public contas: any[] = new Array<any>()

  constructor(
    override _snackBar: MatSnackBar,
    private _financService: FinanceiroService,
    private _fb: FormBuilder,
    private _modal: MatDialog
  ) {

    super(_snackBar);

    this.pesquisarForm = _fb.group({
      meioPagamentoId: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]]
    });

  }
  ngOnInit() {

  }

  public Pesquisar(event?: any) {

    // this.showMessageNotFound = false

    // if (this.pesquisarForm.valid || this.tokenInfo['role'] == 'SuperAdm') {

    //     this.spinnerSearch = 'visible'            

    //     if (event != undefined) {
    //         this.currentPage = event.pageIndex + 1
    //     } else {
    //         this.currentPage = 1
    //     }

    //     this._finService.GetRegistrosFinanceirosDosProdutos(this.pageSize, this.currentPage, this.pesquisarForm.value)
    //         .subscribe(
    //             sucesso => { this.ProcessarSucesso(sucesso, event) },
    //             falha => { this.ProcessarFalha(falha) }
    //         );
    //}

    return event

  }

  public OpenNovaContaReceberModal() {
    const dialogRef = this._modal
      .open(ContasreceberNovaComponent, OpenNovaContaReceberModal());
    dialogRef.afterClosed().subscribe((data) => {

    });
  }

}