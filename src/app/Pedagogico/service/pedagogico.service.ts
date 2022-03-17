import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/_shared/services/base.service';



@Injectable()
export class PedagogicoService extends BaseService {
    
    constructor(private http: HttpClient) { super(); }


    // Estagio

    public GetEstagios() : Observable<any> {  

        let path = `/estagio`
        
        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    public GetEstagio(estagioId) : Observable<any> {  

        let path = `/estagio/${estagioId}`
        
        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    public AddEstagio(estagio): Observable<any>{

        let path = `/estagio`
       // console.log(estagio)
        let response = this.http
            .post(this.BaseUrl + path, estagio, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    public EditEstagio(estagio): Observable<any>{

        let path = `/estagio`
        
        let response = this.http
            .put(this.BaseUrl + path, estagio, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    // EstagiosDocs

    public GetAlunosEstagio(pageSize?: number, currentPage?: number, jsonParam?: any) : Observable<any> {       

        var formJson = JSON.stringify(jsonParam)

        let path = `/estagio/alunos/?itemsPerPage=` + pageSize + `&currentPage=${currentPage}&paramsJson=${formJson}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    // OUTROS
    getInfoDebitos(matriculaId: any) : Observable<any> {  

        let path = `/financeiro/debitos/${matriculaId}`
        
        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    getAlunos(pageSize?: number, currentPage?: number, jsonParam?: any) : Observable<any> {       

        var formJson = JSON.stringify(jsonParam)

        let path = `/alunos/pesquisar/?itemsPerPage=` + pageSize + `&currentPage=${currentPage}&paramsJson=${formJson}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    //TurmasInfos.CalendariosDaTurma.AulaDetalhe

    public GetAulaViewModel(calendarioId) : Observable<any> {    

        let path = `/pedag/turma/aula/${calendarioId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetAulaEditViewModel(calendarioId) : Observable<any> {    

        let path = `/pedag/turma/aula-edit/${calendarioId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetProfsHabilitados(calendarioId, materiaId): Observable<any> {

        let path = `/pedag/turma/aula-edit/profs/${calendarioId}/${materiaId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    public EditAula(aula, calendarioId): Observable<any>{

        let path = `/pedag/turma/calendario/editar/${calendarioId}`
        
        let response = this.http
            .put(this.BaseUrl + path, aula, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    // infos.component

    saveAluno(form): Observable<any>{

        let path = `/alunos`
        
        let response = this.http
            .put(this.BaseUrl + path, form, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }
    

    getAlunobyId(id) : Observable<any> {    

        let path = `/alunos/cadastro/${id}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    saveResponsavel(form): Observable<any>{

        let path = `/pedag/aluno/responsavel`
        console.log(form)
        let response = this.http
            .put(this.BaseUrl + path, form, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    GetResponsavelById(id) : Observable<any> {       

        let path = `/pedag/aluno/responsavel-aluno/${id}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetCertificado(matriculaId) : Observable<any> {       

        let path = `/pedag/aluno/certificado/${matriculaId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    // Matricula Modal

    GetBolsa(senha) : Observable<any> {       

        let path = `/bolsa/senha-validar/${senha}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    GetAlunosIndicacao() : Observable<any> {       

        let path = `/pedag/matricula/aluno-indicacao`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }


    // DOWNLOAD

    GetDocumento(matriculaId) : Observable<any> {       

        let path = `/pedag/doc/getpendencia/${matriculaId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderDownload())
            .pipe(
                map(this.extractDataDownload),
                catchError(this.serviceError));

        return response;
    }


    // ACESSO ALUNO

    getAlunosAcesso(pageSize?: number, currentPage?: number, jsonParam?: any) : Observable<any> {       

        var formJson = JSON.stringify(jsonParam)

        let path = `/alunos/matriculados/?itemsPerPage=` + pageSize + `&currentPage=${currentPage}&paramsJson=${formJson}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    editAcesso(email, acesso) : Observable<any> {       

        let path = `/usuario/aluno-acesso/${email}/${acesso}`

        let response = this.http
            .put(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    envioAcesso(email) : Observable<any> {       

        let path = `/usuario/envio-acesso/${email}`

        let response = this.http
            .put(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }




    


/*
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

    getMateriasByTypeId(typePacoteId: any) : Observable<any>{
        let path = `/materia-template/filtro/${typePacoteId}`
        
        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    saveProfessorMateria(profId: any,materiaId: any ) : Observable<any>{
        let path = `/professor/materia/${profId}/${materiaId}`
        
        let response = this.http
            .post(this.BaseUrl + path, {}, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));
            
            return response;
    }

    editDisponibilidade(dispo: any) : Observable<any>{
        let path = `/professor/disponibilidade`
        
        let response = this.http
            .put(this.BaseUrl + path, dispo, this.ObterHeaderJson())
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
*/

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