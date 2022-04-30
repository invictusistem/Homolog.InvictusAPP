export function OpenEstagioDocModalConfig(usuario?: any) {
    return {
        width: '1100px',
        data: { usuario: usuario },
        hasBackdrop: true,
        disableClose: true
    }
}