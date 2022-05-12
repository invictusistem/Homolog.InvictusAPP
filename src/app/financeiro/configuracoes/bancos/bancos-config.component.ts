import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/_shared/services/basecomponent.component';
import { FinanceiroService } from '../../services/financ.service';

@Component({
  selector: 'app-bancos-config',
  templateUrl: './bancos-config.component.html',
  styleUrls: ['./bancos-config.component.scss']
})
export class BancosConfigComponent extends BaseComponent implements OnInit {

  constructor(
    private _finService: FinanceiroService,
    override _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<BancosConfigComponent>,
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
