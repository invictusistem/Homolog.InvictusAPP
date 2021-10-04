import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
// import { CreateUserComponent } from "./CreateModal/createuser.component";
// import { EditUserComponent } from "./EditModal/edituser.component";

@Component({
    selector: "professores-app",
    templateUrl: './professores.component.html',
    styleUrls: ['./professores.component.scss']
})

export class ProfessoresComponent {

    // constructor(
    //     private userCreateModal: MatDialog,
    //     private editCreateModal: MatDialog){ } 
    

    // openCreateUserModal(): void {
    //     const dialogRef = this.userCreateModal
    //     .open(CreateUserComponent, {
    //         height: '480px',
    //         width: '600px',

    //         data: { Hello: "Hello World" }
    //     });
    //     // dialogRef.afterClosed().subscribe(result => {
    //     //     console.log('The dialog was closed');
    //     //     // this.animal = result;
    //     // });

    //     dialogRef.afterClosed().subscribe(result => {
    //         //console.log('The dialog was closed');
    //        // console.log(result);
    //        // console.log(this.templateTasks);
    //         //console.log(this.templateTasks);
    //         //this.newtasks. = this.templateTasks
    //        // this.templateTasks = result;
    //     });
    // }

    // openEditUserModal(): void {
    //     const dialogRef = this.editCreateModal
    //     .open(EditUserComponent, {
    //         height: '480px',
    //         width: '600px',

    //         data: { Hello: "Hello World" }
    //     });
    //     // dialogRef.afterClosed().subscribe(result => {
    //     //     console.log('The dialog was closed');
    //     //     // this.animal = result;
    //     // });

    //     dialogRef.afterClosed().subscribe(result => {
    //         //console.log('The dialog was closed');
    //        // console.log(result);
    //        // console.log(this.templateTasks);
    //         //console.log(this.templateTasks);
    //         //this.newtasks. = this.templateTasks
    //        // this.templateTasks = result;
    //     });
    // }

}