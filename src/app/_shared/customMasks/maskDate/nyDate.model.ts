export class MyDate {
    constructor(
        public dia: string,
        public mes: string,
        public ano: string
    ) { }

    customDate() {
        var data: string = `${this.dia}/${this.mes}/${this.ano}`;
        return data
    }
}