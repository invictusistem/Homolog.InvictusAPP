
export class AlunoDto{
    constructor(
        public id?: number,
        public nome?: string,
        public cpf?: string,
        public unidadeCadastrada?: string,
        public documentos?: AlunoDocument[]
    ){

    }
}

export class AlunoDocument{
    constructor(
        public docId?: number,
        public alunoId?: number,
        public descricao?: string,
        public nome?: string,
        public analisado?: boolean,
        public validado?: boolean,
        public tipoArquivo?: string,
        public contentArquivo?: string,
        public dataCriacao?: Date
    ){}
}