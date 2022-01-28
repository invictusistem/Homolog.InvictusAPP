export function ReceberComponentModal(debito?:any, aluno?:any){
    return {   
        //minHeight: '470px',   
        width: '600px',
        data: { debito: debito, aluno: aluno },        
        hasBackdrop: true,
        disableClose: true

    }
}

export function CreateFornecedorModal(){
    return {
        height: '590px',
        width: '680px',
        hasBackdrop: true,
        disableClose: true
    }
}

export function EditFornecedorModal(fornecedor){
    return {
        width: '680px',
        data: { fornecedor: fornecedor },
        hasBackdrop: true,
        disableClose: true
    }
}