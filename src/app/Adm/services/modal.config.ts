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

export function ModuloCreateComponentModal(data?:any){
    return {      
        width: '850px',        
        hasBackdrop: true,
        disableClose: true
    }
}

export function ModuloEditComponentModal(data?:any){
    return {      
        width: '850px',
        data: { moduloId: data },        
        hasBackdrop: true,
        disableClose: true
    }
}

export function EditAcessoModal(usuario?:any){
    return {      
        width: '600px',
        data: { usuario: usuario },        
        hasBackdrop: true,
        disableClose: true
    }
}