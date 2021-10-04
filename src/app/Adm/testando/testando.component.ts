import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'testando-app',
    template: '<div>testando</div>'
})

export class TestandoComponent implements OnInit {
    menu: any;
    constructor(
        //private jwtHelper: JwtHelperService, 
        private router: Router,
        private http: HttpClient) { }
    ngOnInit() {
        console.log('testando 123')
        
    }



}