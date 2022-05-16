export function ConfirmAcaoModalConfig() {
    return {
        height: 'auto',
        width: '500px'
    }
}

export function ModalconfirmarConfig(
    url: string,
    metodo: string,
    msgModal: string,
    msgSucesso: string,
    payload?: any) {
    return {
        height: 'auto',
        width: '500px',
        data: {
            url: url,
            metodo: metodo,
            mensagemModal: msgModal,
            mensagemSucesso: msgSucesso,
            payload: payload
        },
        hasBackdrop: true,
        disableClose: true
    }
}