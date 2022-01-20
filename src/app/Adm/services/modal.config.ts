// Colaborador
export function EditColaboradorModalConfig(data) {
    return {
        minHeight: '420',
        width: '680px',
        data: { colaborador: data },
        hasBackdrop: true,
        disableClose: true
    }
}

export function CreateColaboradorModalConfig(data?: any) {
    return {
        width: '680px',
        hasBackdrop: true,
        disableClose: true
    }
}

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

export function CreateBolsaModalConfig(usuario?: any) {
    return {
        width: '600px',
        data: { usuario: usuario },
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

