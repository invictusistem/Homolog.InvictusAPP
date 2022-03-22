import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { Turma, TurmaViewModel } from "src/app/_shared/models/Turma.model";
import { Chart } from 'chart.js';
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


  name = 'Angular   6';
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart;
  
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


    ngAfterViewInit() {
        this.canvas = this.mychart.nativeElement; 
        this.ctx = this.canvas.getContext('2d');
    
        let myChart = new Chart(this.ctx, {
          type: 'bar',
          
          data: {
            labels: ['20/03','20/03','20/03','20/03','20/03','20/03','20/03'],
            datasets: [{
              label: 'My First Dataset',
              data: [65, 59, 80,70,55,0,15],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1
            }]
          }
        });
      }

}
