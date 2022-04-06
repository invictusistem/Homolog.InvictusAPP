import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
<<<<<<< HEAD
export class AppComponent implements OnInit{
 
  constructor() { }

  ngOnInit() {
    
=======

export class AppComponent implements OnInit {

baseUrl = environment.baseUrl

  constructor() { }

  ngOnInit() {

    console.log(this.baseUrl)
>>>>>>> 9e83502d2b00e7d28a3b83c8649ad3b5fa628a86
  }
}