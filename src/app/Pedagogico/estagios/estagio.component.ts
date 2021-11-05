import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { Parametros } from "src/app/Adm/Colaboradores/colaboradores.component";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Aluno } from "src/app/_shared/models/aluno.model";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { AlunoDocument, AlunoDto } from "src/app/_shared/models/document.model";
import { TokenInfos } from "src/app/_shared/models/token.model";

import { environment } from "src/environments/environment";
import { SupervisorCreateComponent } from "./create-supervisor/supervisor-create.component";
import { EstagioAlunosComponent } from "./estagio-alunos/estagio-alunos.component";
import { EstagioEditComponent } from "./estagio-edit/estagio-edit.component";
import { EstagioSupervisaoComponent } from "./estagio-supervisores/estagio-supervisao.component";
import { EstagioCadastroComponent } from "./estagiocadastro/estagiocadastro.component";


@Component({
    selector: "estagio-app",
    templateUrl: './estagio.component.html',
    styleUrls: ['./estagio.component.scss'],
    animations: [HighlightTrigger]

})

export class EstagioComponent implements OnInit {



    private baseUrl = environment.baseUrl;

    public cepReturn: CepReturn = new CepReturn();
    public docsViewModel: AlunoDto[] = new Array<AlunoDto>();
    estagioForm: FormGroup
    analise: any
    public estagios: any[] = new Array<any>();
    private jwtHelper = new JwtHelperService();
    tokenInfo: TokenInfos = new TokenInfos();

    constructor(
        private _snackBar: MatSnackBar,
        private _cadastroEstagioModal: MatDialog,
        private _http: HttpClient,
        private _fb: FormBuilder
        //private CreateColaboradoresModal: MatDialog,
        //private EditColaboradoresModal: MatDialog
    ) {
        this.estagioForm = _fb.group({
            nome: ["", [Validators.required]],
            dataInicio: ["", [Validators.required]],
            vagas: ["", [Validators.required]],
            trimestre: ["", [Validators.required]],
            inicio: ['', [Validators.required]],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            complemento: [''],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]]//,
        })
    }
    ngOnInit() {


        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)

        console.log('init matricula')
        this.getInfoEstagios();
    }

    exportar(doc: AlunoDocument) {
        //..console.log(doc:Document)
        var file = doc.nome;// "Modelo LEAD.xlsx";// this.createFileName("EXCEL");
        // this.showSpinner = true;
        // this.testehabilitar = false

        this.download(doc.alunoId, doc.docId).subscribe(data => {
            //console.log(data)
            switch (data.type) {
                case HttpEventType.Response:
                    // this.showSpinner = false;
                    //this.downloadStatus.emit( {status: ProgressStatusEnum.COMPLETE});
                    const downloadedFile = new Blob([data.body], { type: data.body.type });
                    const a = document.createElement('a');
                    a.setAttribute('style', 'display:none;');
                    document.body.appendChild(a);
                    a.download = file;
                    a.href = URL.createObjectURL(downloadedFile);
                    a.target = '_blank';
                    a.click();
                    document.body.removeChild(a);
                    break;
            }
        },
            (err) => {
                //this.showSpinner = false;
                //this.testehabilitar = true;
            },
            () => {
                //this.showSpinner = false;
                // this.testehabilitar = true;
            }
        );
    }

    public download(alunoid: number, docId: number): Observable<HttpEvent<Blob>> {
        return this._http.request(new HttpRequest(
            'GET', `${this.baseUrl}/estagios/file/?alunoid=${alunoid}&docid=${docId}`, null, {
            reportProgress: true,
            responseType: 'blob'
        }));
    }

    aprovar(aluno: AlunoDto, doc: AlunoDocument) {
        //var index1 = this.docsViewModel.findIndex(d => d.id == doc.docId)
        // var index1 = this.docsViewModel.findIndex(a => a.id == aluno.id)
        // var index2 = this.docsViewModel[index1].documentos.findIndex(a => a.docId == doc.docId)
        // console.log(index1)
        // console.log(index2)

        // this.docsViewModel[index1].documentos[index2].analisado = true
        // this.docsViewModel[index1].documentos[index2].validado = true
        var param = { alunoId: aluno.id, docId: doc.docId, validado: true }

        this._http.put(`${this.baseUrl}/estagios`, param, {

        }).subscribe(resp => { },
            (error) => { console.log(error) },
            () => {

                var index1 = this.docsViewModel.findIndex(a => a.id == aluno.id)
                var index2 = this.docsViewModel[index1].documentos.findIndex(a => a.docId == doc.docId)
                this.docsViewModel[index1].documentos[index2].analisado = true
                this.docsViewModel[index1].documentos[index2].validado = true


            })

        //this.analise = true
    }

    reprovar(aluno: AlunoDto, doc: AlunoDocument) {


        var param = { alunoId: aluno.id, docId: doc.docId, validado: false }
        this._http.put(`${this.baseUrl}/estagios`, param, {

        }).subscribe(resp => { },
            (error) => { console.log(error) },
            () => {

                var index1 = this.docsViewModel.findIndex(a => a.id == aluno.id)
                var index2 = this.docsViewModel[index1].documentos.findIndex(a => a.docId == doc.docId)
                this.docsViewModel[index1].documentos[index2].analisado = true
                this.docsViewModel[index1].documentos[index2].validado = false

            })
    }

    getInfoEstagios() {

        this._http.get(`${this.baseUrl}/estagios/documentos`)
            .subscribe(result => {

                console.log(result)
                Object.assign(this.docsViewModel, result['documentos'])
                Object.assign(this.estagios, result['estagios'])

                console.log(this.docsViewModel)
            },
                (error) => { console.log(error) },
                () => { })
    }
    //EstagioCadastroComponent     cadastroEstagio
    cadastroEstagio(): void {
        const dialogRef = this._cadastroEstagioModal
            .open(EstagioCadastroComponent, {
                height: 'auto',
                width: '600px',

                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                // Reset form here
                console.log('afte close ok')
                //this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }

    verificarMatriculados(estagio): void {
        const dialogRef = this._cadastroEstagioModal
            .open(EstagioAlunosComponent, {
                height: 'auto',
                width: '720px',

                data: { estagio: estagio },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                // Reset form here
                console.log('afte close ok')
                //this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }

    // EstagioSupervisaoComponent

    verEstagioSupervisao(estagio): void {
        const dialogRef = this._cadastroEstagioModal
            .open(EstagioSupervisaoComponent, {
                height: 'auto',
                width: '720px',

                data: { estagio: estagio },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                // Reset form here
                console.log('afte close ok')
                //this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }

    addSupervisor(estagio): void {
        const dialogRef = this._cadastroEstagioModal
            .open(SupervisorCreateComponent, {
                    minHeight: '420px',
                    width: '680px',
    
                    data: { estagio: estagio },
                    hasBackdrop: true,
                    disableClose: true
                });
    
    
            dialogRef.afterClosed().subscribe((data) => {
                if (data.clicked === "Ok") {
                    // Reset form here
                    console.log('afte close ok')
                   
                } else if (data.clicked === "Cancel") {
                    // Do nothing. Cancel any events that navigate away from the
                    // component.
                }
            });
    }

    editarEstagio(estagioId: number): void {
        const dialogRef = this._cadastroEstagioModal
            .open(EstagioEditComponent, {
                height: 'auto',
                width: '600px',

                data: { estagioId: estagioId },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "OK") {
                // Reset form here
                //console.log('afte close ok')
                this.getInfoEstagios();
                //this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }


}

