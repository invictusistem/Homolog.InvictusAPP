import { Sala } from "./sala.model";

export class Unidade{
    constructor(
        public id?: string,
        public sigla?: string,
        public descricao?: string,
        public bairro?: string,
        public cnpj?: string,
        public numero?: string,
        public cep?: string,
        public complemento?: string,
        public logradouro?: string,
        public cidade?: string,
        public uf?: string,
        public salas?: Sala[]
    ){

    }
}