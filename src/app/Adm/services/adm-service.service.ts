import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/_shared/services/base.service';


@Injectable()
export class AdmService extends BaseService {

    constructor(private http: HttpClient) { super(); }
/*

    getColaboradores(pageSize?: number, currentPage?: number, jsonParam?: any): Observable<any> {

        var formJson = JSON.stringify(jsonParam)

        let path = `/colaboradores/pesquisar/?itemsPerPage=` + pageSize + `&currentPage=${currentPage}&paramsJson=${formJson}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    envioAcesso(email): Observable<any> {

        let path = `/usuario/envio-acesso-colaborador/${email}`

        let response = this.http
            .put(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetTodasTurmasDaUnidade(): Observable<any> {

        let path = `/turma`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    getTypePacotes(): Observable<any> {

        let path = `/typepacote`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    getSystemRoles(): Observable<any> {

        let path = `/usuario/roles`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    getMateriasByTypeId(typePacoteId: any): Observable<any> {
        
        let path = `/materia-template/filtro/${typePacoteId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    saveProfessorMateria(profId: any, materiaId: any): Observable<any> {
       
        let path = `/professor/materia/${profId}/${materiaId}`

        let response = this.http
            .post(this.BaseUrl + path, {}, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    editDisponibilidade(dispo: any): Observable<any> {
       
        let path = `/professor/disponibilidade`

        let response = this.http
            .put(this.BaseUrl + path, dispo, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    editUsuario(usuario: any): Observable<any> {

        let path = `/usuario`

        let response = this.http
            .put(this.BaseUrl + path, usuario, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    CepConsulta(CEP?: any): Observable<any> {

        let url = `https://viacep.com.br/ws/${CEP}/json/`

        let response = this.http
            .get(url)
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

   
    public GetMaterias(pageSize?: number, currentPage?: number): Observable<any> {

        let path = `/materia-template/?itemsPerPage=` + pageSize + `&currentPage=${currentPage}&paramsJson={}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    public GetConfig(config?: any): Observable<any> {

        let path = ''

        if (config == 'CARGOS') path = `/parametro/value/cargo`

        if (config == 'DOCUMENTOS') path = `/documentacao`

        if (config == 'MATERIAS') path = `/materia-template`


        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

   

    public GetRelatorioProfessor(rangeIni: Date, rangeFinal: Date, professorId): Observable<any> {
        var ini = rangeIni
        ini.setHours(0, 0, 0, 0)
        let path = `/professor/${rangeIni.toUTCString()}/${rangeFinal.toUTCString()}/${professorId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    
    GetBolsas(typePacoteId): Observable<any> {

        let path = `/bolsa/${typePacoteId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    GetBolsa(bolsaId): Observable<any> {

        let path = `/bolsa/GetById/${bolsaId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    GetBolsaSenha(senhaId): Observable<any> {

        let path = `/bolsa/senha/${senhaId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    public SaveBolsa(bolsa): Observable<any> {

        let path = `/bolsa`

        let response = this.http
            .post(this.BaseUrl + path, bolsa, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public EditBolsa(bolsa): Observable<any> {

        let path = `/bolsa`

        let response = this.http
            .put(this.BaseUrl + path, bolsa, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }


   
    pesquisarPacote(typePacoteId: any, unidadeId: any): Observable<any> {

        let path = `/pacote/${typePacoteId}/${unidadeId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    GetCreateModuleViewModel(): Observable<any> {

        let path = `/pacote/create`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    GetEditModuleViewModel(pacoteId): Observable<any> {

        let path = `/pacote/edit/${pacoteId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    
    GetUsuarioAcessos(userId): Observable<any> {

        let path = `/usuario/acessos/${userId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    editAcessos(acessos): Observable<any> {

        let path = `/usuario/acessos`

        let response = this.http
            .put(this.BaseUrl + path, acessos, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    getUsuarios(pageSize?: number, currentPage?: number, jsonParam?: any): Observable<any> {

        var formJson = JSON.stringify(jsonParam)

        let path = `/usuario/?itemsPerPage=` + pageSize + `&currentPage=${currentPage}&paramsJson=${formJson}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    savePacote(newPacote): Observable<any> {

        let path = `/pacote`

        let response = this.http
            .post(this.BaseUrl + path, newPacote, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    editPacote(editedPacote): Observable<any> {

        let path = `/pacote`

        let response = this.http
            .put(this.BaseUrl + path, editedPacote, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

  

    public GetUnidadeById(id): Observable<any> {

        let path = `/unidade/${id}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    public EditUnidade(unidade): Observable<any> {

        let path = `/unidade`

        let response = this.http
            .put(this.BaseUrl + path, unidade, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }


    public AddProfNaTurma(addProfCommand): Observable<any> {

        let path = `/pedag/turma/professores`

        let response = this.http
            .post(this.BaseUrl + path, addProfCommand, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }
*/
}