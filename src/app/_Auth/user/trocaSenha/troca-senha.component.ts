import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from "@angular/forms";
import { environment } from "src/environments/environment";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";


@Component({
    selector: 'troca-senhamodal',
    templateUrl: './troca-senha.component.html',
    //styleUrls: ['./troca-senha.component.scss'],
    animations: [HighlightTrigger]
})

export class TrocaSenhaComponent implements OnInit {

    baseUrl = environment.baseUrl;
   

    constructor(
        private _fb: FormBuilder,
        private _http: HttpClient,
       // private _service: PedagService,
        private _modal: MatDialog,
        public dialogRef: MatDialogRef<TrocaSenhaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        // this.documentoForm = _fb.group({
        //     descricao: ['', [Validators.required]],
        //     comentario: ['', [Validators.required]],
        // })       

    }

    ngOnInit() {

      
    }

  


}