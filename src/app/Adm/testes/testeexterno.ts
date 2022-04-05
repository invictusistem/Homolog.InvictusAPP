import { Injectable } from "@angular/core";


export interface IServico{
    pegar(): string
}


@Injectable()
export class Servico implements IServico{

    palavra: string = '';

    pegar(): string {
        //throw new Error("Method not implemented.");
        return this.palavra;
    }

    // 

    // pegar(): string {
    //     this.palavra = 'Álvaro';
    //     

    // }
    
}
