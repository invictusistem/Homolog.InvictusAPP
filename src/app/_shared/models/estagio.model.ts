export class Estagio {
    constructor(
        public id?: number,
        public nome?: string,
        public dataInicio?: Date,
        public trimestre?: number,
        public vagas?: number,
        public cep?: string,
        public logradouro?: string,
        public complemento?: string,
        public cidade?: string,
        public uf?: string,
        public bairro?: string,
    ) { }
}