import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransferenciaExternaComponent } from './TransExterna/transfexterna.component';
import { TransferenciaInternaComponent } from './TransfInterna/transfinterna.component';
import { TransferenciaTurmaComponent } from './TransTurma/transfturma.component';

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
        const dialogRef = this._modal
            .open(TransferenciaInternaComponent, {
                height: 'auto',
                width: '1200px',

                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                // Reset form here
                console.log('afte close ok')
               // this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }

    openTransfTurmaModal(): void {
        const dialogRef = this._modal
            .open(TransferenciaTurmaComponent, {
                height: 'auto',
                width: '1200px',

                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                // Reset form here
                console.log('afte close ok')
               // this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }

    openTransfExternaModal(): void {
        const dialogRef = this._modal
            .open(TransferenciaExternaComponent, {
                height: 'auto',
                width: '1000px',
                autoFocus: false,
                maxHeight: '90vh',

                data: { Hello: "Hello World" },
                hasBackdrop: true,
                disableClose: true
            });


        dialogRef.afterClosed().subscribe((data) => {
            if (data.clicked === "Ok") {
                // Reset form here
                console.log('afte close ok')
               // this.getColaboradores(1, this.pageSize);
            } else if (data.clicked === "Cancel") {
                // Do nothing. Cancel any events that navigate away from the
                // component.
            }
        });
    }

}