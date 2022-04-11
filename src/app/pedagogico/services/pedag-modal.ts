// Aluno-docs


// AlunosAcesso


// Analise-docs


// estagios

export function CreateEstagioModalConfig(data?:any) {
    return {        
        height: '520px',
        width: '700px',        
        hasBackdrop: true,
        disableClose: true
    }
}

export function EditEstagioModalConfig(estagio:any) {
    return {               
        width: '700px',  
        data: { estagio: estagio },        
        hasBackdrop: true,
        disableClose: true
    }
}

// estagiodocs


// matricula


// pedag-alunos


//pedag-models


// relatorios


// reposicoes


// transferencia


// turmapedag


//turmaInfos



export function InfoFinancComponentModal(data?:any){
    return {      
        width: '1050px',
        data: { aluno: data },        
        hasBackdrop: true,
        disableClose: true
    }
}


export function OpenInfoComponentModal(aluno?:any){
    return {      
        width: '1000px',
        data: { aluno: aluno },        
        hasBackdrop: true,
        disableClose: true
    }
}

export function ConfirmMatriculaModalConfig(matriculaId?:any){
    return {  
        height: '180px',    
        width: '500px',
        data: { matriculaId: matriculaId },        
        hasBackdrop: true,
        disableClose: true
    }
}

export function DetalheAcessoModalConfig(aluno:any){
    return {      
        width: '700px',
        data: { aluno: aluno },        
        hasBackdrop: true,
        disableClose: true
    }
}

// TurmasInfos

export function ObsTurmaModalConfig(caled:any){
    return {      
        width: '700px',
        data: { caled: caled },        
        hasBackdrop: true,
        disableClose: true
    }
}

export function AulaEditModalConfig(caled:any){
    return {      
        width: '700px',
        data: { caled: caled },        
        hasBackdrop: true,
        disableClose: true
    }
}

export function OpenCertificadoComponentModal(matricula?:any){
    return {      
        width: '500px',
        data: { matricula: matricula },        
        hasBackdrop: true,
        disableClose: true
    }
}


export function OpenCalendarioPresencaomponentModal(calendario?:any){
    return {      
        width: '1030px',
        data: { calendario: calendario },        
        hasBackdrop: true,
        disableClose: true
    }
}

// Diario de Claase

export function OpenPresencaComponentModal(turma?:any){
    return {      
        width: '1030px',
        data: { turma: turma },        
        hasBackdrop: true,
        disableClose: true
    }
}


