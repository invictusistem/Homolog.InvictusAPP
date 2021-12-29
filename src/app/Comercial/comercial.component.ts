import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExportLeadComponent } from './ExportarLead/exportar.component';


declare interface RouteInfo {
  path: string;
  title: string;
  class: string;
  typeIcon: string;
}

// export const ROUTES: RouteInfo[] = [
//     { path: '/adm/usuarios', title: 'Usuários', class: '', typeIcon: 'manage_accounts' },
//     { path: '/adm/unidades', title: 'Unidades', class: '', typeIcon: 'house' },
//     { path: '/adm/cursos', title:'cursos', class:'', typeIcon: 'house'},
//     { path: '/adm/colaboradores', title: 'Colaboradores', class: '', typeIcon: 'engineering' },
//     { path: '/adm/produtos', title: 'Produtos', class: '', typeIcon: 'fact_check' },
// ]

@Component({
  selector: 'comericial-app',
  templateUrl: './comercial.component.html',
  styleUrls: ['./comercial.component.scss']
})
export class ComercialComponent implements OnInit {
  menu: any;
  public progress: number;
  public message: string;
  totalLeadsHoje = 0;
  totalLeads = 0;
  
  baseUrl = environment.baseUrl;

  //@Output() public onUploadFinished = new EventEmitter();

  constructor(
    private fileService: FileService,
    // private jwtHelper: JwtHelperService, 
    private exportLeadModal: MatDialog,
    private router: Router,
    private _http: HttpClient) { }

  ngOnInit() {
    // this.isUserAuthenticated();
    // this.menu = ROUTES.filter(menu => menu);
    this.getLeads();
  }

  getLeads(){

    this._http.get(`${this.baseUrl}/comercial/leads`)
    .subscribe(resp => {
      this.totalLeadsHoje = resp['totalLeadsHoje']
      this.totalLeads = resp['totalLeads']
    }, 
    (error) => { console.log(error)
    },
    () => { })
  }

  openExportModal(): void {
    const dialogRef = this.exportLeadModal
      .open(ExportLeadComponent, {
        height: 'auto',
        width: 'auto',

        data: { colaborador: 'hello' },
        hasBackdrop: true,
        disableClose: true
      });

    dialogRef.afterClosed().subscribe(result => {

    });
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

  invalidLogin: boolean;

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

  logOut() {
    localStorage.removeItem("jwt");
    this.router.navigate(["/login"]);
  }

  // public uploadFile = (files) => {
  //     if (files.length === 0) {
  //       return;
  //     }

  //     let fileToUpload = <File>files[0];
  //     const formData = new FormData();
  //     formData.append('file', fileToUpload, fileToUpload.name);

  //     this.fileService.upload(formData).subscribe((event) => {
  //       if (event.type === HttpEventType.UploadProgress)
  //         this.progress = Math.round((100 * event.loaded) / event.total);
  //       else if (event.type === HttpEventType.Response) {
  //         this.message = 'Upload success.';
  //         this.onUploadFinished.emit(event.body);
  //       }
  //     });
  //   };
  jwtHelper = new JwtHelperService();
  decodedToken: any;




  refresh(): void {
    window.location.reload();
  }






}


@Injectable({
  providedIn: 'root',
})
export class FileService {
  private url = 'https://localhost:5001/api';

  constructor(private http: HttpClient) { }

  public upload(formData: FormData) {
    return this.http.post(`${this.url}/upload`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  public download(fileUrl: string) {
    return this.http.get(`${this.url}/download?fileUrl=${fileUrl}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    });
  }

  public getPhotos() {
    return this.http.get(`${this.url}/getPhotos`);
  }
}
