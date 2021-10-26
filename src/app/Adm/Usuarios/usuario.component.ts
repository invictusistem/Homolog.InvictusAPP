import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { environment } from "src/environments/environment";
import { Parametros } from "../Colaboradores/colaboradores.component";
import { CreateUserComponent } from "./CreateModal/createuser.component";
import { EditUserComponent } from "./EditModal/edituser.component";

@Component({
    selector: "usuario-app",
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss'],
    animations: [HighlightTrigger]
})

export class UsuarioComponent implements OnInit {

    testeDonne: string = 'done'
    private baseUrl = environment.baseUrl;
    pageSize: number = 5;
    length: number = 0
    pageIndexNumber: number = 0;
    usuarios: Colaborador[] = new Array<Colaborador>()
    private jwtHelper = new JwtHelperService();
    tokenInfo: TokenInfos = new TokenInfos();


    constructor(
        private http: HttpClient,
        private userCreateModal: MatDialog,
        private editCreateModal: MatDialog) { }
    ngOnInit() {
        //this.getUsers(1, this.pageSize)

        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
    }

    /*
        getUsers(actualPage: number, pageSize: number) {
    
            this.http.get(`${this.baseUrl}/colaboradores/users/?itemsPerPage=${pageSize}&currentPage=${actualPage}`, {
    
            }).subscribe(response => {
    
                console.log(response)
                Object.assign(this.usuarios, response['data'])
    
            },
                (error) => { console.log(error) },
                () => { })
    
        }
    */
    openCreateUserModal(): void {
        const dialogRef = this.userCreateModal
            .open(CreateUserComponent, {
                height: 'auto',
                width: '700px',

                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     // this.animal = result;
        // });

        dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
            // console.log(result);
            // console.log(this.templateTasks);
            //console.log(this.templateTasks);
            //this.newtasks. = this.templateTasks
            // this.templateTasks = result;
        });
    }

    openEditUserModal(item: Colaborador): void {
        const dialogRef = this.editCreateModal
            .open(EditUserComponent, {
                height: '300px',
                width: '600px',

                data: { colaborador: item },
                hasBackdrop: true,
                disableClose: true
            });
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     // this.animal = result;
        // });

        dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
            // console.log(result);
            // console.log(this.templateTasks);
            //console.log(this.templateTasks);
            //this.newtasks. = this.templateTasks
            // this.templateTasks = result;
        });
    }

    showMessageNoColaborador = false
    mensagem: string = "";
    params: Parametros = new Parametros()
    showSpinnerFirst = false

    pesquisar(nome: string, email: string, cpf: string) {

        console.log(nome + " " + email + " " + cpf)
        if (nome == "" || nome == undefined) nome = ""
        if (email == "" || email == undefined) email = ""
        if (cpf == "" || cpf == undefined) cpf = ""

        if ((nome == "" || nome == undefined) &&
            (email == "" || email == undefined) &&
            (cpf == "" || cpf == undefined)) {
            console.log("retorno")
            return;
        }
        this.showMessageNoColaborador = false
        this.mensagem = ""

        let query = { nome: nome, cargo: email, unidade: cpf }
        this.params.nome = nome
        this.params.email = email
        this.params.cpf = cpf

        this.showSpinnerFirst = true
        this.usuarios = new Array<Colaborador>();
        let paramsJson = JSON.stringify(this.params)
        console.log(query)


        this.http.get(`${this.baseUrl}/colaboradores/users/?query={"nome":"${nome}","email":"${email}","cpf":"${cpf}"}&itemsPerPage=` + this.pageSize + `&currentPage=1`
            //this.http.post(`${this.baseUrl}/colaboradores/pesquisar/?itemsPerPage=` + this.pageSize + `&currentPage=1`, paramsJson, {
            // headers: new HttpHeaders({
            //     "Content-Type": "application/json",
            //     "Authorization": "Bearer "
            // })}
        ).subscribe(
            (response) => {
                console.log(response)
                this.usuarios = Object.assign([], response['data']);

                this.length = response['totalItemsInDatabase']
                if (this.length == 0) {
                    this.showMessageNoColaborador = true
                    this.mensagem = "Registro não localizado."
                }
                else if (this.usuarios.length == 0) {
                    console.log("lengt zero")
                    this.mensagem = "Sua pesquisa não encontrou nenhum registro correspondente"
                    this.showMessageNoColaborador = true
                }

            },
            (err) => {
                this.showSpinnerFirst = false
                console.log(err)

            },
            () => {
                this.showSpinnerFirst = false
                console.log('ok get');

            },
        )

    }

}