import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/_shared/services/basecomponent.component';
import { FinanceiroService } from '../services/financ.service';
import { OpenNovaContaPagarModal } from '../services/financ-modal'
import { MatDialog } from '@angular/material/dialog';
import { ContaspagarNovaComponent } from './nova/contaspagar-nova.component';

@Component({
  selector: 'app-contas-pagar',
  templateUrl: './contas-pagar.component.html',
  styleUrls: ['./contas-pagar.component.scss']
})

export class ContasPagarComponent extends BaseComponent implements OnInit {

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

  public OpenNovaContaPagarModal() {
    const dialogRef = this._modal
      .open(ContaspagarNovaComponent, OpenNovaContaPagarModal());
    dialogRef.afterClosed().subscribe((data) => {

    });
  }

}