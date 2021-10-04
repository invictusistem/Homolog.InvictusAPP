import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { HighlightTrigger } from "src/app/_shared/animation/item.animation";
import { Colaborador } from "src/app/_shared/models/colaborador.model";
import { environment } from "src/environments/environment";
import { Cargo } from "../Adm-Models/cargos.model";
import { CargoCreateComponent } from "./Config-Cargos/cargo-create.component";

declare var $: any;

@Component({
    selector: "configuracoes-app",
    templateUrl: './configuracoes.component.html',
    animations: [HighlightTrigger]
    //, styleUrls: ['./usuario.component.scss']
})

export class ConfiguracoesComponent implements OnInit {

    private baseUrl = environment.baseUrl;
    public htmlContent: any = "weewgwegewgegergregergergerg";//any;
    public cargos: Cargo[] = new Array<Cargo>();
    constructor(
        private _http: HttpClient,
        private _modal: MatDialog
    ) { }

    _toasts: Array<any> = [
        { title: "1st Toast", message: "This is the second message", date: new Date(), isShow: true }
    ]

    get toasts() {
        return this._toasts.filter(f => f.isShow)
    }

    ngOnInit() {
        $(".showtoast").click(function () {
            $('.toast').toast('show');
        })
        this.pegarMesg();
    }

    reset() {
        this._toasts.forEach(f => {
            f.isShow = true
        })
    }

    salvar() {
        console.log(this.htmlContent)
        console.log(JSON.stringify(this.htmlContent))

        let content = { content: JSON.stringify(this.htmlContent) }
        console.log(content)

        this._http.post(`${this.baseUrl}/mensagem`, content, {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })

        })
            .subscribe(resp => {

            }, (error) => { console.log(error) },
                () => { })
    }

    showTableCargos = false

    getCargos(){
        this.showTableCargos = false
        this._http.get(`${this.baseUrl}/unidade/cargo`)
        .subscribe(resp => {
            this.cargos = Object.assign([], resp)
        }, (error) => { 
            console.log(error) },
            () => {
                this.showTableCargos = true
            })
    }

    mensagem: any;
    pegarMesg() {

        this._http.get(`${this.baseUrl}/mensagem`)
            .subscribe(resp => {
                console.log(resp)
                this.mensagem = resp
                this.htmlContent = resp
            }, (error) => { console.log(error) },
                () => {

                })
    }

    // openToast() {
    //     var toastTrigger = document.getElementById('liveToastBtn')
    //     var toastLiveExample = document.getElementById('liveToast')
    //     if (toastTrigger) {
    //         toastTrigger.addEventListener('click', function () {
    //             var toast = new bootstrap.Toast(toastLiveExample)

    //             toast.show()
    //         })
    //     }
    // }

    openCreateCargoModal(): void {
        const dialogRef = this._modal
            .open(CargoCreateComponent, {
                height: 'auto',
                width: '700px',
                autoFocus: false,
                maxHeight: '90vh',
                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {

            } else if (data.clicked === "Cancel") {

            }
        });
    }


}