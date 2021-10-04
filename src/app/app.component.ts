import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  //private url = `http://localhost:5000/api/get`;
  // private url = `http://api.invictustemp.com.thor.hostazul.com.br/api/get`;
  // public message: any = null;

  // constructor(private http: HttpClient) { }

  // ngOnInit() {

  //   //this.message = "Invictus!";
  //   return this.http.get<any>(this.url)
  //     .subscribe(res => 
  //     {
  //       this.message = res;
  //       console.log(this.message)
  //       document.getElementById("message").innerHTML = this.message.message;
  //     },
  //     )
  // }


  

  constructor() { }

  ngOnInit() {
  }
}