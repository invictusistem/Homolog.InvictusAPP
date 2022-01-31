
export function InfoFinancComponentModal(data?:any){
    return {      
        width: '1050px',
        data: { aluno: data },        
        hasBackdrop: true,
        disableClose: true
    }
}


export function OpenInfoComponentModal(aluno?){
    return {      
        width: '1000px',
        data: { aluno: aluno },        
        hasBackdrop: true,
        disableClose: true
    }
}

export function ConfirmMatriculaModalConfig(matriculaId?){
    return {  
        height: '180px',    
        width: '500px',
        data: { matriculaId: matriculaId },        
        hasBackdrop: true,
        disableClose: true
    }
}

export function DetalheAcessoModalConfig(aluno){
    return {      
        width: '700px',
        data: { aluno: aluno },        
        hasBackdrop: true,
        disableClose: true
    }
}

// TurmasInfos

export function ObsTurmaModalConfig(caled){
    return {      
        width: '700px',
        data: { caled: caled },        
        hasBackdrop: true,
        disableClose: true
    }
}

export function AulaEditModalConfig(caled){
    return {      
        width: '700px',
        data: { caled: caled },        
        hasBackdrop: true,
        disableClose: true
    }
}


