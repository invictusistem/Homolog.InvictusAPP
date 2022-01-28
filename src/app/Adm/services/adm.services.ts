import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/_shared/services/base.service';


@Injectable()
export class AdmService extends BaseService {
    
    constructor(private http: HttpClient) { super(); }

    // registrarUsuario(usuario: Usuario) : Observable<Usuario> {
    //     let response = this.http
    //         .post(this.UrlServiceV1 + 'nova-conta', usuario, this.ObterHeaderJson())
    //         .pipe(
    //             map(this.extractData),
    //             catchError(this.serviceError));
            
    //         return response;
    // }

    getColaboradores(pageSize?: number, currentPage?: number, jsonParam?: any) : Observable<any> {       
        
        var formJson = JSON.stringify(jsonParam)

        let path = `/colaboradores/pesquisar/?itemsPerPage=` + pageSize + `&currentPage=${currentPage}&paramsJson=${formJson}`
        
        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    getTypePacotes() : Observable<any> {  

        let path = `/typepacote`
        
        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    getSystemRoles() : Observable<any> {  

        let path = `/usuario/roles`
        
        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    getMateriasByTypeId(typePacoteId: any) : Observable<any>{
        // /materia-template/filtro/${typeId}
        let path = `/materia-template/filtro/${typePacoteId}`
        
        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    saveProfessorMateria(profId: any,materiaId: any ) : Observable<any>{
        // /materia-template/filtro/${typeId}
        let path = `/professor/materia/${profId}/${materiaId}`
        
        let response = this.http
            .post(this.BaseUrl + path, {}, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    editDisponibilidade(dispo: any) : Observable<any>{
        // /materia-template/filtro/${typeId}
        let path = `/professor/disponibilidade`
        
        let response = this.http
            .put(this.BaseUrl + path, dispo, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    editUsuario(usuario: any) : Observable<any>{

        let path = `/usuario`
        
        let response = this.http
            .put(this.BaseUrl + path, usuario, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    CepConsulta(CEP?: any) : Observable<any> {       
        
        let url = `https://viacep.com.br/ws/${CEP}/json/`
        
        let response = this.http
            .get(url)
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    // CepConsultaV2(CEP?: any, endereco?:any) : Observable<any> {       
        
    //     let url = `https://viacep.com.br/ws/${CEP}/json/`
        
    //     let response = this.http
    //         .get(url)
    //         .pipe(
    //             map(this.extractData),
    //             catchError(this.serviceError));
            
    //             var endereco = this.mappingEndereco(response);
            
    //             return response;
    // }

    // mappingEndereco(response){

    //     return { logradouro: response['logradouro'],
    //         complemento: response[''],
    //         numero: response[''],
    //         cidade: response[''],
    //         uf: response[''],
    //         bairro:
    //     }

    // }

    // BOLSAS

    GetBolsas(typePacoteId): Observable<any>{

        let path = `/bolsa/${typePacoteId}`
        
        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;

    }

    GetBolsaSenha(senhaId): Observable<any>{

        let path = `/bolsa/senha/${senhaId}`
        
        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;

    }

    SaveBolsa(bolsa): Observable<any>{

        let path = `/bolsa`
        
        let response = this.http
            .post(this.BaseUrl + path, bolsa, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }


    // MODULOS

    pesquisarPacote(typePacoteId:any, unidadeId:any): Observable<any>{

        let path = `/pacote/${typePacoteId}/${unidadeId}`
        
        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;

    }

    GetCreateModuleViewModel(): Observable<any>{

        let path = `/pacote/create`
        
        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;

    }

    GetEditModuleViewModel(pacoteId): Observable<any>{

        let path = `/pacote/edit/${pacoteId}`
        
        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;

    }

    // ABA USUARIOS
    GetUsuarioAcessos(userId): Observable<any>{

        let path = `/usuario/acessos/${userId}`
        
        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;

    }

    editAcessos(acessos): Observable<any>{

        let path = `/usuario/acessos`
        
        let response = this.http
            .put(this.BaseUrl + path, acessos, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    getUsuarios(pageSize?: number, currentPage?: number, jsonParam?: any) : Observable<any> {       
        
        var formJson = JSON.stringify(jsonParam)

        let path = `/usuario/?itemsPerPage=` + pageSize + `&currentPage=${currentPage}&paramsJson=${formJson}`
        
        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    savePacote(newPacote): Observable<any>{

        let path = `/pacote`
        
        let response = this.http
            .post(this.BaseUrl + path, newPacote, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    editPacote(editedPacote): Observable<any>{

        let path = `/pacote`
        
        let response = this.http
            .put(this.BaseUrl + path, editedPacote, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    // Unidades

    public GetUnidadeById(id): Observable<any>{

        let path = `/unidade/${id}`
        
        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;

    }

    public EditUnidade(unidade): Observable<any>{

        let path = `/unidade`
        
        let response = this.http
            .put(this.BaseUrl + path, unidade, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

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