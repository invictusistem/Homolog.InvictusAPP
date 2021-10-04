export class Fornecedor{
    constructor(
        public id?: number,
        public razaoSocial?: string,
        public ie_rg?: string,
        public cnpj_cpf?: string,
        public email?: string,
        public telContato?: string,
        public whatsApp?: string,
        public nomeContato?: string,
        public cep?: string,
        public logradouro?: string,
        public complemento?: string,
        public cidade?: string,
        public uf?: string,
        public bairro?: string,
        public ativo?: boolean,
        public observacoes?: string,
    ){

    }
}