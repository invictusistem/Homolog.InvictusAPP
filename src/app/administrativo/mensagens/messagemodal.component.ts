import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenInfos } from "src/app/_shared/models/token.model";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
    selector: 'messagemodal',
    templateUrl: './messagemodal.component.html'
})

export class MessageModalComponent implements OnInit {

    mensagem: any;
    public horario: any
    private jwtHelper = new JwtHelperService();
    tokenInfo: TokenInfos = new TokenInfos();


    constructor(
        //private router: Router,
        //private http: HttpClient,
        public dialogRef: MatDialogRef<MessageModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        const token:any = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
       // console.log(this.data)
        this.mensagem = this.data['message']
        //this.horario = this.data['horario']
    }

}