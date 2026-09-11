import { obterEstado } from './state.js';

export function atualizarHUD() {
    const estado = obterEstado();
    if (!estado.personagem) {
        document.getElementById('game-header').classList.add('hidden');
        return;
    }

    const p = estado.personagem;
    document.getElementById('game-header').classList.remove('hidden');
    
    document.getElementById('status-rapido').innerHTML = `
        <div style="font-weight: bold; color: #52b788;">👤 ${p.nome}</div>
        <div style="display: flex; gap: 12px; font-size: 0.85rem;">
            <span>❤️ ${p.vida}/${p.maxVida}</span>
            <span>🔮 ${p.pm !== undefined ? p.pm : 50}/${p.maxPm || 50}</span>
            <span>💎 ${estado.recursos.creditos}</span>
        </div>
    `;
}

export function abrirModal(htmlConteudo) {
    const overlay = document.getElementById('modal-overlay');
    const corpo = document.getElementById('modal-corpo');
    corpo.innerHTML = htmlConteudo;
    overlay.classList.remove('hidden');
}

export function fecharModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

export function renderizarTela(html) {
    document.getElementById('tela-principal').innerHTML = html;
}