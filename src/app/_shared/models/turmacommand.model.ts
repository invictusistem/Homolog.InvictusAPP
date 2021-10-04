import { Modulo } from "./modulo.model";

export class TurmaCommand {
    constructor(
    public modulo?: Modulo,
    public vagas?: number,
    public descricao?: string,
    public minVagas?: number,
    public prevInicio_1?: Date,
    public prevInicio_2?: Date,
    public prevInicio_3?: Date,
    public prevTermino_1?: Date,
    public prevTermino_2?: Date,
    public prevTermino_3?: Date,

    public horarioIni_1?: string,
    public horarioFim_1?: string,
    public horarioIni_2?: string,
    public horarioFim_2?: string,

    public segundoDiaAula?: Date,

    public salaId?: number,
    public horarios?: Horarios
    ){}
}

export class Horarios {
    constructor(
    public dia1?: string,
    public dia2?: string,
    public dia2Data?: Date,
    public horarioIni_1?: string,
    public horarioFim_1?: string,
    public horarioIni_2?: string,
    public horarioFim_2?: string
    ){}
}
