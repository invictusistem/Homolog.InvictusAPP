import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { RouteInfo } from "../models/route-info.model";
import { TrocaSenhaModalConfig } from "../models/shared-modal";
import { TokenInfos } from "../models/token.model";
import { AuthService } from "../_auth/auth.service";
import { TrocaSenhaComponent } from "../_auth/user/troca-senha/troca-senha.component";


export const ROUTES: RouteInfo[] = [

]

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.component.scss']
})

export class NavBarComponent implements OnInit {

    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();

    menu: any;
    constructor(
        private _router: Router,
        public authService: AuthService,
        private _modal: MatDialog,
    ) { }

    ngOnInit() {

        var token:any = localStorage.getItem('jwt');
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        this.menu = ROUTES.filter(menu => menu);

    }



    public TrocarSenha(): void {
        const dialogRef = this._modal
            .open(TrocaSenhaComponent, TrocaSenhaModalConfig());
        dialogRef.afterClosed().subscribe(data => {
            if (data.clicked === true) {

                localStorage.removeItem("jwt");

                this._router.navigateByUrl('user/login');
            } else if (data.clicked === "Cancel") {
              
            }
        });
    }

    public Logout() {
        localStorage.removeItem("jwt");
        this._router.navigateByUrl('user/login');
    }

}