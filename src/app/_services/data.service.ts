import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// import { SecurityService } from './security.service';
// import { Guid } from '../../../guid';

// Implementing a Retry-Circuit breaker policy 
// is pending to do for the SPA app
@Injectable()
export class DataService {

    // private _todos = new BehaviorSubject<GenericTask[]>([]);
    // private dataStore: { todos: GenericTask[] } = { todos: [] };
    // readonly todos = this._todos.asObservable();

    //private dataStorage: { _generic}
    constructor(private http: HttpClient) { }

    // get todos() {
    //     return this._todos.asObservable();
    //   }

    //   loadAll(url: string) {
    //     this.http.get(url).subscribe(
    //       data => {
    //         this.dataStore.todos = data;
    //         this._todos.next(Object.assign({}, this.dataStore).todos);
    //       },
    //       error => console.log('Could not load todos.')
    //     );
    //   }

    // OK
    get(url: string, params?: any): Observable<Response> {
        //console.log(url)
        let options = {};
        this.setHeaders(options);

        return this.http.get(url, options)
            .pipe(tap((res: Response) => { }),
                catchError(this.handleError));
    }

    post(url: string, data: any, params?: any): Observable<Response> {
        return this.doPost(url, data, false, params);
    }

    delete(url: string, params?: any):Observable<boolean> {
        return this.sendRequest<boolean>("DELETE", url);
        
        // let options = {};
        // this.setHeaders(options);

        // console.log('data.service deleting');

        // return this.http.delete(url, options)
        //     .subscribe((res) => {
        //         console.log('deleted');
        //     });
    }

    put(url: string, data: any, params?:any): Observable<Response>{
        return this.doPut(url, data, false, params);
    }






    // OLD

    getData(url: string): Observable<Object[]> {
        //console.log(url)
        return this.sendRequest<Object[]>("GET", url);
    }
    private sendRequest<T>(verb: string, url: string, body?: any)
        : Observable<T> {

        let myHeaders = new HttpHeaders();
        myHeaders = myHeaders.set("Access-Key", "<secret>");
        myHeaders = myHeaders.set("Application-Names", ["exampleApp", "proAngular"]);

        return this.http.request<T>(verb, url, {
            body: body,
            headers: myHeaders
        }).pipe(catchError((error: Response) =>
            throwError(`Network Error: ${error.statusText} (${error.status})`)));
    }










    postWithId(url: string, data: any, params?: any): Observable<Response> {
        return this.doPost(url, data, true, params);
    }



    putWithId(url: string, data: any, params?: any): Observable<Response> {
        return this.doPut(url, data, true, params);
    }

    private doPost(url: string, data: any, needId: boolean, params?: any): Observable<Response> {
        let options = {};
        this.setHeaders(options, needId);

        return this.http.post(url, data, options)
            .pipe(
                tap((res: Response) => {
                    return res;
                }),
                catchError(this.handleError)
            );
    }

   

    private handleError(error: any) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('Client side network error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error('Backend - ' +
                `status: ${error.status}, ` +
                `statusText: ${error.statusText}, ` +
                `message: ${error.error.message}`);
        }

        // return an observable with a user-facing error message
        return throwError(error || 'server error');
    }

    private doPut(url: string, data: any, needId: boolean, params?: any): Observable<Response> {
        //console.log(`do put ${url}`)
        let options = {};
        this.setHeaders(options, needId);

        return this.http.put(url, data, options)
            .pipe(
                tap((res: Response) => {
                    return res;
                }),
                catchError(this.handleError)
            );
    }

    private setHeaders(options: any, needId?: boolean) {
        // if (needId && this.securityService) {
        //     options["headers"] = new HttpHeaders()
        //         .append('authorization', 'Bearer ' + this.securityService.GetToken())
        //         .append('x-requestid', Guid.newGuid());
        // }
        // else if (this.securityService) {
        //     options["headers"] = new HttpHeaders()
        //         .append('authorization', 'Bearer ' + this.securityService.GetToken());
        // }
    }
}