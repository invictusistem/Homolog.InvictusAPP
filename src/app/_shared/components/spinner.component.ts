import { Component, Input, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { SpinnerParams } from '../models/spinner.model';
import { HighlightTrigger } from '../animation/item.animation';

@Component({
    selector: 'spinner',
    templateUrl: './spinner.component.html',
    animations: [HighlightTrigger]
    // styleUrls: ['./spinner.component.scss']
})

export class SpinnerComponent implements OnInit {


    constructor() { }


    @Input("SpinnerParam")
    infoSpinner: SpinnerParams;// = new InfoPageParam();

    ngOnInit(): void {
        // this.infoSpinner.diameter = 100
        // this.infoSpinner.marginleft = 42.5
        // this.infoSpinner.margintop = 10
    }

    getStyles() {

        return {
            "margin-left": `${this.infoSpinner.marginleft}%`,
            "margin-top": `${this.infoSpinner.margintop}%`,
            "position": `absolute`,
        };
    }
    

}

