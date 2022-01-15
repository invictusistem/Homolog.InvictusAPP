
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


