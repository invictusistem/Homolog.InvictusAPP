import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/_shared/services/basecomponent.component';
import { AlunoSiaService } from '../../services/aluno-sia.service';

@Component({
  selector: 'app-reqs-criar',
  templateUrl: './reqs-criar.component.html',
  styleUrls: ['./reqs-criar.component.scss']
})
export class ReqsCriarComponent extends BaseComponent implements OnInit {

  constructor(
    override _snackBar: MatSnackBar,
    private _alunoService: AlunoSiaService,
    private _modal: MatDialog,
    public dialogRef: MatDialogRef<ReqsCriarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(_snackBar);
  }

  ngOnInit(): void {
  }

}
