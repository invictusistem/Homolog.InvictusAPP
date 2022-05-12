import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FinanceiroService } from 'src/app/financeiro/services/financ.service';
import { BaseComponent } from 'src/app/_shared/services/basecomponent.component';

@Component({
  selector: 'app-bancocreate-config',
  templateUrl: './bancocreate-config.component.html',
  styleUrls: ['./bancocreate-config.component.scss']
})
export class BancocreateConfigComponent extends BaseComponent implements OnInit {

  constructor(
    private _finService: FinanceiroService,
    override _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<BancocreateConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(_snackBar);
  }

  ngOnInit(): void {
    this.GetBancos()
  }


  private GetBancos() {
    this.initProgressBar = 'visible'
    this.showForm = true
  }

}
