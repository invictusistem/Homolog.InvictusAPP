import { Component, Inject, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { GenericTask } from 'src/app/shared/models/generictask.model';
import { Output, EventEmitter } from '@angular/core';
//import { AdmService } from '../../adm.service';
import { PageEvent } from '@angular/material/paginator';
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { NgForm } from "@angular/forms";
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { environment } from "src/environments/environment";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { Turma } from "src/app/_shared/models/Turma.model";
import { Sala } from "src/app/Adm/Adm-Models/sala.model";
//import { TemplateTasks } from 'src/app/shared/models/templateTasks.model';

@Component({
    selector: 'pedagrelatoriomodal',
    templateUrl: './pedagrelatorio.component.html'
    //styleUrls: ['./pedagrelatorio.component.scss']
})

export class PedagRelatorioComponent implements OnInit {

    // pageSize: number = 5;
    // genericTasks: GenericTask[] = new Array<GenericTask>();
    // length: number;



    // pageEvent: PageEvent;
    baseUrl = environment.baseUrl;

    editedColaborador: Colaborador = new Colaborador();
    originalColaborador: Colaborador = new Colaborador();
    unidades = Unidades;
    showMensagem = false
    mensagem = ''
    cpf = ''

    public cepReturn: CepReturn = new CepReturn();
    cargos = Cargos;
    ativo = true;
    constructor(
        private _snackBar: MatSnackBar,
        private http: HttpClient,
    ) { }


    //@Output() newItemEvent = new EventEmitter<string>();


    ngOnInit() {
        this.ativo = true;
        //console.log(this.data['colaborador'])
        // Object.assign(this.editedColaborador, this.data['colaborador'])
        // this.cpf =  this.onInputChange(this.editedColaborador.cpf)
        // console.log("on init")
        //this.getTasks(1, this.pageSize);
    }



    submitForm(form: NgForm) {
        console.log(form.value)
        console.log(this.editedColaborador)
        if (form.valid) {
            console.log('form valid')
            /// const novoColaborador = JSON.stringify(form.value);
            this.edit(JSON.stringify(this.editedColaborador))
            // this.model.saveProduct(this.product);
            // //this.product = new Product();
            // //form.reset();
            // this.originalProduct = this.product;
            // this.router.navigateByUrl("/");
        }
    }

    relatorioSelected(relatorio: any) {
        this.http.get(`${this.baseUrl}document/relatorios-pedagogico`)
            .subscribe(resp => {

            }, (error) => { console.log(error) })
    }

    edit(form: any) {
        //const novoColaborador = JSON.stringify(form.value);
        console.log(form)

        //this.redi(["./adm/colaboradores"]);
        this.http.put(`${this.baseUrl}/colaboradores`, form, {
            //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {

            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bear "
            })
        }).subscribe(response => {

            console.log(response)



        }, err => { console.log(err) },
            () => {
                this.openSnackBar()
                // this.dialogRef.close();

            });
    }

    openSnackBar() {
        this._snackBar.open('Colaborador editado com sucesso.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'green-snackbar',
            duration: 3 * 1000,
        });
    }

    isEqual = true
    get formIsValid() {

        if (JSON.stringify(this.editedColaborador) === JSON.stringify(this.originalColaborador)) {
            this.isEqual = true
        } else {
            this.isEqual = false
        }
        return this.isEqual
    }


    consultaCEP(CEP: string) {
        //console.log(CEP);

        this.http.get(`https://viacep.com.br/ws/${CEP}/json/`)
            .subscribe(response => {

                console.log("success")
                this.cepReturn = new CepReturn(
                    response["logradouro"],
                    response["bairro"],
                    response["localidade"],
                    response["uf"]);
                console.log(this.cepReturn)

                this.editedColaborador.logradouro = this.cepReturn.logradouro;
                this.editedColaborador.bairro = this.cepReturn.bairro
                this.editedColaborador.cidade = this.cepReturn.localidade
                this.editedColaborador.uf = this.cepReturn.uf

                // this.colaboradorForm.get('logradouro').setValue(response["logradouro"]);
                // this.colaboradorForm.get('bairro').setValue(response["bairro"]);
                // this.colaboradorForm.get('cidade').setValue(response["localidade"]);
                // this.colaboradorForm.get('uf').setValue(response["uf"]);
                //this.bairro = this.cepReturn.bairro
                // const token = (<any>response).accessToken;
                // console.log(response)
                // localStorage.setItem("jwt", token);
                // this.invalidLogin = false;
                // this.router.navigate(["/main"]);
            }, err => { console.log("erros") },
                () => { console.log('finaly') });
    }

    //calendarios

    //showlivroDois = false
    turmasA: Turma[] = new Array<Turma>()
    salas: Sala[] = new Array<Sala>();
    profs: Colaborador[] = new Array<Colaborador>();
    paramSelected: string;
    tur = false
    sal = false
    pro = false
    getParam(param: string) {
        this.tur = false
        this.sal = false
        this.pro = false
        this.paramSelected = param;
        this.http.get(`${this.baseUrl}/relatorios/calendario-busca/?parametro=${param}`)
            .subscribe(resp => {
                if (param == "turma") {
                    this.turmasA = Object.assign([], resp)
                    this.tur = true
                    this.sal = false
                    this.pro = false
                    console.log(resp)
                }
                if (param == "sala") {
                    this.salas = Object.assign([], resp)
                    this.tur = false
                    this.sal = true
                    this.pro = false
                    console.log(resp)
                }
                if (param == "prof") {
                    this.profs = Object.assign([], resp)
                    this.tur = false
                    this.sal = false
                    this.pro = true
                    console.log(resp)
                }
            }, (error) => { console.log(error) 
                this.tur = false
                this.sal = false
                this.pro = false
            },
                () => {
                   // this.showlivroDois = true
                })
    }

    getCalendario(id: number) {

        var file = `Calendario.xlsx`;

        let url = `${this.baseUrl}/relatorios/calendario-relatorio/?parametro=${this.paramSelected}&id=${id}`
        
        this.download(id, url).subscribe(data => {

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
                this.showlivroDois = false
            }
        );

    }

    /// LIVRO MATRICULAS
    showlivroDois = false
    turmas: Turma[] = new Array<Turma>()
    getTurmas() {

        this.http.get(`${this.baseUrl}/relatorios/livro-mat-turma-busca`)
            .subscribe(resp => {
                this.turmas = Object.assign([], resp)
            }, (error) => { console.log(error) },
                () => {
                    this.showlivroDois = true
                })
    }



    exportarCert(turmaId: number) {


        var file = `Matricula.xlsx`;

        let url = `${this.baseUrl}/relatorios/livro-mat-turma/${turmaId}`
        this.download(turmaId, url).subscribe(data => {

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
                this.showlivroDois = false
            }
        );
    }

    public download(turmaId: any, url?: string): Observable<HttpEvent<Blob>> {
        return this.http.request(new HttpRequest(
            'GET',
            `${url}`,
            null,
            {
                reportProgress: true,
                responseType: 'blob'
            }));
    }


    buscarTurmas() {

    }

}