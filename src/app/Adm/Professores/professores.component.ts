import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { Cargos, Unidades } from "src/app/_shared/models/perfil.model";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { environment } from "src/environments/environment";
import { CreateProfessorComponent } from "./CreateModal/createprofessor.component";
import { EditProfessorComponent } from "./EditModal/editprofessor.component";
// import { CreateUserComponent } from "./CreateModal/createuser.component";
// import { EditUserComponent } from "./EditModal/edituser.component";

@Component({
    selector: "professores-app",
    templateUrl: './professores.component.html',
    styleUrls: ['./professores.component.scss'],
    animations: [HighlightTrigger]
})

export class ProfessoresComponent {

    // paginated
    pageIndexNumber: number = 0;
    actualPage = 1
    paginationInfo: IPager;
    pageSize: number = 5;
    pageEvent: PageEvent;
    length: number = 0
    public totalPages: number = 0
    


    professores: any[] = new Array<any>();//Colaborador[] = new Array<Colaborador>();
    baseUrl = environment.baseUrl;




    formSubmitted: boolean = false;
    showTable: boolean = false;
    showSpinner = false
    showSpinnerFirst = false

    incluirInativos = false

    showMessage: boolean = false;
    cargos = Cargos;
    unidades = Unidades
    showMessageNoColaborador = false
    mensagem: string = "";

    public tokenInfo: TokenInfos = new TokenInfos();
    private jwtHelper = new JwtHelperService();

    public pesquisarForm: FormGroup
    //pagination


    constructor(
        private elementRef: ElementRef,
        private http: HttpClient,
        private _fb: FormBuilder,
        private CreateColaboradoresModal: MatDialog,
        private EditColaboradoresModal: MatDialog) {
        this.pesquisarForm = _fb.group({
            nome: ['', [Validators.required]],
            email: ['', [Validators.required]],
            cpf: ['', [Validators.required]],
            ativo: [false]
        });

        this.pesquisarForm.valueChanges.subscribe(
            (form: any) => {
                // console.log('form changed to:', form);
                if (this.pesquisarForm.get('nome').value == '' &&
                    this.pesquisarForm.get('email').value == '' &&
                    this.pesquisarForm.get('cpf').value == '') {
                    //  console.log('false valid')

                    this.pesquisarForm.controls['nome'].setErrors({ required: true });
                    this.pesquisarForm.controls['email'].setErrors({ required: true });
                    this.pesquisarForm.controls['cpf'].setErrors({ required: true });
                    // this.pesquisarForm.setErrors({required: true});
                } else {
                    //   console.log('true valid')
                    this.pesquisarForm.controls['nome'].setErrors(null);

                    this.pesquisarForm.controls['email'].setErrors(null)

                    this.pesquisarForm.controls['cpf'].setErrors(null);

                    //this.pesquisarForm.setErrors({required: false});


                }
            }
        );
    }




    ngOnInit() {
        // console.log('init colaboradores 123')
        const token = localStorage.getItem('jwt')
    }

    pageIndex = 0
    get page() {
        return console.log('page')
    }

    onSubmit(form?: any, event?: any) {
        this.showMessageNoColaborador = false
        var formJson = JSON.stringify(this.pesquisarForm.value)
        this.showSpinner = true
        if (this.pesquisarForm.valid) {
            this.http.get(`${this.baseUrl}/professor/pesquisar/?itemsPerPage=` + this.pageSize + `&currentPage=1&paramsJson=${formJson}`)
                .subscribe(
                    (response) => {

                        this.professores = Object.assign([], response['data']);

                        this.length = response['totalItemsInDatabase']
                        this.totalPages = Math.ceil(this.length / this.pageSize)
                        console.log(this.totalPages)
                        if (this.professores.length == 0) {
                            // console.log("lengt zero")
                            this.mensagem = "Sua pesquisa não encontrou nenhum registro correspondente"
                            this.showMessageNoColaborador = true
                        }
                        // this.applyFiler()
                    },
                    (err) => {
                        this.showSpinnerFirst = false
                        this.showSpinner = false
                        // console.log(err)
                        //this.openSnackBar(err)

                    },
                    () => {
                        this.showMessageNoColaborador = false
                        this.showSpinnerFirst = false
                        this.showSpinner = false
                        //  console.log('ok get');

                        //this.pageIndexNumber = (evento.pageIndex * this.pageSize)
                    },
                )
        }

    }

    changePage(event?: any, element?: any) {
        console.log(event)
        //console.log(element.target)

        this.showSpinner = true
        this.showMessageNoColaborador = false
        var formJson = JSON.stringify(this.pesquisarForm.value)
        var currentPage = event.pageIndex + 1
        if (this.pesquisarForm.valid) {
            this.http.get(`${this.baseUrl}/colaboradores/pesquisar/?itemsPerPage=${this.pageSize}&currentPage=${currentPage}&paramsJson=${formJson}`)
                .subscribe(
                    (response) => {

                        this.professores = Object.assign([], response['data']);

                        this.length = response['totalItemsInDatabase']

                        if (this.professores.length == 0) {
                            // console.log("lengt zero")
                            this.mensagem = "Sua pesquisa não encontrou nenhum registro correspondente"
                            this.showMessageNoColaborador = true
                        }
                        // this.applyFiler()
                    },
                    (err) => {
                        this.showSpinnerFirst = false
                        this.showSpinner = false
                        // console.log(err)
                        //this.openSnackBar(err)

                    },
                    () => {
                        this.showMessageNoColaborador = false
                        this.showSpinnerFirst = false
                        this.showSpinner = false
                        //  console.log('ok get');
                        this.pageIndexNumber = (event.pageIndex * this.pageSize)
                        //this.pageIndexNumber = (evento.pageIndex * this.pageSize)
                    },
                )
        }

    }


    getColaboradores(actualPage: number, pageSize: number) {

        var itemsPerPage = pageSize;
        var currentPage = actualPage;

        this.http.get(`${this.baseUrl}/colaboradores/?itemsPerPage=` + itemsPerPage + `&currentPage=` + currentPage, {
            //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {

            // headers: new HttpHeaders({
            //     "Content-Type": "application/json",
            //     "Authorization": "Bear "
            // })
        }).subscribe(response => {

            console.log(response)
            this.professores = Object.assign([], response['data'])
            this.length = response['totalItemsInDatabase']
            console.log(this.length)
            console.log(this.professores)
            // this.dialogRef.close();
        }, err => { console.log(err) },
            () => { });

    }


    params: Parametros = new Parametros()

    // pesquisar(nome: string, cargo: string, unidade: string) {

    //     console.log(nome + " " + cargo + " " + unidade)
    //     if (nome == "" || nome == undefined) nome = ""
    //     if (cargo == "" || cargo == undefined) cargo = ""
    //     if (unidade == "" || unidade == undefined) unidade = ""

    //     if ((nome == "" || nome == undefined) &&
    //         (cargo == "" || cargo == undefined) &&
    //         (unidade == "" || unidade == undefined)) {
    //         console.log("retorno")
    //         return;
    //     }
    //     this.showMessageNoColaborador = false
    //     this.mensagem = ""

    //     let query = { nome: nome, cargo: cargo, unidade: unidade }
    //     this.params.nome = nome
    //     this.params.email = cargo
    //     this.params.cpf = unidade
    //     //console.log(params)
    //     //var itemsPerPage = 5;
    //     //this.actualPage
    //     //var currentPage = 1;
    //     this.showSpinnerFirst = true
    //     this.professores = new Array<Colaborador>();
    //     let paramsJson = JSON.stringify(this.params)
    //     console.log(query)

    //     this.http.post(`${this.baseUrl}/colaboradores/pesquisar/?itemsPerPage=` + this.pageSize + `&currentPage=1`, paramsJson, {
    //         headers: new HttpHeaders({
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${localStorage.getItem('jwt')}`
    //         })
    //     }).subscribe(
    //         (response) => {
    //             console.log(response)
    //             this.professores = Object.assign([], response['data']);
    //             //  this.length = tasks['data'].length;
    //             this.length = response['totalItemsInDatabase']
    //             // if (this.length == 0) {
    //             //     this.showMessageNoColaborador = true
    //             //     this.mensagem = "Registro não localizado."
    //             // }
    //             // else
    //             if (this.professores.length == 0) {
    //                 console.log("lengt zero")
    //                 this.mensagem = "Sua pesquisa não encontrou nenhum registro correspondente"
    //                 this.showMessageNoColaborador = true
    //             }
    //             // this.applyFiler()
    //         },
    //         (err) => {
    //             this.showSpinnerFirst = false
    //             console.log(err)
    //             //this.openSnackBar(err)

    //         },
    //         () => {
    //             this.showSpinnerFirst = false
    //             console.log('ok get');

    //             //this.pageIndexNumber = (evento.pageIndex * this.pageSize)
    //         },
    //     )

    // }



    paginationChange(pageEvt: PageEvent) {
        console.log(pageEvt)

    }

    openCreateUserModal(): void {
        const dialogRef = this.CreateColaboradoresModal
            .open(CreateProfessorComponent, {
                minHeight: '420px',
                width: '680px',

                //data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                // Reset form here
                console.log('afte close ok')
                this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }

    openEditUserModal(item: Colaborador): void {
        const dialogRef = this.EditColaboradoresModal
            .open(EditProfessorComponent, {
                height: '520px',
                width: '680px',

                data: { colaborador: item },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe(result => {

        });
    }

    deleteColaborador(id: number) {

        this.http.delete(`${this.baseUrl}/colaboradores/${id}`, {
            //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {

            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bear "
            })
        }).subscribe(response => {

            console.log(response)

        }, err => { console.log(err) },
            () => {
                // TODO mudar status e perfil acesso
            });

    }

}


export interface IPager {
    itemsPerPage?: number;
    totalItemsInDatabase?: number;
    currentPage?: number;
    totalPages?: number;
    items?: number;
}

export class Parametros {
    constructor(
        public nome?: string,
        public email?: string,
        public cpf?: string) { }
}