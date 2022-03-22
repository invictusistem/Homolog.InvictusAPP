import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Parametros } from "src/app/Adm/Colaboradores/colaboradores.component";
import { BoletimAlunoComponent } from "src/app/Pedagogico/Matricula/BoletimAluno/boletimaluno.component";
import { InfoCadastraisComponent } from "src/app/Pedagogico/Matricula/InfoCad/info-cadastrais.component";
import { InfoFinancPedagComponent } from "src/app/Pedagogico/Matricula/infoFinancas/infofinanc.component";
import { InfosComponent } from "src/app/Pedagogico/Matricula/informacoes/infos.component";
import { AlunoMatriculaComponent } from "src/app/Pedagogico/Matricula/matricula/alunomatricula.component";
import { InfoFinancComponentModal, OpenInfoComponentModal } from "src/app/Pedagogico/service/modal.config";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Aluno } from "src/app/_shared/models/aluno.model";
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { environment } from "src/environments/environment";
import { OpenRelatorioMatriculaComponentModal } from "../services/modal.config";
import { NewMatriculaService } from "../services/newmatricula.service";
import { CreateNovaMatriculaComponent } from "./CreateMatricula/createnovamatricula.component";
import { RelatorioMatriculaComponent } from "./Relatoriomatricula/relatoriomatricula.component";


@Component({
    selector: "novamatricula-app",
    templateUrl: './novamatricula.component.html',
    styleUrls: ['./novamatricula.component.scss'],
    animations: [HighlightTrigger]
})

export class NovaMatriculaComponent implements OnInit {
    
    showMessageNoAluno = false
    length: number = 0
    //mensagem: string = "";
    // length: number;
    pageSize: number = 5;
    pageEvent: PageEvent;
    pageIndexNumber: number = 0;
    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    // formSubmitted: boolean = false;
    // showTable: boolean = false;
    // paginationInfo: IPager;
    // showMessage: boolean = false;
    spinnerSearch = false 
    showMessageNoColaborador = false
    params: Parametros = new Parametros()
    alunos: any[] = new Array<any>();
    currentPage = 1

    public pesquisarForm: FormGroup

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        //private _snackBar: MatSnackBar,
        private _newMatService: NewMatriculaService,
        private _modal: MatDialog,
        private _fb: FormBuilder,
        private _http: HttpClient
    ) {
        this.pesquisarForm = _fb.group({
            nome: ['', [Validators.required]],
            email: ['', [Validators.required]],
            cpf: ['', [Validators.required]],
            ativo: [false],
            todasUnidades: [false],
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

    podeDesable = false
    get mostrarEmLote(){
        return this.tokenInfo.role == 'SuperAdm'
    }
    public SalvarEmLote(){
        this.podeDesable = true
        this._http.get(`https://localhost:5001/api/teste/readexcelalunos`)
            .subscribe(
                resp => {this.podeDesable = false },
                error => { this.podeDesable = false}
            )
    }

    public DeletarRegistroDaPlanilha(){
        this.podeDesable = true
        this._http.get(`https://localhost:5001/api/teste/delete-registros`)
            .subscribe(
                resp => {this.podeDesable = false },
                error => { this.podeDesable = false}
            )
    }

    public MatricularRegistroDaPlanilha(){ // matricular-registros
        this.podeDesable = true
        this._http.get(`https://localhost:5001/api/teste/matricular-registros`)
            .subscribe(
                resp => { this.RespMats(resp) },
                error => { this.podeDesable = false}
            )
    }

    one = new Promise<string>((resolve, reject) => {});
    listaCpfs: any[] = new Array<any>()
    RespMats(resp){
        let commands = resp['commands']

        // this.one.then(value => {
        //     console.log('resolved', value);
        //   });

        // cpf.forEach(async element => {    
        //    this.MatricularFinal(element)
         
        // });
        this.MatricularFinal(commands)
    }

    // funcao(CPFs) {
    //     let fit = Object.assign([], CPFs)
    //     console.log(fit)
    //     const jarOfPromises =[];
    //     fit.forEach(Module => {
    //     jarOfPromises.push(
    //       this._http.get(`https://localhost:5001/api/teste/matricular-final-registros/${Module}`)
    //       .toPromise())
    //     });
        
    //     Promise.all(jarOfPromises).then(results=>{
    //         console.log(results)
    //     /** your code **/
    //     });
    // }

    index = 0
    totalItens = 0
    commands:any[] = new Array<any>()
    public async MatricularFinal(command?, item?:any){ // matricular-registros
        console.log(item)
        console.log(command)
        //console.log(this.ids)
        if(item == undefined){ this.totalItens = command.length; this.commands = command}
       // if(id != undefined)

        this.podeDesable = true
        //console.log('matricula final')
        //if(id.length)
        this._http.post(`https://localhost:5001/api/teste/matricular-final-registros/${this.commands[this.index].turmaId}/${this.commands[this.index].alunoId}`, this.commands[this.index])
            .subscribe(
                resp => { 
                    console.log('retorno matricula')
                    this.index = this.index + 1 
                    console.log(this.index)
                    this.MatricularFinal(undefined, this.commands[this.index] )

                },
                error => {console.log('erro') }
            )
    }



    ngOnInit() {  
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)      
    }    


    public OpenRelatorioMatricula(): void {
        const dialogRef = this._modal
            .open(RelatorioMatriculaComponent, OpenRelatorioMatriculaComponentModal());
        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "OK") {
            } else if (data.clicked === "Cancel") {
            }
        });
    }
    
    submitPesquisa(event?: any) {

        this.showMessageNoColaborador = false

        if (this.pesquisarForm.valid) {
            this.spinnerSearch = true

            if (event != undefined) {
                this.currentPage = event.pageIndex + 1
            } else {
                this.currentPage = 1
                this.alunos = new Array<any>()
            }


            this._newMatService.getAlunos(this.pageSize, this.currentPage, this.pesquisarForm.value)
                .subscribe(
                    sucesso => { this.processarSucesso(sucesso, event) },
                    falha => { this.processarFalha(falha) }
                );

        }

    }

    

    processarSucesso(response: any, event?: any) {
       
        this.alunos = Object.assign([], response['data']);

        this.length = response['totalItemsInDatabase']

        this.spinnerSearch = false
        if (event != undefined){
            this.pageIndexNumber = (event.pageIndex * this.pageSize)
        }else{
            this.pageIndexNumber = 0
          
            this.paginator.firstPage();
        }

    }

    processarFalha(fail: any) {

        // if (fail['status'] == 404) {
        //     this.mensagem = "Sua pesquisa não encontrou nenhum registro correspondente"
        //     this.showMessageNoColaborador = true
        //     this.colaboradores = new Array<any>();
        // }
        // if (fail['status'] != 404) {
        //     this.mensagem = "Ocorreu um erro desconhecido, por favor, procure o administrador do sistema"
        //     this.showMessageNoColaborador = true
        //     this.colaboradores = new Array<any>();
        // }

        // this.spinnerSearch = false
    }

    openMatriculaModal(): void {
        const dialogRef = this._modal
        .open(CreateNovaMatriculaComponent, {
            height: 'auto',
            width: '1000px',
            autoFocus: false,
            maxHeight: '90vh',

            //data: { Hello: "Hello World" },
            hasBackdrop: true,
            disableClose: true
        });
   
    dialogRef.afterClosed().subscribe((data) => {
        if (data.clicked === "OK") {
           // this.openSnackBar()
            console.log('afte close ok')
        } else if (data.clicked === "Cancel") {
            // Do nothing. Cancel any events that navigate away from the
            // component.
        }
    });
    }

    matricular(aluno) {
        const dialogRef = this._modal
            .open(AlunoMatriculaComponent, {
               // minHeight: '610px',
                width: '850px',
               // autoFocus: false,
                //maxHeight: '400vh',

                data: { aluno: aluno },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                //clicked: "Ok"
              //  this.openSnackBar()
                this.submitPesquisa();
                console.log('afte close ok')
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });

    }

    viewInfoCadastrais(aluno): void {
        const dialogRef = this._modal
            .open(InfoCadastraisComponent, {
                height: 'auto',
                width: '1000px',
                autoFocus: false,
                maxHeight: '400vhvh',

                data: { aluno: aluno },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "OK") {
               this.submitPesquisa();
                console.log(JSON.stringify(this.pesquisarForm.value))
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }


    openInfoModal(aluno): void {
        const dialogRef = this._modal
            .open(InfosComponent, OpenInfoComponentModal(aluno));
        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "OK") {
            } else if (data.clicked === "Cancel") {
            }
        });
    }


    openInfoFinancModal(aluno: Aluno): void {
        const dialogRef = this._modal
            .open(InfoFinancPedagComponent, InfoFinancComponentModal(aluno));
        dialogRef.afterClosed().subscribe(
            data => { });


        // const dialogRef = this.CreateMatriculaModal
        //     .open(InfoFinancPedagComponent, {
        //         height: '90vh',
        //         width: '1050px',
        //         autoFocus: false,


        //         data: { aluno: aluno },
        //         hasBackdrop: true,
        //         disableClose: true
        //     });

        // dialogRef.afterClosed().subscribe((data) => {
        //     if (data.clicked === "OK") {
        //         this.openSnackBar()
        //         console.log('afte close ok')
        //     } else if (data.clicked === "Cancel") {

        //     }
        // });
    }

    openBoletimodal(aluno: Aluno): void {
        const dialogRef = this._modal
            .open(BoletimAlunoComponent, {
                height: '90vh',
                width: '1000px',
                autoFocus: false,


                data: { aluno: aluno },
                hasBackdrop: true,
                disableClose: true
            });

        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "OK") {
               // this.openSnackBar()
                console.log('afte close ok')
            } else if (data.clicked === "Cancel") {

            }
        });
    }

}