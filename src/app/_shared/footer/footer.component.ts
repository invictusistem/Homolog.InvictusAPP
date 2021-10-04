import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: []
})
export class FooterComponent implements OnInit{

    constructor() { }
    ngOnInit(){
       // this.isUserAuthenticated();
    }    

    
    // isUserAuthenticated() {
    //     const token: string = localStorage.getItem("jwt");
    //     if (token && !this.jwtHelper.isTokenExpired(token)) {
    //         this.router.navigate(["/customers"]);
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }
    // public logOut = () => {
    //     localStorage.removeItem("jwt");
    // }

    //constructor(private router: Router, private http: HttpClient) { }

    // login(form: NgForm) {
    //     const credentials = JSON.stringify(form.value);
    //     console.log(credentials)
    //     this.http.post("https://localhost:44370/api/identity/login", credentials, {
    //         headers: new HttpHeaders({
    //             "Content-Type": "application/json"
    //         })
    //     }).subscribe(response => {
    //         const token = (<any>response).accessToken;
    //         console.log(response)
    //         localStorage.setItem("jwt", token);
    //         this.invalidLogin = false;
    //         this.router.navigate(["/"]);
    //     }, err => {
    //         this.invalidLogin = true;
    //     });
    // }

    

}