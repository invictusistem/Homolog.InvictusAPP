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

@Component({
    selector: 'infosmodal',
    templateUrl: './infos.component.html',
    styleUrls: ['./infos.component.scss'],
    animations: [HighlightTrigger]
})

export class InfosComponent implements OnInit {

    baseUrl = environment.baseUrl;
    tabs = ['Cadastro', 'Responsável Financeiro', 'Responsável (menor)'
       /* , 'Financeiro'*/, 'Documentação', 'Certificados'];
    infoSpinner: SpinnerParams = {
        diameter: 150,
        marginleft: 21,
        margintop: 12
    }
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
    public documentos:any

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
        private _service: PedagService,
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



        // this.respFinancForm = _fb.group({
        //     id: [''],
        //     nome: ['', [Validators.required, Validators.minLength(2)]],
        //     cpf: ['', [Validators.required, Validators.minLength(11)]],
        //     rg: ['', [Validators.required, Validators.minLength(9)]],
        //     nascimento: ['', [Validators.required]],
        //     parentesco: ['', [Validators.required]],
        //     naturalidade: ['', [Validators.required]],
        //     naturalidadeUF: ['', [Validators.required]],
        //     email: ['', [Validators.required, Validators.minLength(5)]],
        //     telCelular: [null, [Validators.minLength(0)]],
        //     telWhatsapp: [null, [Validators.minLength(10)]],
        //     telResidencial: [null, [Validators.minLength(9)]],
        //     cep: ['', [Validators.required, Validators.minLength(8)]],
        //     logradouro: ['', [Validators.required, Validators.minLength(1)]],
        //     complemento: [''],
        //     cidade: ['', [Validators.required, Validators.minLength(1)]],
        //     uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        //     bairro: ['', [Validators.required, Validators.minLength(1)]],
        //     observacoes: ['', [Validators.minLength(1), Validators.maxLength(300)]],
        //     TipoResponsavel: ['', [Validators.minLength(1), Validators.maxLength(300)]],
        // })

        // this.respMenorForm = _fb.group({
        //     id: [''],
        //     nome: ['', [Validators.required, Validators.minLength(2)]],
        //     cpf: ['', [Validators.required, Validators.minLength(11)]],
        //     rg: ['', [Validators.required, Validators.minLength(9)]],
        //     nascimento: ['', [Validators.required]],
        //     parentesco: ['', [Validators.required]],
        //     naturalidade: ['', [Validators.required]],
        //     naturalidadeUF: ['', [Validators.required]],
        //     email: ['', [Validators.required, Validators.minLength(5)]],
        //     telCelular: [null, [Validators.minLength(0)]],
        //     telWhatsapp: [null, [Validators.minLength(10)]],
        //     telResidencial: [null, [Validators.minLength(9)]],
        //     cep: ['', [Validators.required, Validators.minLength(8)]],
        //     logradouro: ['', [Validators.required, Validators.minLength(1)]],
        //     complemento: [''],
        //     cidade: ['', [Validators.required, Validators.minLength(1)]],
        //     uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        //     bairro: ['', [Validators.required, Validators.minLength(1)]],
        //     observacoes: ['', [Validators.minLength(1), Validators.maxLength(300)]],
        //     TipoResponsavel: ['', [Validators.minLength(1), Validators.maxLength(300)]],
        // })


        //this.alunoForm.get('logradouro').disable()
        //this.alunoForm.get('cidade').disable()
        //this.alunoForm.get('uf').disable()

    }

    ngOnInit() {

        // this.nome = this.data['aluno']
        console.log(this.data['aluno'])
        this.anotacaoForm.get('matriculaId').setValue(this.data['aluno'].matriculaId)
        // this.getInfoAlunos(this.data['aluno'].id)
        // const token = localStorage.getItem('jwt')
        // this.tokenInfo = this.jwtHelper.decodeToken(token)
        // this.getInfoDocs(this.data['aluno'].id);
        // this.getInfoFinancAlunos(this.data['aluno'].id)
        this.GetInformacoesMatricula(this.data['aluno'].matriculaId)
    }

    alunoInfo: any;
    respFin: any;
    respMenor: any;
    anotacoes: any[] = new Array<any>()
    GetInformacoesMatricula(matriculaId) {

        this._http.get(`${this.baseUrl}/pedag/aluno/${matriculaId}`)
            .subscribe(resp => {
                console.log(resp)
                this.turma = resp['turma'];
                this.alunoInfo = Object.assign({}, resp['aluno']);
                this.respFin = resp['respFin'];
                this.respMenor = resp['respMenor'];
                this.anotacoes = resp['anotacoes'];
                this.documentos = resp['docs'];


                console.log(this.respMenor)

            },
                (error) => { console.log(error) },
                () => {
                    this.showAluno = true
                    this.showtablePrinciple = true
                    console.log(this.turma)
                })

    }

    spinnerSave = false
    saveAluno(form: any) {
       
        if(form.valid){
            this.spinnerSave = true
            this._http.put(`${this.baseUrl}/alunos`,this.alunoInfo, {})
            .subscribe(response => {

            }, err => { console.log(err)
                this.spinnerSave = true
             },
                () => {
                    this.spinnerSave = false
                    this.GetAluno(this.alunoInfo.id);
                 });
        }
    }

    GetAluno(alunoId) {

        this._http.get(`${this.baseUrl}/alunos/cadastro/${alunoId}`)
            .subscribe(response => {
                this.alunoInfo = response["aluno"];

            }, err => { console.log(err) },
                () => { });

    }

    consultaCEP(CEP: string, item) {
        // console.log(CEP);

        this._http.get(`https://viacep.com.br/ws/${CEP}/json/`, {})
            .subscribe(response => {

                //  console.log(response)

                //  this.alunoInfo.logradouro = response["logradouro"];
                //  this.alunoInfo.bairro = response["bairro"];
                //  this.alunoInfo.cidade = response["localidade"];
                //  this.alunoInfo.uf = response["uf"];

                item.logradouro = response["logradouro"];
                item.bairro = response["bairro"];
                item.cidade = response["localidade"];
                item.uf = response["uf"];


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
                        this.ShowAnotSpinner = false
                    });



        }
    }

    ShowAnotSpinner = false
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
                // this.anotacaoForm.get('comentario').setValue(data.comentario)
                this.ShowAnotSpinner = true
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
                (error) => { console.log(error) },
                () => {
                    // this.showAluno = true
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
    getInfoDocs(alunoId) {

        this._http.get(`${this.baseUrl}/document/documentacao-aluno/${alunoId}`)
            .subscribe(resp => {
                //this.debitos = Object.assign({}, resp);
                this.documentoAluno = Object.assign([], resp['docs'])
                this.isMatriculado = resp['matriculado']
            },
                (error) => { console.log(error) },
                () => {
                    console.log(this.documentoAluno);
                })
    }

    getInfoAlunos(alunoId: number) {

        this._service.getAlunos(alunoId)
            .subscribe(response => {
                console.log(response)
                //Object.preventExtensions(this.aluno)
                //this.telCel = {area:21, exchange:9999, subscriber:5555 }
                //Object.assign(this.aluno, response)
                // this.aluno = response as Aluno
                //this.aluno

                console.log(response)
                console.log(response['responsaveis'].length)

                if (response['responsaveis'].length > 0) {
                    response['responsaveis'].forEach(element => {

                        if (element.tipoResponsavel == 0) {
                            this.respFinId = element.id
                            //this.originalRespFin = element

                            Object.keys(element).forEach((key) => {
                                Object.keys(this.respFinancForm.value).forEach((key1) => {
                                    if (key.toString() == key1.toString()) {
                                        this.respFinancForm.get(key1).setValue(element[key])
                                        //this.aluno[key1] = response[key]
                                    }
                                })
                            })

                            this.originalRespFin = this.respFinancForm.value

                            this.showRespFinanc = true
                        }

                        if (element.tipoResponsavel == 1) {
                            this.respMenorId = element.id

                            Object.keys(element).forEach((key) => {
                                Object.keys(this.respMenorForm.value).forEach((key1) => {
                                    if (key.toString() == key1.toString()) {
                                        this.respMenorForm.get(key1).setValue(element[key])
                                        //this.aluno[key1] = response[key]
                                    }
                                })
                            })

                            this.originalRespMenor = this.respMenorForm.value

                            this.showRespMenor = true
                        }

                    });
                }

                // Object.keys(this.alunoForm.value).forEach((key) => {

                //     console.log(this.alunoForm[key])
                // })

                // Object.keys(response).forEach((key) => {
                //     Object.keys(this.aluno).forEach((key1) => {
                //         if (key.toString() == key1.toString()) {
                //             this.aluno[key1] = response[key]
                //         }
                //     })
                // })

                Object.keys(response).forEach((key) => {
                    Object.keys(this.alunoForm.value).forEach((key1) => {
                        if (key.toString() == key1.toString()) {
                            this.alunoForm.get(key1).setValue(response[key])
                            //this.aluno[key1] = response[key]
                        }
                    })
                })

            },
                (error) => { console.log(error) },
                () => {
                    console.log(this.aluno)
                    //this.alunoForm.setValue(this.aluno)
                    // this.showRespFinanc = this.aluno.temRespFin
                    this.originalAluno = this.alunoForm.value
                    //this.settelcel(this.aluno.telCelular)
                    //this.alunoForm.get('cpf').disable()
                    // this.alunoForm.get('logradouro').disable()
                    // this.alunoForm.get('cidade').disable()
                    // this.alunoForm.get('uf').disable()
                    this.respFinancForm.disable()
                    this.respMenorForm.disable()
                    this.localidade = this.alunoForm.get('cidade').value
                    this.uf = this.alunoForm.get('uf').value
                    this.showAluno = true
                    //console.log(this.alunoForm.value)
                    //console.log(JSON.stringify(this.alunoForm.value))
                    //console.log(JSON.stringify(this.aluno))

                    //console.log(JSON.stringify(this.alunoForm.value) === JSON.stringify(this.aluno))
                    //console.log(JSON.stringify(this.alunoForm.value) === JSON.stringify(this.originalAluno))
                })
        // this._http.get(`${this.baseUrl}/adm/aluno/${alunoId}`, {

        // }).subscribe(response => {
        //     console.log(response)
        //     //this.telCel = {area:21, exchange:9999, subscriber:5555 }
        //     Object.assign(this.aluno, response as Aluno)
        //     //this.testando = Object.assign({}, response as Aluno)
        //     //this.aluno.telCelular = this.aluno.Maskx()
        // },
        // (error) => { console.log(error) },
        // () => { 
        //     console.log(this.aluno)
        //     this.alunoForm.setValue(this.aluno)
        //    // this.showRespFinanc = this.aluno.temRespFin

        //     //this.settelcel(this.aluno.telCelular)
        //     this.showAluno = true
        //     console.log(this.alunoForm.value)

        //     console.log(JSON.stringify(this.alunoForm.value) === JSON.stringify(this.testando))

        // })


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

    fileName = '';
    exportar(event, doc) {

        const file: File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();

            

            formData.append("file", file);
            console.log(formData);
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
                        this.getInfoDocs(this.data['aluno'].id);
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

    public download(docId: any): Observable<HttpEvent<Blob>> {
        return this._http.request(new HttpRequest(
            'GET', `${this.baseUrl}/pedag/doc/${docId}`, null, {
            reportProgress: true,
            responseType: 'blob'
        }));
    }

    public downloadCert(): Observable<HttpEvent<Blob>> {
        return this._http.request(new HttpRequest(
            'GET', `${this.baseUrl}/document/documentacao-aluno-certconclusao`, null, {
            reportProgress: true,
            responseType: 'blob'
        }));
    }


}