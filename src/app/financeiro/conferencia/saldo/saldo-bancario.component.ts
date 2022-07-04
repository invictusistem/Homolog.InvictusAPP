import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/_shared/services/basecomponent.component';

@Component({
  selector: 'app-saldo-bancario',
  templateUrl: './saldo-bancario.component.html',
  styleUrls: ['./saldo-bancario.component.scss']
})
export class SaldoBancarioComponent extends BaseComponent implements OnInit {

  constructor(
    override _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SaldoBancarioComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    super(_snackBar);
  }

  ngOnInit(): void {
  }

}
