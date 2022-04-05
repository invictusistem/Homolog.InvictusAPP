// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';

// @Injectable()
// export class DataService {
   
//     constructor(private http: HttpClient) { }

//     get(url: string, params?: any): Observable<Response> {       
//         let options = {};
//         this.setHeaders(options);

//         return this.http.get(url, options)
//             .pipe(tap((res: Response) => { }),
//                 catchError(this.handleError));
//     }

//     post(url: string, data: any, params?: any): Observable<Response> {
//         return this.doPost(url, data, false, params);
//     }

//     delete(url: string, params?: any):Observable<boolean> {
//         return this.sendRequest<boolean>("DELETE", url);       
//     }

//     put(url: string, data: any, params?:any): Observable<Response>{
//         return this.doPut(url, data, false, params);
//     }
    

//     getData(url: string): Observable<Object[]> {
       
//         return this.sendRequest<Object[]>("GET", url);
//     }
//     private sendRequest<T>(verb: string, url: string, body?: any)
//         : Observable<T> {

//         let myHeaders = new HttpHeaders();
//         myHeaders = myHeaders.set("Access-Key", "<secret>");
//         myHeaders = myHeaders.set("Application-Names", ["exampleApp", "proAngular"]);

//         return this.http.request<T>(verb, url, {
//             body: body,
//             headers: myHeaders
//         }).pipe(catchError((error: Response) =>
//             throwError(`Network Error: ${error.statusText} (${error.status})`)));
//     }


//     postWithId(url: string, data: any, params?: any): Observable<Response> {
//         return this.doPost(url, data, true, params);
//     }



//     putWithId(url: string, data: any, params?: any): Observable<Response> {
//         return this.doPut(url, data, true, params);
//     }

//     private doPost(url: string, data: any, needId: boolean, params?: any): Observable<Response> {
//         let options = {};
//         this.setHeaders(options, needId);

//         return this.http.post(url, data, options)
//             .pipe(
//                 tap((res: Response) => {
//                     return res;
//                 }),
//                 catchError(this.handleError)
//             );
//     }

   

//     private handleError(error: any) {
//         if (error.error instanceof ErrorEvent) {
           
//             console.error('Client side network error occurred:', error.error.message);
//         } else {
           
//             console.error('Backend - ' +
//                 `status: ${error.status}, ` +
//                 `statusText: ${error.statusText}, ` +
//                 `message: ${error.error.message}`);
//         }

        
//         return throwError(error || 'server error');
//     }

//     private doPut(url: string, data: any, needId: boolean, params?: any): Observable<Response> {
       
//         let options = {};
//         this.setHeaders(options, needId);

//         return this.http.put(url, data, options)
//             .pipe(
//                 tap((res: Response) => {
//                     return res;
//                 }),
//                 catchError(this.handleError)
//             );
//     }

//     private setHeaders(options: any, needId?: boolean) {
       
//     }
// }