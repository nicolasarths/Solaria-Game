const CHAVE_SALVAMENTO = "solaria_save_v1";

export function salvarJogo(estado) {
    localStorage.setItem(CHAVE_SALVAMENTO, JSON.stringify(estado));
}

export function carregarJogo() {
    const salvo = localStorage.getItem(CHAVE_SALVAMENTO);
    return salvo ? JSON.parse(salvo) : null;
}

export function limparSalvamento() {
    localStorage.removeItem(CHAVE_SALVAMENTO);
}