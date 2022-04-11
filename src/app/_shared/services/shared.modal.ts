export function ConfirmAcaoModalConfig() {
    return {
        height: 'auto',
        width: '500px'
    }
}

export function ModalconfirmarConfig(url: string, metodo: string, mensagem: string, payload?: any) {
    return {
        height: 'auto',
        width: '500px',
        data: {
            url: url,
            metodo: metodo,
            mensagem: mensagem,
            payload: payload
        },
        hasBackdrop: true,
        disableClose: true
    }
}