export function ReceberComponentModal(debito?:any, aluno?:any){
    return {   
        //minHeight: '470px',   
        width: '600px',
        data: { debito: debito, aluno: aluno },        
        hasBackdrop: true,
        disableClose: true

    }
}