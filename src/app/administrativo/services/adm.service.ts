import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/_shared/services/base.service';

@Injectable()
export class AdmService extends BaseService {

    constructor(private http: HttpClient) { super(); }
    
    // REFACTOR

    // Geral

    public GetTypePacotes(): Observable<any> {

        let path = `/typepacote`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public CepConsulta(CEP?: any): Observable<any> {

        let url = `https://viacep.com.br/ws/${CEP}/json/`

        let response = this.http
            .get(url)
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetMateriasByTypeId(typePacoteId: any): Observable<any> {
        
        let path = `/materia-template/filtro/${typePacoteId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    // Bolsas

    public GetBolsas(typePacoteId:any): Observable<any> {

        let path = `/bolsa/${typePacoteId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    public GetBolsaSenha(senhaId:any): Observable<any> {

        let path = `/bolsa/senha/${senhaId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }


    public SaveBolsa(bolsa:any): Observable<any> {

        let path = `/bolsa`

        let response = this.http
            .post(this.BaseUrl + path, bolsa, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetBolsa(bolsaId:any): Observable<any> {

        let path = `/bolsa/GetById/${bolsaId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    public EditBolsa(bolsa:any): Observable<any> {

        let path = `/bolsa`

        let response = this.http
            .put(this.BaseUrl + path, bolsa, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    // Colaboradores

    public GetColaboradores(pageSize?: number, currentPage?: number, jsonParam?: any): Observable<any> {

        var formJson = JSON.stringify(jsonParam)

        let path = `/colaboradores/pesquisar/?itemsPerPage=` + pageSize + `&currentPage=${currentPage}&paramsJson=${formJson}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    // Configurações

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

    // Contratos


    // Modulos

    public PesquisarPacote(typePacoteId: any, unidadeId: any): Observable<any> {

        let path = `/pacote/${typePacoteId}/${unidadeId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    public GetCreateModuleViewModel(): Observable<any> {

        let path = `/pacote/create`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }    

    public SavePacote(newPacote:any): Observable<any> {

        let path = `/pacote`

        let response = this.http
            .post(this.BaseUrl + path, newPacote, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetEditModuleViewModel(pacoteId:any): Observable<any> {

        let path = `/pacote/edit/${pacoteId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    public EditPacote(editedPacote:any): Observable<any> {

        let path = `/pacote`

        let response = this.http
            .put(this.BaseUrl + path, editedPacote, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    // Planos


    // Produtos


    // Professores

    public SaveProfessorMateria(profId: any, materiaId: any): Observable<any> {
       
        let path = `/professor/materia/${profId}/${materiaId}`

        let response = this.http
            .post(this.BaseUrl + path, {}, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public EditDisponibilidade(dispo: any): Observable<any> {
       
        let path = `/professor/disponibilidade`

        let response = this.http
            .put(this.BaseUrl + path, dispo, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetRelatorioProfessor(rangeIni: Date, rangeFinal: Date, professorId:any): Observable<any> {
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

    // Turmas

    public AddProfNaTurma(addProfCommand:any): Observable<any> {

        let path = `/pedag/turma/professores`

        let response = this.http
            .post(this.BaseUrl + path, addProfCommand, this.ObterHeaderJson())
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

    // Unidades

    public GetUnidadeById(id:any): Observable<any> {

        let path = `/unidade/${id}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    public EditUnidade(unidade:any): Observable<any> {

        let path = `/unidade`

        let response = this.http
            .put(this.BaseUrl + path, unidade, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }


    // Usuários


    public GetUsuarioAcessos(userId:any): Observable<any> {

        let path = `/usuario/acessos/${userId}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    public EnvioAcesso(email:any): Observable<any> {

        let path = `/usuario/envio-acesso-colaborador/${email}`

        let response = this.http
            .put(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public EditAcessos(acessos:any): Observable<any> {

        let path = `/usuario/acessos`

        let response = this.http
            .put(this.BaseUrl + path, acessos, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetSystemRoles(): Observable<any> {

        let path = `/usuario/roles`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public EditUsuario(usuario: any): Observable<any> {

        let path = `/usuario`

        let response = this.http
            .put(this.BaseUrl + path, usuario, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

    public GetUsuarios(pageSize?: number, currentPage?: number, jsonParam?: any): Observable<any> {

        var formJson = JSON.stringify(jsonParam)

        let path = `/usuario/?itemsPerPage=` + pageSize + `&currentPage=${currentPage}&paramsJson=${formJson}`

        let response = this.http
            .get(this.BaseUrl + path, this.ObterHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }

}