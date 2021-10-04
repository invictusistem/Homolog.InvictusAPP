export class DocumentoAlunoDto {
    constructor(
        public id?: number,
        public alunoId?: number,
        public descricao?: string,
        public comentario?: string,
        public nome?: string,
        public docEnviado?: boolean,
        public analisado?: boolean,
        public validado?: boolean,
        public tipoArquivo?: string,
        public contentArquivo?: string,
        public dataFile?: Blob,
        public dataCriacao?: Date,
        public turmaId?: number,
    ) { }

}