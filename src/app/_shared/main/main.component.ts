// import { HttpClient } from "@angular/common/http";
// import { Component, OnInit } from "@angular/core";
// import { Router } from "@angular/router";
// import { JwtHelperService } from "@auth0/angular-jwt";

// @Component({
//     selector:'main-app',
//     templateUrl:'./main.component.html',
//     styleUrls:['./main.component.scss']
// })

// export class MainComponent implements OnInit{
    
//     constructor(private jwtHelper: JwtHelperService,
//         private router: Router, 
//         private http: HttpClient) { }

//     ngOnInit() {
//        // this.isUserAuthenticated();
//     }
//     isUserAuthenticated() {

//         const token: string = localStorage.getItem("jwt");
//         if(token==null){
//             return true;
//         }
//         else{
//             if (token && !this.jwtHelper.isTokenExpired(token)) {
                

//                 return true;
//             }
//             else {
//                 this.router.navigate(["/login"]);
//                 return false;
//             }

//         }
        
//     }
// }