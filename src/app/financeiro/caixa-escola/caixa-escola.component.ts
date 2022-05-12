import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from 'src/app/_shared/services/basecomponent.component';
import { FinanceiroService } from '../services/financ.service';

@Component({
  selector: 'app-caixa-escola',
  templateUrl: './caixa-escola.component.html',
  styleUrls: ['./caixa-escola.component.scss']
})
export class CaixaEscolaComponent extends BaseComponent implements OnInit {
    
  //mensagem: string = "";
  public pesquisarForm: FormGroup;
  //public balancoProdutos: any[] = new Array<any>();
  //totalVendas!: number;

  constructor(
      //private _http: HttpClient,
      private _finService: FinanceiroService,
      override _snackBar: MatSnackBar,
      private _modal: MatDialog,
      private _fb: FormBuilder
  ) {
      super(_snackBar);
      this.pesquisarForm = _fb.group({
          start: ['', [Validators.required]],
          end: ['', [Validators.required]]
      });
     
  }


  ngOnInit() {

  }

  
  

}
