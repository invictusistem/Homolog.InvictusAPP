import { Sala } from "./sala.model";

export class Unidade{
    constructor(
        public id?: number,
        public sigla?: string,
        public descricao?: string,
        public bairro?: string,
        public cep?: string,
        public complemento?: string,
        public logradouro?: string,
        public cidade?: string,
        public uf?: string,
        public salas?: Sala[]
    ){

    }
}