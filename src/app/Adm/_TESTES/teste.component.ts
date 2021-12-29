import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TesteModalComponent } from './ModalTeste/testemodal.component';
import { IServico } from './testeexterno';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SignalRService } from 'src/app/_shared/services/signalr.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



export class Testando {
  constructor(
    public cpf?: FormData,
    public compRes?: FormData
  ) {
    this.cpf = new FormData();
    this.compRes = new FormData();

  }
}

@Component({
  selector: 'teste-app',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TestesComponent implements OnInit {


  public nome = "Alvaro"
  public sobrenome = "Carlos"

  styles: { [key: string]: string } = {
    'border': '1px solid rgb(93, 93, 104)',
    'display': 'flex',
    'float': 'left',
    'align-items': 'center',
    'justify-content': 'center',
    'height': '20px',
    'width': '20px'
  }

  // styles: {[key: string]: string} = {
  //     'border': '1px solid rgb(93, 93, 104)',
  //     'font-size.pt': '10',
  //     'color': 90 > 180 ? 'red': 'black',
  //     'font-weight': 170 > 180 ? 'bold': 'normal',
  //     'text-decoration': 90 > 180 ? 'underline': 'none'
  //     }
  baseUrl = environment.baseUrl;
  calendarArray: number[] = new Array<number>(31)
  semanas: string[] = new Array<string>('D', 'S', 'T', 'Q', 'Q', 'S', 'S')
  public teste: Testando = new Testando();
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  public parentForm: FormGroup;
  public filhoUm: FormGroup;
  public filhoDois: FormGroup;
  public conteudo = "asd asd asd asd asd asdadsadadaadasdasda"
  public formDisabled: FormGroup;

  resume = new Resume();
  degrees = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];
  constructor(
    public signalRService: SignalRService, 
    @Inject('IServicoToken') public servico: IServico,
    private TesteModal: MatDialog,
    private http: HttpClient,
    private _fb: FormBuilder) {
    this.filhoUm = _fb.group({
      nome: [''],
      sobrenome: []
    })

    this.filhoDois = _fb.group({
      endereco: [''],
      bairro: ['']
    })

    this.parentForm = _fb.group({
      _filhosum: this.filhoUm,
      _filhodois: this.filhoDois
    })

    this.formDisabled = _fb.group({
      nome: [''],
      sobrenome: ['']
    })

    this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();
    if (!this.resume.experiences || this.resume.experiences.length === 0) {
      this.resume.experiences = [];
      this.resume.experiences.push(new Experience());
    }
    if (!this.resume.educations || this.resume.educations.length === 0) {
      this.resume.educations = [];
      this.resume.educations.push(new Education());
    }
    if (!this.resume.skills || this.resume.skills.length === 0) {
      this.resume.skills = [];
      this.resume.skills.push(new Skill());
    }

  }

  //   constructor(private _fb: FormBuilder) {
  //     this.moduloForm = _fb.group({
  //         descricao: ['', [Validators.required]],
  //         duracaoMeses: ['', [Validators.required]],
  //         preco: ['', [Validators.required]],
  //         materias: this._fb.array([], Validators.required)

  //     })
  // }

  // get materias() {
  //     return this.moduloForm.controls["materias"] as FormArray;
  // }

  // addMateria() {
  //     const lessonForm = this._fb.group({
  //         title: ['', Validators.required],
  //         level: ['beginner', Validators.required]
  //     });

  //     this.materias.push(lessonForm);
  // }

  // deleteLesson(lessonIndex: number) {
  //     this.materias.removeAt(lessonIndex);
  // }


  @ViewChild('file') myFileInput;
  @ViewChild('file2') myFileInput2;
  
  ngOnInit() {
    this.valor = '05/10/2021'

    // this.signalRService.startConnection();
    // this.signalRService.addTransferChartDataListener();   
    // this.startHttpRequest();

  }

  private startHttpRequest = () => {
    this.http.get('https://localhost:5001/api/teste/hubtest')
      .subscribe(res => {
        console.log(res);
      })
  }

  public chartClicked = (event) => {
    console.log(event);
    this.signalRService.broadcastChartData();
  }
  // CHART

  public chartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public chartLabels: string[] = ['Real time data for the chart'];
  public chartType: string = 'bar';
  public chartLegend: boolean = true;
  public colors: any[] = [{ backgroundColor: '#5491DA' }, { backgroundColor: '#E74C3C' }, { backgroundColor: '#82E0AA' }, { backgroundColor: '#E5E7E9' }]




  verformdisable() {
    console.log(this.formDisabled.value)
  }
  setSobrenome() {
    this.formDisabled.get('sobrenome').setValue('Camargo')
  }

  setValueDisabled() {
    this.formDisabled.get('nome').setValue('Álvaro Carlos')
  }

  fileName = '';
  onFileSelected(event) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("file", file);

      const upload$ = this.http.post(`${this.baseUrl}/testando/upload-arqaluno`, formData, {
        reportProgress: true, observe: 'events',
        headers: new HttpHeaders({

          "Authorization": ""
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
            // this.dialogRef.close({ clicked: "Ok" });
            // this.refresh()
            //this.onUploadFinished.unsubscribe;
            //files = null
          });

    }
  }


  dataPicker = new Date(2023, 10, 5)
  valor: any
  dataTestando: Date;
  onFocusOutDateEvent(event: any) {
    var data;
    // console.log(this.dataTestando)
    //console.log(event.target.value);
    //console.log(event.target.value.length)
    if (event.target.value.length == 10) {
      var data = event.target.value.split('/')
      console.log(data)
      var dataForm: Date = new Date(parseInt(data[2]), parseInt(data[1]) - 1,
        parseInt(data[0]))
      //var dataForm: Date = new Date(data[1] + "/" + data[0] + "/" + data[2])
      //console.log(dataForm.toString())
      //console.log(dataForm.toString() == "Invalid Date")
      // let options = {
      //     year: '2-digit',
      //     month: '2-digit',
      //     day: '2-digit'
      // };
      // console.log(dataForm.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }))
      // this.dataTestando == dataForm
      // this.valor =  "10/10/2050"// this.dataTestando
      this.valor = dataForm.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })//dataForm.getDay
      //this.valor = dataForm//.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })//dataForm.getDay
    }

    // console.log(this.alunoForm.get('nascimento').value)
    // var dataForm: Date = new Date(this.alunoForm.get('nascimento').value)
    // //console.log(dataForm)
    // // console.log(dataForm.dia)
    // //var nascimento = new Date(parseInt(dataForm?.ano), parseInt(dataForm?.mes) - 1, parseInt(dataForm?.dia));
    // //console.log(nascimento)
    // let timeDiff = Math.abs(Date.now() - dataForm.getTime());
    // let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    // console.log(age)
    // if (age < 18 && age != NaN) {
    //     this.showTabMenorIdade = true
    //     this.showPerguntaRespFinanc = false
    //     this.showFormRespFinanc = false
    //     this.alunoForm.get('temRespFin').setValue(true)
    // } else if (age > 18 && age != NaN) {
    //     this.showTabMenorIdade = false
    //     this.showPerguntaRespFinanc = true
    //     if (this.checkedRespFinanc.sim == true) {
    //         this.showFormRespFinanc = false
    //     } else {
    //         this.showFormRespFinanc = true
    //     }
    // }
  }

  verificarForm() {

    console.log(this.parentForm.value)
  }

  enviarComDesativado() {
    //this.parentForm.get('_filhodois').disable()

    this.http.post(`${this.baseUrl}/testando/salvarform`, this.parentForm.value, {

    }).subscribe(resp => {

    }, () => { },
      () => { })
  }

  onFileChange(event) {
    this.myFileInput.nativeElement.value = '';
  }

  /*                                ADD FILE                   */

  filearray = new FormData();// = <File>files[0];
  datas = new FormData();
  datas2 = new FormData();
  compRes = new FormData();
  mData = JSON.stringify({ nome: "hello World" });
  addFile(file) {

    // let fileToUpload = <File>file[0];
    // const data = new FormData();

    // data.append('file', fileToUpload, fileToUpload.name);

    // this.filearray.push(data);
    // let urlPath = 'api/SampleActionMethod/AddModelData';
    //const 
    const formData = new FormData();
    this.datas.append('data', this.mData);
    //if (file) {
    let fileToUpload = <File>file[0];
    this.datas.append('file', fileToUpload, fileToUpload.name);
    //}
    //this.filearray.push(this.datas)
    // 2
    //let fileToUpload = <File>file[0];
    //const formData = new FormData();
    //this.cpf.append('cpf', fileToUpload, fileToUpload.name);
    this.myFileInput.nativeElement.value = '';
    //*/
  }

  addFile2(file) {


    let fileToUpload = <File>file[0];
    //const formData = new FormData();
    this.datas2.append('cpf', fileToUpload, fileToUpload.name);
    //let fileToUpload = <File>files[0];
    this.filearray.forEach(element => {


    });
    console.log(this.filearray)///.push()
    this.myFileInput2.nativeElement.value = '';
  }

  sendFiles() {

    //const credentials = JSON.stringify({ cpf: this.cpf, compRes: this.compRes });

    this.http.post(`${this.baseUrl}/comercial/teste`, this.filearray, {

      reportProgress: true, observe: 'events',

    })
      .subscribe(event => {
        // if (event.type === HttpEventType.UploadProgress)
        //     this.progress = Math.round(100 * event.loaded / event.total);
        // else if (event.type === HttpEventType.Response) {
        //     this.message = 'Upload success.';
        //     this.onUploadFinished.emit(event.body);
        // }
      },
        (error) => { console.log(error) },
        () => {
          // console.log('finally')
          //this.dialogRef.close({ clicked: "Ok" });
          // this.refresh()
          //this.onUploadFinished.unsubscribe;
          //files = null
          // envio.unsubscribe
          // this.myFileInput.nativeElement.value = '';
        });
  }

  /*                               TESTE UPLOAD FILE                        */
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  uploadFile(files) {

    console.log(files)
    if (files.length === 0) {

      return;
    }
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('jwt'));

    //console.log(this.decodedToken)
    //console.log(this.decodedToken['email'])
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    console.log(formData)

    this.http.post(`${this.baseUrl}/comercial/?userEmail=${this.decodedToken['email']}`, formData, {

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
          //this.dialogRef.close({ clicked: "Ok" });
          // this.refresh()
          //this.onUploadFinished.unsubscribe;
          //files = null
          // envio.unsubscribe
          this.myFileInput.nativeElement.value = '';
        });
  }

  /*                               TESTE MODAL                        */

  openExportModal(): void {
    const dialogRef = this.TesteModal
      .open(TesteModalComponent, {
        height: 'auto',
        width: '400px',

        data: { colaborador: 'hello' },
        hasBackdrop: true,
        disableClose: true
      });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  /// save file




  arquivos: any[];
  formDatas = new FormData();
  fileCPF: File[] = []
  fileRG: File[] = []
  apendFile1(file) {
    this.fileCPF = new Array<File>()
    let fileToUpload = <File>file[0];
    console.log(file)
    console.log(fileToUpload)
    //this.arquivos.push(fil)
    //const formData = new FormData();
    this.fileCPF.push(fileToUpload)
    //this.formDatas.append('file', fileToUpload, 'cpf');
    console.log(this.formDatas)

  }

  apendFile2(file) {
    this.fileRG = new Array<File>()
    let fileToUpload = <File>file[0];
    console.log(fileToUpload)
    //this.arquivos.push(fil)
    //const formData = new FormData();
    this.fileRG.push(fileToUpload)
    //this.formDatas.append('file', fileToUpload, 'rg');
    console.log(this.formDatas)


  }

  removerCPF() {
    this.fileCPF = new Array<File>()

  }


  removerRG() {
    this.fileRG = new Array<File>()
  }

  verificar() {

    console.log(this.fileCPF)
    console.log(this.fileRG)

    console.log(this.fileCPF.length)
    console.log(this.fileRG.length)

  }



  uploadFile2() {

    console.log(this.fileCPF)
    console.log(this.fileRG)
    this.formDatas.append('file', this.fileCPF[0], 'CPF');
    this.formDatas.append('file', this.fileRG[0], 'rg');

    var objeto = { nome: 'fulano de tal', cpf: '12345678912', email: 'fulano@gmail.com' }
    // this.formDatas.append('file',objeto);


    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('jwt'));


    // let fileToUpload = <File>files[0];
    // console.log(fileToUpload)
    // const formData = new FormData();
    // console.log(formData)
    // formData.append('file', fileToUpload, fileToUpload.name);
    // console.log(formData)
    //this.http.post(`${this.baseUrl}/comercial/?userEmail=${this.decodedToken['email']}`, formData, {
    this.http.post(`${this.baseUrl}/estagios/arquivos`, this.formDatas, {
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
          //this.dialogRef.close({ clicked: "Ok" });
          // this.refresh()
          //this.onUploadFinished.unsubscribe;
          //files = null
        });
  }

  exportExcel() {

    var file = "Modelo LEAD.xlsx";// this.createFileName("EXCEL");
    // this.showSpinner = true;
    // this.testehabilitar = false

    this.download().subscribe(data => {
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

  testeBlob: BlobTeste = new BlobTeste();
  blobTeste: BlobTeste[] = new Array<BlobTeste>();
  getTeste() {
    //this.http.get(`${this.baseUrl}/estagios/file/?alunoid=1002&docid=27`,{
    this.http.get(`${this.baseUrl}/estagios/documentos`, {
      // responseType: 'blob'
    })
      .subscribe(
        response => {
          //this.testeBlob.Blob = response['Blob']

          this.blobTeste = Object.assign([], response)
          console.log(this.blobTeste)
          let data = this.blobTeste[0].documentos[0].dataFile
          //let data2 = data.documentos
          this.imagem = new Blob([data], {
            type: 'image/jpeg'
          });
        }, (error) => { console.log(error) },
        () => { }
      )
  }

  public download(): Observable<HttpEvent<Blob>> {
    return this.http.request(new HttpRequest(
      'GET', `${this.baseUrl}/download`, null, {
      reportProgress: true,
      responseType: 'blob'
    }));
  }

  data: string;

  imagem: any

  getImage() {
    this.getData(`${this.baseUrl}/estagios/file/?alunoid=1002&docid=27`)
      .subscribe(
        imgData => this.data = imgData,
        err => console.log(err)
      );
  }

  getData(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        switchMap(response => this.readFile(response))
      );
  }

  private readFile(blob: Blob): Observable<string> {
    return Observable.create(obs => {
      const reader = new FileReader();

      reader.onerror = err => obs.error(err);
      reader.onabort = err => obs.error(err);
      reader.onload = () => obs.next(reader.result);
      reader.onloadend = () => obs.complete();
      //this.imagem = reader.readAsDataURL(blob);
      //console.log(this.imagem)
      return reader.readAsDataURL(blob);
    });
  }

  downloadContrato() {
    var file = "Contrato.pdf";// this.createFileName("EXCEL");
    // this.showSpinner = true;
    // this.testehabilitar = false

    this.download2().subscribe(data => {
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
          window.open(a.href, '_blank');
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

  download2(): Observable<HttpEvent<Blob>> {
    return this.http.request(new HttpRequest(
      'GET', `${this.baseUrl}/document/pdf`, null, {
      reportProgress: true,
      responseType: 'blob'
    }));
  }

  get capturar() {
    try {
      return this.servico.pegar()
    } catch {
      return "deu erro"
    }
    //return this.servico.pegar()
  }


  addExperience() {
    this.resume.experiences.push(new Experience());
  }
  addEducation() {
    this.resume.educations.push(new Education());
  }


  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    console.log(documentDefinition)
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }
  resetForm() {
    this.resume = new Resume();
  }
  getDocumentDefinition() {
    sessionStorage.setItem('resume', JSON.stringify(this.resume));
    return {
      content: [
        {
          text: 'RESUME',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: this.resume.name,
              style: 'name'
            },
            {
              text: this.resume.address
            },
            {
              text: 'Email : ' + this.resume.email,
            },
            {
              text: 'Contant No : ' + this.resume.contactNo,
            },
            {
              text: 'GitHub: ' + this.resume.socialProfile,
              link: this.resume.socialProfile,
              color: 'blue',
            }
            ],
            [
              this.getProfilePicObject()
            ]
          ]
        },
        {
          text: 'Skills',
          style: 'header'
        },
        {
          columns: [
            {
              ul: [
                ...this.resume.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
              ]
            },
            {
              ul: [
                ...this.resume.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
              ]
            },
            {
              ul: [
                ...this.resume.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
              ]
            }
          ]
        },
        {
          text: 'Experience',
          style: 'header'
        },
        this.getExperienceObject(this.resume.experiences),
        {
          text: 'Education',
          style: 'header'
        },
        this.getEducationObject(this.resume.educations),
        {
          text: 'Other Details',
          style: 'header'
        },
        {
          text: this.resume.otherDetails
        },
        {
          text: 'Signature',
          style: 'sign'
        },
        {
          columns: [
            { qr: this.resume.name + ', Contact No : ' + this.resume.contactNo, fit: 100 },
            {
              text: `(${this.resume.name})`,
              alignment: 'right',
            }
          ]
        }
      ],
      info: {
        title: this.resume.name + '_RESUME',
        author: this.resume.name,
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 16,
          bold: true
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
        }
      }
    };
  }
  getExperienceObject(experiences: Experience[]) {
    const exs = [];
    experiences.forEach(experience => {
      exs.push(
        [{
          columns: [
            [{
              text: experience.jobTitle,
              style: 'jobTitle'
            },
            {
              text: experience.employer,
            },
            {
              text: experience.jobDescription,
            }],
            {
              text: 'Experience : ' + experience.experience + ' Months',
              alignment: 'right'
            }
          ]
        }]
      );
    });
    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }
  getEducationObject(educations: Education[]) {
    return {
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{
            text: 'Degree',
            style: 'tableHeader'
          },
          {
            text: 'College',
            style: 'tableHeader'
          },
          {
            text: 'Passing Year',
            style: 'tableHeader'
          },
          {
            text: 'Result',
            style: 'tableHeader'
          },
          ],
          ...educations.map(ed => {
            return [ed.degree, ed.college, ed.passingYear, ed.percentage];
          })
        ]
      }
    };
  }
  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic,
        width: 75,
        alignment: 'right'
      };
    }
    return null;
  }
  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }
  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
  addSkill() {
    this.resume.skills.push(new Skill());
  }




  uploadFileEXCEL(files) {

    console.log(files)
    if (files.length === 0) {

      return;
    }
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('jwt'));

    console.log(this.decodedToken)
    console.log(this.decodedToken['email'])
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(`${this.baseUrl}/testando/salvar-alunos`, formData, {

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
        });
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],

  };

}

export class BlobTeste {
  constructor(
    public nome?: string,
    public documentos?: BlobTeste2[]
  ) { }
}

export class BlobTeste2 {
  constructor(
    public docId?: number,
    public alunoId?: number,
    public descricao?: string,
    public nome?: string,
    public analisado?: boolean,
    public validado?: boolean,
    public tipoArquivo?: string,
    public contentArquivo?: string,
    public dataCriacao?: Date,
    public dataFile?: Blob
  ) {
    this.dataFile = new Blob();
  }

  createBlob(data) {
    var blob = new Blob([data], {
      type: 'image/jpeg'
    });

    console.log('createblob')
    return blob
  }



}


export class Resume {
  profilePic: string;
  name: string;
  address: string;
  contactNo: number;
  email: string;
  socialProfile: string;
  experiences: Experience[] = [];
  educations: Education[] = [];
  otherDetails: string;
  skills: Skill[] = [];
  constructor() {
    this.experiences.push(new Experience());
    this.educations.push(new Education());
    this.skills.push(new Skill());
  }
}
export class Experience {
  employer: string;
  jobTitle: string;
  jobDescription: string;
  startDate: string;
  experience: number;
}
export class Education {
  degree: string;
  college: string;
  passingYear: string;
  percentage: number;
}
export class Skill {
  value: string;
}
