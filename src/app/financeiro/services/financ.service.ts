import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/_shared/services/base.service';


@Injectable()
export class FinanceiroService extends BaseService {

    constructor(private http: HttpClient) { super(); }
    // Fornecedores

    public GetFornecedores(pageSize?: number, currentPage?: number, jsonParam?: any): Observable<any> {

        var formJson = JSON.stringify(jsonParam)

        let path = `/fornecedores/?itemsPerPage=` + pageSize + `&currentPage=${currentPage}&paramsJson=${formJson}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetFornecedorById(id?: any): Observable<any> {

        let path = `/fornecedores/${id}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }


    public SaveFornecedor(form?: any): Observable<any> {

        let path = `/fornecedores`

        let response = this.http
            .post(this.BaseUrl + path, form, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public EditFornecedor(form?: any): Observable<any> {

        let path = `/fornecedores`

        let response = this.http
            .put(this.BaseUrl + path, form, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    // Produtos

    public GetRegistrosFinanceirosDosProdutos(pageSize?: number, currentPage?: number, jsonParam?: any): Observable<any> {

        var formJson = JSON.stringify(jsonParam)

        let path = `/financeiro/produtos-venda/?itemsPerPage=` + pageSize + `&currentPage=${currentPage}&paramsJson=${formJson}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    // Configurações



    public GetBancos(): Observable<any> {

        let path = `/configuracao-financ/banco`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetBancoById(bancoId: any): Observable<any> {

        let path = `/configuracao-financ/banco/${bancoId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public SaveBanco(newBanco: any): Observable<any> {

        let path = `/configuracao-financ/banco`

        let response = this.http
            .post(this.BaseUrl + path, newBanco, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public EditBanco(edtedBanco: any): Observable<any> {

        let path = `/configuracao-financ/banco`

        let response = this.http
            .put(this.BaseUrl + path, edtedBanco, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    // public RemoveBanco(bancoId: any): Observable<any> {

    //     let path = `/configuracao-financ/banco/${bancoId}`

    //     let response = this.http
    //         .delete(this.BaseUrl + path, this.ObterHeaderJson())
    //         .pipe(
    //             map(this.extractData),
    //             catchError(this.serviceError));

    //     return response;
    // }

    public GetMeioPagamentos(): Observable<any> {

        let path = `/configuracao-financ/meio-pgm`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetMeioPgmById(meioId: any): Observable<any> {

        let path = `/configuracao-financ/meio-pgm/${meioId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public SaveMeioPgm(newMeioPgm: any): Observable<any> {

        let path = `/configuracao-financ/meio-pgm`

        let response = this.http
            .post(this.BaseUrl + path, newMeioPgm, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public EditMeioPgm(edtedMeioPgm: any): Observable<any> {

        let path = `/configuracao-financ/meio-pgm`

        let response = this.http
            .put(this.BaseUrl + path, edtedMeioPgm, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    // 

    public GetCentrosCustos(): Observable<any> {

        let path = `/configuracao-financ/centro-custo`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetCentroCustoById(centroId: any): Observable<any> {

        let path = `/configuracao-financ/centro-custo/${centroId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public SaveCentroCusto(newCentroCusto: any): Observable<any> {

        let path = `/configuracao-financ/centro-custo`

        let response = this.http
            .post(this.BaseUrl + path, newCentroCusto, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public EditCentroCusto(edtedCentroCusto: any): Observable<any> {

        let path = `/configuracao-financ/centro-custo`

        let response = this.http
            .put(this.BaseUrl + path, edtedCentroCusto, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    //

    public GetFormasRecebimentos(): Observable<any> {

        let path = `/configuracao-financ/forma-recebimento`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetFormaRecebimentoById(formaId: any): Observable<any> {

        let path = `/configuracao-financ/forma-recebimento/${formaId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public SaveFormaRecebimento(newFormaRecebimento: any): Observable<any> {

        let path = `/configuracao-financ/forma-recebimento`

        let response = this.http
            .post(this.BaseUrl + path, newFormaRecebimento, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public EditFormaRecebimento(editedFormaRecebimento: any): Observable<any> {

        let path = `/configuracao-financ/forma-recebimento`

        let response = this.http
            .put(this.BaseUrl + path, editedFormaRecebimento, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    //

    public GetPlanos(): Observable<any> {

        let path = `/configuracao-financ/plano`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetPlanosById(planoId: any): Observable<any> {

        let path = `/configuracao-financ/plano/${planoId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetSubcontasByPlanoId(planoId: any): Observable<any> {

        let path = `/configuracao-financ/subconta/plano/${planoId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetSubcontasById(subcontaId: any): Observable<any> {

        let path = `/configuracao-financ/subconta/${subcontaId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public SavePlano(newPlano: any): Observable<any> {

        let path = `/configuracao-financ/plano`

        let response = this.http
            .post(this.BaseUrl + path, newPlano, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public SaveSubConta(newSubConta: any): Observable<any> {

        let path = `/configuracao-financ/subconta`

        let response = this.http
            .post(this.BaseUrl + path, newSubConta, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public EditPlano(editedPlano: any): Observable<any> {

        let path = `/configuracao-financ/plano`

        let response = this.http
            .put(this.BaseUrl + path, editedPlano, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public EditSubConta(editedSubConta: any): Observable<any> {

        let path = `/configuracao-financ/subconta`

        let response = this.http
            .put(this.BaseUrl + path, editedSubConta, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetDatasFromFormaRecCreate(): Observable<any> {

        let path = `/configuracao-financ/forma-recebimento/create`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }


    // CEP

    public CepConsulta(CEP?: any): Observable<any> {

        let url = `https://viacep.com.br/ws/${CEP}/json/`

        let response = this.http
            .get(url)
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    // getTypePacotes() : Observable<any> {  

    //     let path = `/typepacote`

    //     let response = this.http
    //         .get(this.BaseUrl + path, this.ObterHeaderJson())
    //         .pipe(
    //             map(this.extractData),
    //             catchError(this.serviceError));

    //         return response;
    // }

    // getSystemRoles() : Observable<any> {  

    //     let path = `/usuario/roles`

    //     let response = this.http
    //         .get(this.BaseUrl + path, this.ObterHeaderJson())
    //         .pipe(
    //             map(this.extractData),
    //             catchError(this.serviceError));

    //         return response;
    // }

    // getMateriasByTypeId(typePacoteId: any) : Observable<any>{
    //     // /materia-template/filtro/${typeId}
    //     let path = `/materia-template/filtro/${typePacoteId}`

    //     let response = this.http
    //         .get(this.BaseUrl + path, this.ObterHeaderJson())
    //         .pipe(
    //             map(this.extractData),
    //             catchError(this.serviceError));

    //         return response;
    // }

    // saveProfessorMateria(profId: any,materiaId: any ) : Observable<any>{
    //     // /materia-template/filtro/${typeId}
    //     let path = `/professor/materia/${profId}/${materiaId}`

    //     let response = this.http
    //         .post(this.BaseUrl + path, {}, this.ObterHeaderJson())
    //         .pipe(
    //             map(this.extractData),
    //             catchError(this.serviceError));

    //         return response;
    // }

    // editDisponibilidade(dispo: any) : Observable<any>{
    //     // /materia-template/filtro/${typeId}
    //     let path = `/professor/disponibilidade`

    //     let response = this.http
    //         .put(this.BaseUrl + path, dispo, this.ObterHeaderJson())
    //         .pipe(
    //             map(this.extractData),
    //             catchError(this.serviceError));

    //         return response;
    // }

    // editUsuario(usuario: any) : Observable<any>{

    //     let path = `/usuario`

    //     let response = this.http
    //         .put(this.BaseUrl + path, usuario, this.ObterHeaderJson())
    //         .pipe(
    //             map(this.extractData),
    //             catchError(this.serviceError));

    //         return response;
    // }

    // CepConsulta(CEP?: any) : Observable<any> {       

    //     let url = `https://viacep.com.br/ws/${CEP}/json/`

    //     let response = this.http
    //         .get(url)
    //         .pipe(
    //             map(this.extractData),
    //             catchError(this.serviceError));

    //         return response;
    // }

    // // MODULOS

    // pesquisarPacote(typePacoteId:any, unidadeId:any): Observable<any>{

    //     let path = `/pacote/${typePacoteId}/${unidadeId}`

    //     let response = this.http
    //         .get(this.BaseUrl + path, this.ObterHeaderJson())
    //         .pipe(
    //             map(this.extractData),
    //             catchError(this.serviceError));

    //         return response;

    // }

    // GetCreateModuleViewModel(): Observable<any>{

    //     let path = `/pacote/create`

    //     let response = this.http
    //         .get(this.BaseUrl + path, this.ObterHeaderJson())
    //         .pipe(
    //             map(this.extractData),
    //             catchError(this.serviceError));

    //         return response;

    // }

    // GetEditModuleViewModel(pacoteId): Observable<any>{

    //     let path = `/pacote/edit/${pacoteId}`

    //     let response = this.http
    //         .get(this.BaseUrl + path, this.ObterHeaderJson())
    //         .pipe(
    //             map(this.extractData),
    //             catchError(this.serviceError));

    //         return response;

    // }

    // savePacote(newPacote): Observable<any>{

    //     let path = `/pacote`

    //     let response = this.http
    //         .post(this.BaseUrl + path, newPacote, this.ObterHeaderJson())
    //         .pipe(
    //             map(this.extractData),
    //             catchError(this.serviceError));

    //         return response;
    // }

    // editPacote(editedPacote): Observable<any>{

    //     let path = `/pacote`

    //     let response = this.http
    //         .put(this.BaseUrl + path, editedPacote, this.ObterHeaderJson())
    //         .pipe(
    //             map(this.extractData),
    //             catchError(this.serviceError));

    //         return response;
    // }


    // console.log(CEP);
    // if (CEP.length == 10) {


    //     //var mystring = "crt/r2002_2";
    //     CEP = CEP.replace('-', '');
    //     CEP = CEP.replace('.', '');
    //     console.log(CEP);
    //     this.http.get(`https://viacep.com.br/ws/${CEP}/json/`, {})
    //         .subscribe(response => {

    //             //  console.log(response)
    //             // this.cepReturn = new CepReturn(
    //             //     response["logradouro"],
    //             //     response["bairro"],
    //             //     response["localidade"],
    //             //     response["uf"]);
    //             //console.log(this.cepReturn)
    //             this.colaboradorForm.get('logradouro').setValue(response["logradouro"].toUpperCase());
    //             this.colaboradorForm.get('bairro').setValue(response["bairro"].toUpperCase());
    //             this.colaboradorForm.get('cidade').setValue(response["localidade"].toUpperCase());
    //             this.colaboradorForm.get('uf').setValue(response["uf"].toUpperCase());
    //             //this.bairro = this.cepReturn.bairro
    //             // const token = (<any>response).accessToken;
    //             // console.log(response)
    //             // localStorage.setItem("jwt", token);
    //             // this.invalidLogin = false;
    //             // this.router.navigate(["/main"]);
    //         }, err => { console.log(err) },
    //             () => {
    //                 //  console.log('finaly')
    //                 this.showEndereco = true



}