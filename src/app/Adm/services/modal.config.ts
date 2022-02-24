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

// Professores

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

export function EditAcessoModal(usuario?: any) {
    return {
        width: '600px',
        data: { usuario: usuario },
        hasBackdrop: true,
        disableClose: true
    }
}

// BOLSA

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

export function OpenTurmaEditmodel(turma?) {
    return {
        width: '1030px',
        data: { turma: turma },
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


// openEditCursoModal(item: Turma): void {
    
//     const dialogRef = this._modal
//         .open(EditCursoComponent, {
//             height: 'auto',
//             width: '1030px',
//             autoFocus: false,
//             maxHeight: '90vh',
//             maxWidth: '400vh',

//             data: { turma: item },
//             hasBackdrop: true,
//             disableClose: true
//         });
    
// }

