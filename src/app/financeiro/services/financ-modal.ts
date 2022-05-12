// Alunos
export function InfoFinancModalConfig(aluno?:any){
    return {
        width: '1150px',
        data: { aluno: aluno },
        hasBackdrop: true,
        disableClose: true
    }
}

export function ReceberComponentModal(debito?:any, aluno?:any){
    return { 
        height:'545px',
        width: '650px',
        data: { debito: debito, aluno: aluno },        
        hasBackdrop: true,
        disableClose: true
    }
}

export function ReparcelamentoComponentModal(aluno:any){
    return { 
        //height:'545px',
        width: '1000px',
        data: { aluno: aluno },        
        hasBackdrop: true,
        disableClose: true
    }
}

// fornecedor

export function CreateFornecedorModal(){
    return {
        height: '590px',
        width: '680px',
        hasBackdrop: true,
        disableClose: true
    }
}

export function EditFornecedorModal(fornecedor?: any){
    return {
        width: '680px',
        data: { fornecedor: fornecedor },
        hasBackdrop: true,
        disableClose: true
    }
}

// configurações

export function OpenBancosConfigModal(){
    return {
        width: '680px',
        hasBackdrop: true,
        disableClose: true
    }
}

export function OpenCentroCustoConfigModal(){
    return {
        width: '680px',
        hasBackdrop: true,
        disableClose: true
    }
}

export function OpenFormaRecebimentoconfigModal(){
    return {
        width: '680px',
        hasBackdrop: true,
        disableClose: true
    }
}

export function OpenMeioPagamentoConfigModal(){
    return {
        width: '680px',
        hasBackdrop: true,
        disableClose: true
    }
}

export function OpenPlanocontasConfigModal(){
    return {
        width: '680px',
        hasBackdrop: true,
        disableClose: true
    }
}