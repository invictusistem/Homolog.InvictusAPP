import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms"
import { makeStateKey } from "@angular/platform-browser";

export class Aluno {

    constructor(
        public id?: string,
        public nome: string = null,
        public nomeSocial?: string,
        public cpf?: string,
        public rg?: string,
        public nascimento?: Date,
        public naturalidade?: string,
        public naturalidadeUF?: string,
        public email?: string,
        public telCelular?: string,
        public telReferencia?: string,
        public nomeContatoReferencia?: string,
        public telWhatsapp?: string,
        public telResidencial?: string,
        public cep?: string,
        public temRespFin?: boolean,
        public temRespMenor?: boolean,
        public logradouro: string = null,
        public complemento?: string,
        public cidade: string = null,
        public uf: string = null,
        public bairro: string = null,
        public observacoes?: string
        
    ) {
        

    }

    Maskx() {

        // let area = this.telCelular.substring(1,2)
        // let exchange = ''
        // let subscriber = ''
        // console.log(area + exchange + subscriber)
        // return { area: 21, exchange: 9999, subscriber: 5555 }
    }

}


export interface IValidateForms {
    ValidarForms(aluno: FormGroup, respFin: FormGroup, respMenor: FormGroup, idade: Date)
}

@Injectable()
export class ValidateFormsService implements IValidateForms {

    ValidarForms(aluno: FormGroup, respFin: FormGroup, respMenor: FormGroup, nascimento: Date) {
        let dataTrans: DataTrans = new DataTrans()
        let data: Date = new Date(nascimento);
        let timeDiff = Math.abs(Date.now() - data.getTime());
        let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        console.log(age)
        if (age > 18) {
            //maior
            if (!aluno.get('temRespFin').value as boolean) {
                dataTrans.alunoDto = aluno.value
                dataTrans.respAlunoDto = null
                dataTrans.respMenorDto = null

                return { isValid: aluno.valid, data: dataTrans }
            } else {
                dataTrans.alunoDto = aluno.value
                dataTrans.respAlunoDto = respFin.value
                dataTrans.respMenorDto = null

                return { isValid: aluno.valid && respFin.valid, data: dataTrans };
            }

        } else {
            //menor
            if (respMenor.get('eRespFinanc').value as boolean) {
                dataTrans.alunoDto = aluno.value
                dataTrans.respAlunoDto = null
                dataTrans.respMenorDto = respMenor.value
                console.log('eRespFinanc')
                return { isValid: aluno.valid && respMenor.valid, data: dataTrans }
            } else {
                dataTrans.alunoDto = aluno.value
                dataTrans.respAlunoDto = respFin.value
                dataTrans.respMenorDto = respMenor.value

                return { isValid: aluno.valid && respFin.valid && respMenor.valid, data: dataTrans };
            }
        }
    }

}

export class DataTrans {
    constructor(
        public alunoDto?: Aluno,
        public respAlunoDto?: Aluno,
        public respMenorDto?: Aluno
    ) { }
}
/*
nao é menor: resp fin ou nao
menor: respMenor e/ou respFin

*/