import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CepReturn } from "src/app/_shared/models/cepreturn.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Cargos, MeioPagamento, Unidades } from "src/app/_shared/models/perfil.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfos } from "src/app/_shared/models/token.model";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CompraProdutoCommand, Produto, ProdutosCommand } from "src/app/_shared/models/produto.model";
import { Parcelas } from "src/app/_shared/models/utils.model";

@Component({
    selector: 'produto-doacaomodal',
    templateUrl: './produto-doacao.component.html',
    styleUrls: ['./produto-doacao.component.scss'],
    animations: [HighlightTrigger]
})


export class ProdutoDoacaoComponent implements OnInit {

    baseUrl = environment.baseUrl;

    private jwtHelper = new JwtHelperService();
    public tokenInfo: TokenInfos = new TokenInfos();
    public meioPagamento = MeioPagamento
    public showParcelas = false;
    public msg = ""
    public showMgs = false
    public produtosCesta: Produto[] = new Array<Produto>();
    public totalParcelas: number
    parcelas = Parcelas
    public unidades: any;
    public unidadeId: number = 0;
    public produtos: Produto[] = new Array<Produto>();
    constructor(
        //private service: AdmService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fb: FormBuilder,
        private _http: HttpClient,
        private _modal: MatDialog,
        public dialogRef: MatDialogRef<ProdutoDoacaoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        //this.colaboradorForm = _fb.group({
        // templateName: ['', [Validators.required, Validators.minLength(5)]],

        //})
    }



    ngOnInit() {
        const token = localStorage.getItem('jwt')
        this.tokenInfo = this.jwtHelper.decodeToken(token)
        console.log(this.tokenInfo.Unidade);
        console.log(this.tokenInfo.Codigo);
        console.log(this.tokenInfo);
        this.GetOutrasUnidades();
        this.productCommand = Object.assign({}, this.data['produto'])
        this.productCommand.quantidadeComprada = 1;
        this.compraProdutoCommand.produtos.push(this.productCommand)
        //this.produtos.push(this.data['produto'] as Produto)
    }

    GetOutrasUnidades() {

        this._http.get(`${this.baseUrl}/unidade/outras`)
            .subscribe(resp => {
                this.unidades = Object.assign([], resp['unidades'])
            },
                (err) => { console.log(err) },
                () => {

                })
    }


    onSubmit(form: FormGroup) {
        // this.showMensagem = false
        console.log(form)
        console.log(form.value)
        console.log(form.valid)
        //var cel = `${form['celular'].value}`
        //console.log(cel)
        // this.dialogRef.close();
        if (form.valid) {
            console.log('form valid')
            const novoColaborador = JSON.stringify(form.value);
            //this.save(novoColaborador)
            // let newTemplate = this.mapForm(tempForm)

            this._http.post(`${this.baseUrl}/colaboradores`, novoColaborador, {
                //this.http.post("http://api.invictustemp.com.thor.hostazul.com.br/api/identity/login", credentials, {

                headers: new HttpHeaders({
                    "Content-Type": "application/json",
                    "Authorization": "Bear "
                })
            }).subscribe(response => {

                console.log(response)
                // this.colaboradores = Object.assign([], response['data'])
                // console.log(this.colaboradores)
                // this.dialogRef.close();
            }, (err) => {
                console.log(err)
                console.log(err['error'].mensagem)
                //this.mensagem = err['error'].mensagem
                //this.showMensagem = true
            },
                () => {
                    //console.log(response)
                    this.openSnackBar()
                    //this.showMensagem = false
                    this.dialogRef.close({ clicked: "Ok" });
                });
        }
    }

    openSnackBar() {
        this._snackBar.open('Colaborador salvo com sucesso.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'green-snackbar',
            duration: 3 * 1000,
        });
    }



    meioPagamentoSelect(meioPag) {

        this.compraProdutoCommand.meioPagamento = meioPag

        console.log(meioPag)

        if (meioPag != "credito") {
            this.showParcelas = false
        } else {
            this.showParcelas = true
        }


    }

    onOkClick() {

        this.dialogRef.close({ clicked: "Ok" });

    }

    fechar() {

        this.dialogRef.close({ clicked: "Ok" });

    }

    pesquisaItem(nome: string) {
        this.showMgs = false
        if (nome == "") return

        console.log(nome)

        this._http.get(`${this.baseUrl}/financeiro/produtos-buscar/${nome}`)
            .subscribe(resp => {
                this.produtos = Object.assign([], resp)
            },
                (erro) => { console.log(erro) },
                () => {

                    if (this.produtos.length == 0) {

                        this.msg = "nenhum produto com esse nome foi localizado"
                        this.showMgs = true
                    } else {

                        // this.openPesquisaResult()

                    }

                })
    }

    add(product: Produto) {
        var index = this.compraProdutoCommand.produtos.indexOf(product)
        var qntAtual = this.compraProdutoCommand.produtos[index].quantidadeComprada
        this.compraProdutoCommand.produtos[index].quantidadeComprada = qntAtual + 1
    }

    remove(product: Produto) {
        var index = this.compraProdutoCommand.produtos.indexOf(product)
        var qntAtual = this.compraProdutoCommand.produtos[index].quantidadeComprada
        if (qntAtual == 1) {

        } else {
            this.compraProdutoCommand.produtos[index].quantidadeComprada = qntAtual - 1
        }

    }

    get valorTotalVenda() {

        /*
                var preco = parseFloat(form.value["preco"])
                var precoFloat = preco.toFixed(2)
                console.log(precoFloat)
                produto.preco =  parseFloat(preco.toFixed(2))
                console.log(produto)
                */
        //var array = [1, 2, 3, 4, 5];
        var sum = 0
        this.compraProdutoCommand.produtos.forEach(element => {
            sum += element.quantidadeComprada * element.preco
        });

        this.compraProdutoCommand.valorTotal = sum

        // console.log(sum);
        // console.log(this.compraProdutoCommand.valorTotal)

        var sum2 = sum.toFixed(2)

        return `R$ ${sum2}`
    }

    deletar(product: Produto) {

        var index = this.compraProdutoCommand.produtos.indexOf(product)
        this.compraProdutoCommand.produtos[index]
        this.compraProdutoCommand.produtos.splice(index, 1);

    }


    private productCommand: ProdutosCommand = new ProdutosCommand();

    public compraProdutoCommand: CompraProdutoCommand = new CompraProdutoCommand();


    // openPesquisaResult(): void {
    //     const dialogRef = this._modal
    //         .open(VendaPesquisaComponent, {
    //             height: 'auto',
    //             width: '700px',
    //             autoFocus: false,
    //             maxHeight: '90vh',
    //             maxWidth: '400vh',

    //             data: { produtos: this.produtos },
    //             hasBackdrop: true,
    //             disableClose: true
    //         });


    //     dialogRef.afterClosed().subscribe((data) => {
    //         if (data.clicked === "Ok") {
    //             // Reset form here
    //             console.log('afte close ok')
    //             //this.getColaboradores(1, this.pageSize);
    //         } else if (data.clicked === "Ok-ADD") {

    //             //this.produtosCesta.push(data.produto)
    //             console.log(data.produto)
    //             this.productCommand = Object.assign({}, data.produto)
    //             this.productCommand.quantidadeComprada = 1;
    //             this.compraProdutoCommand.produtos.push(this.productCommand)

    //             console.log(this.compraProdutoCommand)

    //         }
    //     });
    // }
    parcelasTotais: any
    saveEdit(form: any) {
        console.log(form.value['totalParcelas'])
        console.log(this.compraProdutoCommand)

        this.compraProdutoCommand.parcelas = this.parcelasTotais
        //this.compraProdutoCommand.cpf_comprador = 
        console.log(this.compraProdutoCommand.meioPagamento)
        // if (this.compraProdutoCommand.meioPagamento == undefined ||
        //     this.compraProdutoCommand.meioPagamento == "") return
        console.log(this.meioPagamento)
        if (this.compraProdutoCommand.produtos.length == 0) return

        // if (this.compraProdutoCommand.meioPagamento != "dinherio") {
        //     if (form.valid && form.value['totalParcelas'] != 0) {
        //         console.log()

        //     }
        // }

        // this.compraProdutoCommand.parcelas = form.value['totalParcelas']

        var sendForm = JSON.stringify(this.compraProdutoCommand)
        console.log(sendForm)

        this._http.post(`${this.baseUrl}/financeiro/produto-doacao-unidades/${this.unidadeId}`,
            this.compraProdutoCommand, {
        })
            .subscribe(resp => { },
                (error) => { console.log(error) },
                () => {
                    this.dialogRef.close({ clicked: "Ok" });
                })

        console.log(this.compraProdutoCommand)

    }

}