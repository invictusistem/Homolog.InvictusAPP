import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { environment } from "src/environments/environment";
import { InfoDia, ListaPresencaDto } from "../../Pedag-Models/infodia.model";


@Component({
    selector: 'analisedocmodal-app',
    templateUrl: './analise-docmodal.component.html',
    styleUrls: ['./analise-docmodal.component.scss'],
    animations: [HighlightTrigger]

})

export class AnaliseDocModalComponent implements OnInit {

    private _baseUrl = environment.baseUrl
    public listaPresencaDto: ListaPresencaDto[] = new Array<ListaPresencaDto>();
    public infoDia: InfoDia = new InfoDia();
    // public saveCommand: SavePresencaCommand = new SavePresencaCommand();
    public observacoes: string = "";
    public obsForm: FormGroup;
    public diaAulaString: any
    constructor(
        private _http: HttpClient,
        private _fb: FormBuilder,
        private _modal: MatDialog,
        public _dialogRef: MatDialogRef<AnaliseDocModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.obsForm = this._fb.group({
            observacoes: ['', [Validators.required]]
        })
    }

    ngOnInit() {
        console.log(this.data['aluno'])
        this.GetDocsInfo(this.data['aluno'].id)
        //  this.getPresencaViewModel(this.data['turma'].id);
    }

    docsEnviados: any[] = new Array<any>()
    docsPendentes: any[] = new Array<any>()
    private GetDocsInfo(alunoId) {

        this._http.get(`${this._baseUrl}/pedag/docs-relatorio/${alunoId}`)
            .subscribe(response => {
                this.docsEnviados = response['docsEnviados']
                this.docsPendentes = response['docsPendentes']
            }, (error) => { console.log(error) },
                () => {

                })
    }

    baixarArquivo(doc) {

        var file = doc.nome//"Modelo LEAD.xlsx";// this.createFileName("EXCEL");
        // this.showSpinner = true;
        // this.testehabilitar = false

        this.download(doc.id).subscribe(data => {
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

    public download(docId: number): Observable<HttpEvent<Blob>> {
        return this._http.request(new HttpRequest(
            'GET', `${this._baseUrl}/document/aluno-docs/?alunoid=0&docid=${docId}`, null, {
            reportProgress: true,
            responseType: 'blob'
        }));
    }

    aprovar(doc, aprovar) {

        this._http.put(`${this._baseUrl}/pedag/doc-analisar/${doc.id}/${aprovar}`, {})
            .subscribe(resp => { },
                (error) => { console.log(error) },
                () => {
                    this.GetDocsInfo(this.data['aluno'].id)
                })
    }

    // reprovar(doc){
    //     var param = { alunoId: aluno.id, docId: doc.docId, validado: false }
    //     this._http.put(`${this.baseUrl}/estagios`, param, {

    //     }).subscribe(resp => { },
    //         (error) => { console.log(error) },
    //         () => {

    //             var index1 = this.docsViewModel.findIndex(a => a.id == aluno.id)
    //             var index2 = this.docsViewModel[index1].documentos.findIndex(a => a.docId == doc.docId)
    //             this.docsViewModel[index1].documentos[index2].analisado = true
    //             this.docsViewModel[index1].documentos[index2].validado = false

    //         })
    // }

}

