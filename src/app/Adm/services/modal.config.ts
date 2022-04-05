
    //#region /Bolas


    //#endregion


    //#region /Calendario


    //#endregion

    //#region /Colaboradores


    //#endregion


    //#region /Configuracoes


    //#endregion

    //#region /Contratos


    //#endregion

    //#region /MessageModal


    //#endregion

    //#region /Modulos


    //#endregion

    //#region /PlanoPgm


    //#endregion

    //#region /Produtos


    //#endregion

    //#region /Professores


    //#endregion

    //#region /Turmas


    //#endregion

    //#region /Unidades


    //#endregion


    //#region /Usuarios


    //#endregion










// Bolas
export function CreateBolsaModalConfig(usuario?: any) {
    return {
        width: '600px',
        data: { usuario: usuario },
        hasBackdrop: true,
        disableClose: true
    }
}

export function EditBolsaModalConfig(bolsaId?: any) {
    return {
        width: '600px',
        data: { bolsaId: bolsaId },
        hasBackdrop: true,
        disableClose: true
    }
}

export function ShowSenhaModalConfig(senha?: any) {
    return {
        height: '100px',
        width: '130px',
        data: { senha: senha },
    }
}

// Calendario


// Colaboradores
export function EditColaboradorModalConfig(data) {
    return {
        //minHeight: '420',
        width: '710px',
        data: { colaborador: data },
        hasBackdrop: true,
        disableClose: true
    }
}

export function CreateColaboradorModalConfig(data?: any) {
    return {
        //height:'570px',
        width: '710px',
        hasBackdrop: true,
        disableClose: true
    }
}

// Configuracoes

export function EditCargoModalConfig(value) {
    return {
        //minHeight: '420',
        width: '700px',
        data: { value: value },
        hasBackdrop: true,
        disableClose: true
    }
}

// Contratos


// MessageModal


// Modulos

export function ModuloCreateComponentModal(data?: any) {
    return {
        width: '850px',
        hasBackdrop: true,
        disableClose: true
    }
}

export function ModuloEditComponentModal(data?: any) {
    return {
        width: '850px',
        data: { moduloId: data },
        hasBackdrop: true,
        disableClose: true
    }
}

export function ModuloDetalheComponentModal(modulo?: any) {
    return {
        width: '850px',
        data: { modulo: modulo },
        hasBackdrop: true,
        disableClose: true
    }
}

// PlanoPgm


// Produtos


// Professores

export function CreateProfessorModalConfig() {
    return {
        height:'620px',
        width: '680px',
        //maxHeight: '90vh',
        //maxWidth: '450vh',
        //data: { prof: prof },
        hasBackdrop: true,
        disableClose: true
    }

    // const dialogRef = this._modal
    //     .open(CreateProfessorComponent, {
    //         minHeight: '420px',
    //         width: '680px',

    //         //data: { Hello: "Hello World" },
    //         hasBackdrop: true,
    //         disableClose: true
    //     });


    // dialogRef.afterClosed().subscribe((data) => {
    //     if (data.clicked === "Ok") {
    //         // Reset form here
    //         console.log('afte close ok')
    //         this.getColaboradores(1, this.pageSize);
    //     } else if (data.clicked === "Cancel") {
    //         // Do nothing. Cancel any events that navigate away from the
    //         // component.
    //     }
    // });
}

export function ProfCalendarioModalConfig(prof?: any) {
    return {
        height:'auto',
        width: '1230px',
        maxHeight: '90vh',
        maxWidth: '450vh',
        data: { prof: prof },
        hasBackdrop: true,
        disableClose: true
    }
}

export function ProfRelatorioModalConfig(prof?: any) {
    return {
        //height:'570px',
        width: '710px',
        data: { prof: prof},
        hasBackdrop: true,
        disableClose: true
    }
}

export function ProfEditModalConfig(prof?: any) {
    return {
        //height: '520px',
        width: '680px',
        data: { prof: prof},
        hasBackdrop: true,
        disableClose: true
    }
}



// Relatorios

// RelatoriosAdm

//turmas


export function OpenTurmaEditmodel(turma?) {
    return {
        width: '1030px',
        data: { turma: turma },
        hasBackdrop: true,
        disableClose: true
    }
}

// Unidades

//Usuarios

export function EditAcessoModal(usuario?: any) {
    return {
        width: '600px',
        data: { usuario: usuario },
        hasBackdrop: true,
        disableClose: true
    }
}





