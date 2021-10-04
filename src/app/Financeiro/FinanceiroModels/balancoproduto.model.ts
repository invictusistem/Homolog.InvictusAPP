export class BalancoProdutos {
    constructor(
        public nome?: string,
        public quantidade?: number,
        public valorUnitario?: number,
        public valorTotal?: number,
        public dataVenda?: Date,
        public MeioPagamento?: string,
        public parcelas?: number
    ) { }


}