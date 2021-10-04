export class Cargo {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public ativo?: boolean,
        public dataCriacao?: Date
    ) { }
}