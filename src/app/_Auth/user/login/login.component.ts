import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  titulo = 'Login';
  model: any = {};
  progress = false
  constructor(private authService: AuthService
    , public router: Router
    //, private toastr: ToastrService
    ) { }

  ngOnInit() {
    if (localStorage.getItem('jwt') != null) {
      this.router.navigate(['/adm']);
    }
  }

  login() {
      //console.log(this.model)
      this.progress = true
    this.authService.login(this.model)
      .subscribe(
        () => {
           // this.router.navigate(['/adm']);
          //this.toastr.success('Logado com Sucesso');
        },
        (error) => {
            console.log(error)
            this.progress = false
          //this.toastr.error('Falha ao tentar Logar');
        },
        () => { 
          this.progress = false
            //console.log('succes login')

            // TODO: message!!!!!!!!!!!

            //this.router.navigate(['/adm']);

            const navigationExtras: NavigationExtras = {state: {data: 'From Login'}};
            this.router.navigate(['/adm'], navigationExtras);
         }
      );
  }

}
