import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'transferencia-app',
    templateUrl: './transferencia.component.html',
    styleUrls: ['./transferencia.component.scss']
})
export class TransferenciaComponent implements OnInit{
      
    constructor(
        private _modal: MatDialog,
    ){

    }
    ngOnInit(){
    }
    
    openTransfInternalModal(): void {
        // const dialogRef = this._modal
        //     .open(TransferenciaInternaComponent, {
        //         height: 'auto',
        //         width: '1200px',

        //         data: { Hello: "Hello World" },
        //         hasBackdrop: true,
        //         disableClose: true
        //     });


        // dialogRef.afterClosed().subscribe((data) => {
        //     if (data.clicked === "Ok") {
               
        //         console.log('afte close ok')
              
        //     } else if (data.clicked === "Cancel") {
              
        //     }
        // });
    }

    openTransfTurmaModal(): void {
        // const dialogRef = this._modal
        //     .open(TransferenciaTurmaComponent, {
        //         height: 'auto',
        //         width: '1200px',

        //         data: { Hello: "Hello World" },
        //         hasBackdrop: true,
        //         disableClose: true
        //     });


        // dialogRef.afterClosed().subscribe((data) => {
        //     if (data.clicked === "Ok") {
               
               
        //     } else if (data.clicked === "Cancel") {
                
        //     }
        // });
    }

    openTransfExternaModal(): void {
        // const dialogRef = this._modal
        //     .open(TransferenciaExternaComponent, {
        //         height: 'auto',
        //         width: '1000px',
        //         autoFocus: false,
        //         maxHeight: '90vh',

        //         data: { Hello: "Hello World" },
        //         hasBackdrop: true,
        //         disableClose: true
        //     });


        // dialogRef.afterClosed().subscribe((data) => {
        //     if (data.clicked === "Ok") {
               
        //     } else if (data.clicked === "Cancel") {
              
        //     }
        // });
    }

}