// import { Injectable } from "@angular/core";
// import {
//     ActivatedRouteSnapshot, RouterStateSnapshot,
//     Router
// } from "@angular/router";
// import { Observable, Subject } from "rxjs";
// import { EditColaboradoresComponent } from "src/app/Adm/Colaboradores/EditModal/editcolaboradores.component";

// @Injectable()
// export class UnsavedGuard {
//     constructor(
//        //private messages: MessageService,
//         private router: Router) { }

//     canDeactivate(component: EditColaboradoresComponent, route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot): Observable<boolean> | boolean {
        
//             //if (component.editing) {
//                 console.log('candeactive')
//             if (["cargo"]
//                 .some(prop => component.editedColaborador[prop]
//                     != component.originalColaborador[prop])) {
//                         console.log('modify')
//                 let subject = new Subject<boolean>();
//                 // let responses: [string, (string) => void][] = [
//                 //     ["Yes", () => {
//                 //         subject.next(true);
//                 //         subject.complete();
//                 //     }],
//                 //     ["No", () => {
//                 //         this.router.navigateByUrl(this.router.url);
//                 //         subject.next(false);
//                 //         subject.complete();
//                 //     }]
//                 // ];
//                 // this.messages.reportMessage(new Message("Discard Changes?",
//                 //     true, responses));
//                 return subject;
//             }
//         //}
//        // return true;
//     }
// }