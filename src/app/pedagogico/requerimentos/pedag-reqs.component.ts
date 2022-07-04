import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/_shared/services/basecomponent.component';
import { PedagogicoService } from '../services/pedagogico.service';
import { RequerimentoNovoComponent } from './novo/requerimento-novo.component';
import { CreateRequerimentoModalConfig } from '../services/pedag-modal';

@Component({
  selector: 'app-pedag-reqs',
  templateUrl: './pedag-reqs.component.html',
  styleUrls: ['./pedag-reqs.component.scss']
})
export class PedagReqsComponent extends BaseComponent implements OnInit {

  constructor(
    private _pedagService: PedagogicoService,
    override _snackBar: MatSnackBar,
    private _modal: MatDialog,
  ) {
    super(_snackBar);
   }

  ngOnInit(): void {
  }

  openCreateRequerimento(): void {
    const dialogRef = this._modal
        .open(RequerimentoNovoComponent, CreateRequerimentoModalConfig());
    dialogRef.afterClosed().subscribe((data) => {

    });
}


}
