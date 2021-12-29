import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class BaseService {
    
    protected BaseUrl: string = environment.baseUrl

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${localStorage.getItem('jwt')}`
            })
        };
    }

    protected extractData(response: any) {
        return response || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];

        if (response instanceof HttpErrorResponse) {

            if (response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }
        }
      
       // console.error(response);
        return throwError(response);
    }
}




// if (req.url.includes(this.baseUrl)) {
//     if (localStorage.getItem('jwt') !== null) {
//         const cloneReq = req.clone({
//             headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('jwt')}`)
            
//         });
//         return next.handle(cloneReq).pipe(
//             tap(
//                 succ => { },
//                 err => {
//                     if (err.status === 401) {
//                         this.router.navigateByUrl('user/login');
//                     }
//                 }
//             )
//         );
//     } else {
//         return next.handle(req.clone());
//     }
// }else{
//     const cloneReq = req.clone()
//     return next.handle(cloneReq).pipe(
//         tap(
//             succ => { },
//             err => {
//                 if (err.status === 401) {
//                     this.router.navigateByUrl('user/login');
//                 }
//             }
//         )
//     );
// }