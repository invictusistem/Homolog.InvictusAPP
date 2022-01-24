import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Aluno } from "src/app/_shared/models/aluno.model";
import { PedagService } from "../../service/pedag.service";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { InfoFinanceiras } from "src/app/_shared/models/InfoFinanceiras.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { DocumentoAlunoDto } from "../../Pedag-Models/documentoaluno.model";
import { Observable } from "rxjs";
import { AddAnotacaoComponent } from "./Anotacao/add-anotacao.component";
import { SpinnerParams } from "src/app/_shared/models/spinner.model";
import { ConfirmModalComponent } from "src/app/_shared/components/ConfirmModal/confirm-modal.component";
import { PedagogicoService } from "../../service/pedagogico.service";

@Component({
    selector: 'infosmodal',
    templateUrl: './infos.component.html',
    styleUrls: ['./infos.component.scss'],
    animations: [HighlightTrigger]
})

export class InfosComponent implements OnInit {

    baseUrl = environment.baseUrl;


    public initProgressBar = 'visible'
    public showtablePrinciple = false
    public showAluno: boolean = false
    public showRespFinanc: boolean = false
    public showRespMenor: boolean = false
    public nome: string = ''
    public aluno: Aluno = new Aluno();
    public debitos: InfoFinanceiras = new InfoFinanceiras();
    private jwtHelper = new JwtHelperService();
    tokenInfo: TokenInfos = new TokenInfos();
    public documentoAluno: DocumentoAlunoDto[] = new Array<DocumentoAlunoDto>();

    public originalAluno: any
    public originalRespFin: any
    public originalRespMenor: any
    public turma: any
    public documentos: any

    public documentoForm: FormGroup
    public anotacaoForm: FormGroup
    private respFinId: number = 0;
    private respMenorId: number = 0;

    public alunoForm: FormGroup;
    public respFinancForm: FormGroup;
    public respMenorForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _http: HttpClient,
        private _service: PedagogicoService,
        private _modal: MatDialog,
        public dialogRef: MatDialogRef<InfosComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.documentoForm = _fb.group({
            descricao: ['', [Validators.required]],
            comentario: ['', [Validators.required]],
        })

        this.anotacaoForm = _fb.group({
            comentario: ['', [Validators.required]],
            matriculaId: ['']
        })

        this.alunoForm = _fb.group({
            id: [''],
            ativo: [''],
            nome: ['', [Validators.required]],
            cpf: ['', [Validators.required, Validators.minLength(11)]],
            rg: ['', [Validators.required]],
            nascimento: ['', [Validators.required]],
            nomeMae: ['', [Validators.required]],
            nomePai: ['', [Validators.required]],
            nomeSocial: [''],
            telReferencia: ['', [Validators.required]],
            nomeContatoReferencia: ['', [Validators.required]],
            naturalidade: ['', [Validators.required]],
            naturalidadeUF: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.minLength(5)]],
            telCelular: [null],
            telWhatsapp: [null],
            telResidencial: [null],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            complemento: [''],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]],
            //observacoes: ['', [Validators.minLength(1), Validators.maxLength(300)]],
            dataCadastro: [''],
            numero: ['', [Validators.required]],
            unidadeId: [''],
        })

        this.respFinancForm = _fb.group({
            id: [''],
            nome: ['', [Validators.required, Validators.minLength(2)]],
            cpf: ['', [Validators.required, Validators.minLength(11)]],
            rg: ['', [Validators.required, Validators.minLength(9)]],
            nascimento: ['', [Validators.required]],
            naturalidade: ['', [Validators.required]],
            naturalidadeUF: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.minLength(5)]],
            telCelular: [null],
            telWhatsapp: [null],
            telResidencial: [null],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            complemento: [''],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]],
            numero: ['', [Validators.required]],
            TipoResponsavel: [''],
            matriculaId: [''],
            temRespFin: [''],
            tipo: ['']
        })

        this.respMenorForm = _fb.group({
            id: [''],
            nome: ['', [Validators.required, Validators.minLength(2)]],
            cpf: ['', [Validators.required, Validators.minLength(11)]],
            rg: ['', [Validators.required, Validators.minLength(9)]],
            nascimento: ['', [Validators.required]],
            naturalidade: ['', [Validators.required]],
            naturalidadeUF: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.minLength(5)]],
            telCelular: [null],
            telWhatsapp: [null],
            telResidencial: [null],
            cep: ['', [Validators.required, Validators.minLength(8)]],
            logradouro: ['', [Validators.required, Validators.minLength(1)]],
            complemento: [''],
            cidade: ['', [Validators.required, Validators.minLength(1)]],
            uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            bairro: ['', [Validators.required, Validators.minLength(1)]],
            numero: ['', [Validators.required]],
            TipoResponsavel: [''],
            matriculaId: [''],
            temRespFin: [''],
            tipo: ['']
        })


        //this.alunoForm.get('logradouro').disable()
        //this.alunoForm.get('cidade').disable()
        //this.alunoForm.get('uf').disable()

    }

    ngOnInit() {
        console.log(this.data['aluno'])
        this.anotacaoForm.get('matriculaId').setValue(this.data['aluno'].matriculaId)

        this.GetInformacoesMatricula(this.data['aluno'].matriculaId)
    }

    // alunoInfo: any;
    respFin: any;
    respMenor: any;
    anotacoes: any[] = new Array<any>()
    private alunoOriginal: any;
    private respFinOriginal: any;
    private respMenorOriginal: any;

    GetInformacoesMatricula(matriculaId) {

        this._http.get(`${this.baseUrl}/pedag/aluno/${matriculaId}`)
            .subscribe(resp => {
                console.log(resp)
                this.turma = resp['turma'];
                //this.respFin = resp['respFin'];
                //this.respMenor = resp['respMenor'];
                this.anotacoes = resp['anotacoes'];
                this.documentoAluno = resp['docs'];
                // this.alunoOriginal = JSON.parse(JSON.stringify(resp['aluno']))
                // Aluno
                this.alunoForm.patchValue(resp['aluno']);
                this.alunoOriginal = JSON.parse(JSON.stringify(this.alunoForm.value))
                // RespFin
                this.respFin = resp['respFin']
                this.respFinancForm.patchValue(resp['respFin'])
                this.respFinOriginal = JSON.parse(JSON.stringify(this.respFinancForm.value))
                // respMenor
                this.respMenorForm.patchValue(resp['respMenor'])
                this.respMenor = resp['respMenor']
                this.respMenorOriginal = JSON.parse(JSON.stringify(this.respMenorForm.value))
            },
                (error) => { console.log(error) },
                () => {
                    this.showAluno = true
                    this.showtablePrinciple = true
                    this.initProgressBar = 'hidden'
                    //  console.log(this.turma)
                })

    }

    //#region Saves

    // ALUNO SAVE
    saveAluno(form: any) {

        if (this.alunoForm.valid) {
            this.saveAlunoProgressBar = 'visible'

            this._service.saveAluno(this.alunoForm.value)
                .subscribe(
                    sucesso => { this.saveAlunoSucesso(sucesso) },
                    falha => { this.saveAlunoFalha(falha) }
                )
        }
    }

    getListaPendenciaDocs(){
        
        var file = "lista_penencia";

        this.downloadListPendencia(this.data['aluno'].matriculaId)
            .subscribe(data => {

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
            (err) => { },
            () => { }
        );

    }

    public downloadListPendencia(matriculaId: any): Observable<HttpEvent<Blob>> {
        return this._http.request(new HttpRequest(
            'GET', `${this.baseUrl}/pedag/doc/getpendencia/${matriculaId}`, null, {
            reportProgress: true,
            responseType: 'blob'
        }));
    }

    saveAlunoSucesso(resposta) {
        //this.saveAlunoProgressBar = 'hidden'
        this.GetAluno(this.alunoForm.get('id').value);
    }

    saveAlunoFalha(erro) {
        console.log(erro)
        this.saveAlunoProgressBar = 'hidden'
    }

    GetAluno(alunoId) {

        this._service.getAlunobyId(alunoId)
            .subscribe(
                sucesso => { this.getAlunoSucesso(sucesso) },
                falha => { this.getAlunoFalha(falha) }
                )
    }

    getAlunoSucesso(resposta){
        this.alunoForm.patchValue(resposta['aluno']);
        this.alunoOriginal = JSON.parse(JSON.stringify(this.alunoForm.value))
        this.saveAlunoProgressBar = 'hidden'
    }

    getAlunoFalha(erro){
        this.saveAlunoProgressBar = 'hidden'
    }

    // RESP FIN SAVE

    saveRespFin(form: any) {

        if (this.respFinancForm.valid) {
            this.saveRespFinProgressBar = 'visible'

            this._service.saveResponsavel(this.respFinancForm.value)
                .subscribe(
                    sucesso => { this.saveRespFinSucesso(sucesso) },
                    falha => { this.saveRespFinFalha(falha) }
                )
        }
    }

    saveRespFinSucesso(resposta) {
        this.GetResponsavel(this.respFinancForm.get('id').value);
    }

    saveRespFinFalha(erro) {
        console.log(erro)
        this.saveRespFinProgressBar = 'hidden'
    }

    GetResponsavel(respId) {

        this._service.GetResponsavelById(respId)
            .subscribe(
                sucesso => { this.GetResponsavelSucesso(sucesso) },
                falha => { this.GetResponsavelFalha(falha) }
                )
    }

    GetResponsavelSucesso(resposta){
        this.respFinancForm.patchValue(resposta['resp']);
        this.respFinOriginal = JSON.parse(JSON.stringify(this.respFinancForm.value))
        this.saveRespFinProgressBar = 'hidden'
    }

    GetResponsavelFalha(erro){
        this.saveRespFinProgressBar = 'hidden'
    }

     // RESP MENOR SAVE

     saveRespMenor(form: any) {

        if (this.respMenorForm.valid) {
            this.saveRespMenorProgressBar = 'visible'

            this._service.saveResponsavel(this.respMenorForm.value)
                .subscribe(
                    sucesso => { this.saveRespMenorSucesso(sucesso) },
                    falha => { this.saveRespMenorFalha(falha) }
                )
        }
    }

    saveRespMenorSucesso(resposta) {
        this.GetResponsavelMenor(this.respMenorForm.get('id').value);
    }

    saveRespMenorFalha(erro) {
        console.log(erro)
        this.saveRespMenorProgressBar = 'hidden'
    }

    GetResponsavelMenor(respId) {

        this._service.GetResponsavelById(respId)
            .subscribe(
                sucesso => { this.GetResponsavelMenorSucesso(sucesso) },
                falha => { this.GetResponsavelMenorlFalha(falha) }
                )
    }

    GetResponsavelMenorSucesso(resposta){
        this.respMenorForm.patchValue(resposta['resp']);
        this.respMenorOriginal = JSON.parse(JSON.stringify(this.respMenorForm.value))
        this.saveRespMenorProgressBar = 'hidden'
    }

    GetResponsavelMenorlFalha(erro){
        this.saveRespMenorProgressBar = 'hidden'
    }


    //#endregion

    //#region SAVE BUTTONS
    saveAlunoProgressBar = 'hidden'
    get saveAlunoButton() {

        if (this.alunoForm.valid &&
            JSON.stringify(this.alunoOriginal) !=
            JSON.stringify(this.alunoForm.value)) {

            return this.saveAlunoProgressBar != 'hidden'
        } else {
            return true
        }
    }

    saveRespFinProgressBar = 'hidden'
    get saveRespFinButton() {

        if (this.respFinancForm.valid &&
            JSON.stringify(this.respFinOriginal) !=
            JSON.stringify(this.respFinancForm.value)) {

            return this.saveRespFinProgressBar != 'hidden'
        } else {
            return true
        }
    }

    saveRespMenorProgressBar = 'hidden'
    get saveRespMenorButton() {

        if (this.respMenorForm.valid &&
            JSON.stringify(this.respMenorOriginal) !=
            JSON.stringify(this.respMenorForm.value)) {

            return this.saveRespMenorProgressBar != 'hidden'
        } else {
            return true
        }
    }

    //#endregion

   

    consultaCEP(CEP: string, form) {

        this._http.get(`https://viacep.com.br/ws/${CEP}/json/`, {})
            .subscribe(response => {

                form.get('logradouro').setValue(response["logradouro"].toUpperCase());
                form.get('bairro').setValue(response["bairro"].toUpperCase());
                form.get('cidade').setValue(response["localidade"].toUpperCase());
                form.get('uf').setValue(response["uf"].toUpperCase());

            }, err => { console.log(err) },
                () => { });


    }

    submitAnotacao() {

        console.log(this.anotacaoForm.valid)
        console.log(this.anotacaoForm.value)
        if (this.anotacaoForm.valid) {

            this._http.post(`${this.baseUrl}/pedag/matricula/anotacao`, this.anotacaoForm.value, {})
                .subscribe(response => {

                }, err => { console.log(err) },
                    () => {
                        this.GetAnotacoes();
                        
                    });



        }
    }

    ShowAnotSpinner = 'hidden'
    openAddComentarioModal(): void {
        const dialogRef = this._modal
            .open(AddAnotacaoComponent, {
                height: '310px',
                width: '500px',
                autoFocus: false,


                data: {},
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "OK") {
                console.log('afte close ok')
                this.anotacaoForm.get('comentario').setValue(data.comentario)
                this.ShowAnotSpinner = 'visible'
                this.submitAnotacao();

            } else if (data.clicked === "Cancel") {

            }
        });
    }

    GetAnotacoes() {

        this._http.get(`${this.baseUrl}/pedag/matricula/anotacao/${this.data['aluno'].matriculaId}`)
            .subscribe(resp => {
                console.log(resp)

                this.anotacoes = resp['anotacoes'];

                console.log(this.respMenor)

            },
                (error) => { console.log(error) 
                    this.ShowAnotSpinner = 'hidden'
                },
                () => {
                    this.ShowAnotSpinner = 'hidden'
                })

    }

    excluirArquivo(doc) {
        const dialogRef = this._modal
            .open(ConfirmModalComponent, {
                minHeight: '150px',
                width: '400px',

                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "sim") {
                doc.salvando = true
                this.remover(doc)
            } else {
                console.log('nao deletar')
            }
        });

    }

    remover(doc) {
        doc.salvando = true
        this._http.put(`${this.baseUrl}/pedag/doc/excluir/${doc.id}`, {},)
            .subscribe(resp => {
                
            },
                (error) => { console.log(error)
                    doc.salvando = false
                },
                () => {
                    
                    this.getInfoDocs(doc);
                })
    }
































    getInfoFinancAlunos(alunoId: number) {

        this._http.get(`${this.baseUrl}/financeiro/aluno-debitos/${alunoId}`)
            .subscribe(resp => {
                this.debitos = Object.assign({}, resp);
            },
                (error) => { console.log(error) },
                () => {
                    console.log(this.debitos);
                })
    }

    addDocumentos(form: any) {  // pendencia-criar/{alunoId}
        console.log(form.value)

        if (form.valid) {
            this._http.post(`${this.baseUrl}/document/pendencia-criar/${this.data['aluno'].id}`, form.value, {

            })
                .subscribe(resp => {
                    // this.debitos = Object.assign({}, resp);
                },
                    (error) => { console.log(error) },
                    () => {
                        //console.log(this.debitos);
                        this.documentoForm.reset()
                    })
        }
    }


    isMatriculado = true
    getInfoDocs(doc) {

        this._http.get(`${this.baseUrl}/pedag/doc/lista/${this.data['aluno'].matriculaId}`)
            .subscribe(resp => {
                //this.debitos = Object.assign({}, resp);
                this.documentoAluno = Object.assign([], resp['docs'])
                //this.isMatriculado = resp['matriculado']
            },
                (error) => { console.log(error)
                    doc.salvando = false
                },
                () => {
                    doc.salvando = false
                    console.log(this.documentoAluno);
                })
    }



    get Equals() {
        return JSON.stringify(this.alunoForm.value) === JSON.stringify(this.originalAluno)
    }

    get EqualsFin() {
        return JSON.stringify(this.respFinancForm.value) === JSON.stringify(this.originalRespFin)
    }

    get EqualsMenor() {
        return JSON.stringify(this.respMenorForm.value) === JSON.stringify(this.originalRespMenor)
    }

    public cepReturn: CepReturn = new CepReturn();
    //public logradouro = ''
    //public bairro = ''
    public localidade = ''
    public uf = ''



    saveEditAluno() {

        console.log(this.aluno)

        //this.alunoForm.value



    }

    onSubmit(form: FormGroup) {
        let alunoUpdate = JSON.stringify(this.alunoForm.value)
        console.log(alunoUpdate)
        this._http.put(`${this.baseUrl}/adm/aluno/1`, alunoUpdate, {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bear "
            })

        }).subscribe(resp => {

        },
            (error) => { console.log(error) },
            () => {
                this.originalAluno = this.alunoForm.value
            })
    }

    onSubmitMenor(form: FormGroup) {

    }



    clicou() {
        console.log('clicou')


    }

    /*                           DOCS                   */



    formDatas = new FormData();

    fileAP: File[] = []
    fileAPName: string = null
    fileAPViewName: string = null

    fileCartaoVac: File[] = []
    fileCartaoVacName: string = null
    fileCartaoVacViewName: string = null

    fileTipoSang: File[] = []
    fileTipoSangName: string = null
    fileTipoSangViewName: string = null

    fileHCG: File[] = []
    fileHCGName: string = null
    fileHCGViewName: string = null
    public progress: number;
    public message: string;
    @Output() public onUploadFinished = new EventEmitter();

    apendFileAP(file) {
        this.fileAP = new Array<File>()
        let fileToUpload = <File>file[0];
        this.fileAPName = `AP${fileToUpload.name}`
        this.fileAPViewName = `${fileToUpload.name}`
        this.fileAP.push(fileToUpload)
    }

    apendFileCartaoVac(file) {
        this.fileCartaoVac = new Array<File>()
        let fileToUpload = <File>file[0];
        this.fileCartaoVacName = `CV${fileToUpload.name}`
        this.fileCartaoVacViewName = `${fileToUpload.name}`
        this.fileCartaoVac.push(fileToUpload)
    }

    apendFileTipoSang(file) {
        this.fileTipoSang = new Array<File>()
        let fileToUpload = <File>file[0];
        this.fileTipoSangName = `TP${fileToUpload.name}`
        this.fileTipoSangViewName = `${fileToUpload.name}`
        this.fileTipoSang.push(fileToUpload)
    }

    apendFileHCG(file) {
        this.fileHCG = new Array<File>()
        let fileToUpload = <File>file[0];
        this.fileHCGName = `HC${fileToUpload.name}`
        this.fileHCGViewName = `${fileToUpload.name}`
        this.fileHCG.push(fileToUpload)
    }


    verificar() {

        console.log(this.fileAP)
        console.log(this.fileCartaoVac)

        console.log(this.fileTipoSang)
        console.log(this.fileHCG)

    }


    uploadFile() {

        this.formDatas.append('file', this.fileAP[0], this.fileAPName);
        this.formDatas.append('file', this.fileCartaoVac[0], this.fileCartaoVacName);
        this.formDatas.append('file', this.fileTipoSang[0], this.fileTipoSangName);
        this.formDatas.append('file', this.fileHCG[0], this.fileHCGName);

        const token = localStorage.getItem('jwt')
        const Bearer = `Bearer ${token}`;
        this._http.post(`${this.baseUrl}/estagios/arquivos`, this.formDatas, {
            reportProgress: true, observe: 'events',
            headers: new HttpHeaders({

                "Authorization": Bearer
            })
        })
            .subscribe(event => {
                if (event.type === HttpEventType.UploadProgress)
                    this.progress = Math.round(100 * event.loaded / event.total);
                else if (event.type === HttpEventType.Response) {
                    this.message = 'Upload success.';
                    this.onUploadFinished.emit(event.body);
                }
            },
                (error) => { console.log(error) },
                () => {
                    console.log('finally')
                    this.dialogRef.close({ clicked: "Ok" });
                    // this.refresh()
                    //this.onUploadFinished.unsubscribe;
                    //files = null
                });
    }


    aprovar(doc: DocumentoAlunoDto) {

        // var param = { alunoId: aluno.id, docId: doc.docId, validado: true }

        // this._http.put(`${this.baseUrl}/estagios`, param, {

        // }).subscribe(resp => { },
        //     (error) => { console.log(error) },
        //     () => {

        //         var index1 = this.docsViewModel.findIndex(a => a.id == aluno.id)
        //         var index2 = this.docsViewModel[index1].documentos.findIndex(a => a.docId == doc.docId)
        //         this.docsViewModel[index1].documentos[index2].analisado = true
        //         this.docsViewModel[index1].documentos[index2].validado = true


        //     })


    }

    reprovar(doc: DocumentoAlunoDto) {


        // var param = { alunoId: aluno.id, docId: doc.docId, validado: false }
        // this._http.put(`${this.baseUrl}/estagios`, param, {

        // }).subscribe(resp => { },
        //     (error) => { console.log(error) },
        //     () => {

        //         var index1 = this.docsViewModel.findIndex(a => a.id == aluno.id)
        //         var index2 = this.docsViewModel[index1].documentos.findIndex(a => a.docId == doc.docId)
        //         this.docsViewModel[index1].documentos[index2].analisado = true
        //         this.docsViewModel[index1].documentos[index2].validado = false

        //     })
    }

    disabled(){

    }

    fileName = '';
    exportar(event, doc) {



        const file: File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();



            formData.append("file", file);
            console.log(formData);

            doc.salvando = true
            const upload$ = this._http.put(`${this.baseUrl}/pedag/doc/${doc.id}`, formData, {
                reportProgress: true, observe: 'events',

            })
                .subscribe(event => {
                    if (event.type === HttpEventType.UploadProgress)
                        this.progress = Math.round(100 * event.loaded / event.total);
                    else if (event.type === HttpEventType.Response) {
                        this.message = 'Upload success.';
                        this.onUploadFinished.emit(event.body);
                    }
                },
                    (error) => { console.log(error) },
                    () => {
                        console.log('finally')
                        // this.dialogRef.close({ clicked: "Ok" });
                        // this.refresh()
                        //this.onUploadFinished.unsubscribe;
                        //files = null
                        this.getInfoDocs(doc);
                    });

        }
    }

    baixar(doc) {


        var file = doc.nome;// "Modelo LEAD.xlsx";// this.createFileName("EXCEL");


        this.download(doc.id).subscribe(data => {

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

            },
            () => {

            }
        );

    }

    public download(docId: any): Observable<HttpEvent<Blob>> {
        return this._http.request(new HttpRequest(
            'GET', `${this.baseUrl}/pedag/doc/${docId}`, null, {
            reportProgress: true,
            responseType: 'blob'
        }));
    }

    exportarCert() {

        //..console.log(doc:Document)
        var file = "Certificado conclusão.pdf";// this.createFileName("EXCEL");
        // this.showSpinner = true;
        // this.testehabilitar = false

        this.downloadCert().subscribe(data => {
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

    

    public downloadCert(): Observable<HttpEvent<Blob>> {
        return this._http.request(new HttpRequest(
            'GET', `${this.baseUrl}/document/documentacao-aluno-certconclusao`, null, {
            reportProgress: true,
            responseType: 'blob'
        }));
    }


}