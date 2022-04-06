import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/animation";

import { TokenInfos } from "src/app/_shared/models/token.model";
import { environment } from "src/environments/environment";


@Component({
    selector: "plano-app",
    templateUrl: './plano.component.html',
    styleUrls: ['./plano.component.scss'],
    animations: [HighlightTrigger]
})

export class PlanoPgmComponent implements OnInit {   

    ngOnInit() {
       
    }
}