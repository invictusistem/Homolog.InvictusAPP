export class Debitos{
    constructor(

        public id?: number,
        public competencia?: Date,
        public idUnidadeResponsavel?: number,
        public status?: string,
        public valorTitulo?: number,
        public valorPago?: number,
        public dataVencimento?: Date,
        public dataPagamento?: Date,
        public meioPagamento?: string,
        public transacaoId?: number,
        public descricao?: string
    ){

    }
}
