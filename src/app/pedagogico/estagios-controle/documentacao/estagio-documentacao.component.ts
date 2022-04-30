import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmAcaoModalComponent } from 'src/app/_shared/components/acao-confirm/confirm-acao.component';
import { BaseComponent } from 'src/app/_shared/services/basecomponent.component';
import { ConfirmAcaoModalConfig } from 'src/app/_shared/services/shared.modal';
import { PedagogicoService } from '../../services/pedagogico.service';

@Component({
  selector: 'app-estagio-documentacao',
  templateUrl: './estagio-documentacao.component.html',
  styleUrls: ['./estagio-documentacao.component.scss']
})

export class EstagioDocumentacaoComponent extends BaseComponent implements OnInit {

  public documentacao: any[] = new Array<any>()

  constructor(
    override _snackBar: MatSnackBar,
    private _pedagService: PedagogicoService,
    private _modal: MatDialog,
    private _http: HttpClient,
    public dialogRef: MatDialogRef<EstagioDocumentacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(_snackBar);
  }

  ngOnInit(): void {
    this.GetDocumentacoes()
  }

  private GetDocumentacoes() {

    this._pedagService.GetDocumentacaoAlunoEstagio(this.data['aluno'].matriculaId)
      .subscribe({
        next: (response: any) => { this.GetDocumentacoesSucesso(response) },
        error: (error: any) => { this.GetDocumentacoesError(error) }
      })
  }

  private GetDocumentacoesSucesso(resp: any) {
    this.documentacao = resp['docs']
    console.log(this.documentacao)
    this.initProgressBar = 'hidden'
    this.showForm = true
  }

  private GetDocumentacoesError(error: any) {
    this.openSnackBarErrorDefault()
    this.initProgressBar = 'hidden'
  }

  public Aprovar(doc: any) {

    const dialogRef = this._modal
      .open(ConfirmAcaoModalComponent, ConfirmAcaoModalConfig());
    dialogRef.afterClosed().subscribe((data) => {

      if (data.clicked == true) {

        this._http.put(`${this.baseUrl}/estagio/aluno/${doc.id}/documentos-estagio/true`, {})
          .subscribe(
            response => {
              doc.analisado = true
              doc.validado = true
            },
            err => {
              this.openSnackBarErrorDefault()
            })
      }
    })


  }

  public Reprovar(doc: any) {

    const dialogRef = this._modal
      .open(ConfirmAcaoModalComponent, ConfirmAcaoModalConfig());
    dialogRef.afterClosed().subscribe((data) => {

      if (data.clicked == true) {

        this._http.put(`${this.baseUrl}/estagio/aluno/${doc.id}/documentos-estagio/false`, {})
          .subscribe(
            response => {
              doc.analisado = true
              doc.validado = false
            },
            err => {
              this.openSnackBarErrorDefault()
            })
      }
    })

  }


}
