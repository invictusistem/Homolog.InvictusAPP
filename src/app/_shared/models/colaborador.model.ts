import { Materias } from "./Turma.model";

export class Colaborador {

    constructor(
        public id?:string,
        public nome: string = null,
        public email?: string,
        public cpf?: string,
        public celular?: string,
        public cargo?: string,
        public unidade?: string,
        public perfil?: string,
        public perfilAtivo?: boolean,
        public ativo?: boolean,
        public cep?: string,
        public logradouro: string = null,
        public complemento?: string,
        public bairro: string = null,
        public cidade: string= null,
        public uf: string= null
        ) { }

}


export class Professor {

    constructor(
        public id?:string,
        public nome?: string,
        public email?: string,
        public materias?: Materias[]
        ) { }

}