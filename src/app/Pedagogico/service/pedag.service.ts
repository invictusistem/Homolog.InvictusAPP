import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable, InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/_services/data.service';
import { Aluno } from 'src/app/_shared/models/aluno.model';


export const REST_TAREFA_URL = new InjectionToken("rest_url")

@Injectable()

export class PedagService {

    //genericTask: GenericTask[] = new Array<GenericTask>();
    private baseUrl = environment.baseUrl;
    // private templateUrl: string = `${this.baseUrl}/api/template`;
    // // private catUrl: string = `${this.baseUrl}/api/v1/categories`;
    // private functionUrl: string = `${this.baseUrl}/api/categories/functions`;
    // private categoryUrl: string = `${this.baseUrl}/api/categories`;
    // private tasksUrl: string = `${this.baseUrl}/api/task`;
    // private saveTemplateUrl: string = `${this.baseUrl}/api/template`;

    constructor(private dataService: DataService) { }


    // getTasks(currentPage?: number, itemsPerPage?: number): Observable<GenericTask[]> {
    //     let url = this.tasksUrl + '/?currentPage=' + currentPage + '&itemsPerPage=' + itemsPerPage
    //     console.log(url)
    //     return this.dataService.get(url).pipe<GenericTask[]>(tap((response: any) => { return response; }));
    // }

    getAlunos(alunoId: number): Observable<Aluno> {
        let url = `${this.baseUrl}/adm/aluno/${alunoId}`
        return this.dataService.get(url).pipe<Aluno>(tap((response: any) => { return response; }))
    }

    // getAllTemplates(): Observable<Template[]> {

    //     return this.dataService.get(this.templateUrl, null)
    //         .pipe<Template[]>(tap((response: any) => { return response; }));
    // }

    // getTemplateById(templateId: number): Observable<Template> {
    //     let url = `${this.templateUrl}/template/${templateId}`
    //     return this.dataService.get(url).pipe<Template>(tap((response: any) => { return response }))
    // }

    // getFunctionsByCategoryId(id: number): Observable<TypeFunction[]> {
    //     let url = `${this.functionUrl}/${id}`;
    //     return this.dataService.get(url).pipe<TypeFunction[]>(tap((response: any) => { return response; }))
    // }

    // deleteTemplate(id: number): Observable<boolean> {
    //     return this.dataService.delete(`${this.templateUrl}/${id}`)
    //         .pipe<boolean>(tap((response: any) => { return response; }));
    // }

    // deleteTask(id: number): Observable<boolean> {
    //     return this.dataService.delete(`${this.tasksUrl}/${id}`)
    //         .pipe<boolean>(tap((response: any) => { return response; }));
    // }

    // editTemplate(template: Template): Observable<boolean> {
    //     return this.dataService.put(this.templateUrl, template).pipe<boolean>(tap((Response: any) => true));
    // }

    // saveTask(newTask): Observable<boolean> {
    //     return this.dataService.post(this.tasksUrl, newTask).pipe<boolean>(tap((response: any) => true));
    // }

    // saveNewTemplate(newTemplate): Observable<boolean> {
    //     return this.dataService.post(this.saveTemplateUrl, newTemplate).pipe<boolean>(tap((response: any) => true));
    // }


}