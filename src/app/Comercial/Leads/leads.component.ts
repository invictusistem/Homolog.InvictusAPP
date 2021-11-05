import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { Turma, TurmaViewModel } from "src/app/_shared/models/Turma.model";

import { environment } from "src/environments/environment";

@Component({
    selector: "leads-app",
    templateUrl: './leads.component.html',
    styleUrls: ['./leads.component.scss'],
    animations: [HighlightTrigger]
})

export class LeadsComponent implements OnInit {

    pageSize: number = 5;
    pageEvent: PageEvent;
    pageIndexNumber: number = 0;
    cursos: Turma[] = new Array<Turma>();
    baseUrl = environment.baseUrl;
    turmas: TurmaViewModel[] = new Array<TurmaViewModel>()
    private jwtHelper = new JwtHelperService();
    tokenInfo: TokenInfos = new TokenInfos();
    // colaboradores: Colaborador[] = new Array<Colaborador>();
    currentPage = 1

    showTurmas = false
    showMessage = false
    showSpinner = false
    mensagem: string;

    totalLeadsHoje = 0;
  totalLeads = 0;

    constructor(
        private _http: HttpClient,
        private _modal: MatDialog
    ) { }

    ngOnInit() {


        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        console.log('init colaboradores 123')
        this.getLeads();
    }

    getLeads(){

        this._http.get(`${this.baseUrl}/comercial/leads`)
        .subscribe(resp => {
          this.totalLeadsHoje = resp['totalLeadsHoje']
          this.totalLeads = resp['totalLeads']
        }, 
        (error) => { console.log(error)},
        () => { })
      }

    

    PodeAdiar(turma: TurmaViewModel) {
        if (turma.statusDaTurma == 'Aguardando início' &&
            turma.previsao != '3ª previsão') {
            return false
        } else {
            return true
        }
    }

}
