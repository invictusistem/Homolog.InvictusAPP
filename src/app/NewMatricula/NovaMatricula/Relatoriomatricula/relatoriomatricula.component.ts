import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from "@angular/forms";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";

@Component({
    selector: 'createnovamatriculamodal',
    templateUrl: './relatoriomatricula.component.html',
    styleUrls: ['./relatoriomatricula.component.scss'],
    animations: [HighlightTrigger]
})

export class RelatorioMatriculaComponent implements OnInit {

    public initProgressBar = 'visible'
    public showForm = false

    constructor(
        private _fb: FormBuilder,
        public dialogRef: MatDialogRef<RelatorioMatriculaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {

    }

}

