import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Produto } from "src/app/_shared/models/produto.model";

@Component({
    selector: 'vendapesquisamodal',
    templateUrl: './venda-pesquisa.component.html',
    styleUrls: ['./venda-pesquisa.component.scss'],
    animations: [HighlightTrigger]
})

export class VendaPesquisaComponent implements OnInit {

   
    private baseUrl = environment.baseUrl;
    public produtos: Produto[] = new Array<Produto>();
    constructor(
        private http: HttpClient,
        public dialogRef: MatDialogRef<VendaPesquisaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        
    }

    ngOnInit() {
        
        this.produtos = Object.assign([], this.data["produtos"])
        console.log(this.produtos)
    }   
   

    onSubmit(form: FormGroup) {
        
    }

    fechar() {
        this.dialogRef.close({ clicked: "Ok" });
    }

    addProductToList(produto: Produto){
        this.dialogRef.close({ clicked: "Ok-ADD", 
        produto: produto});
    }

    
}