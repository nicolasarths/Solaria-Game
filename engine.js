import { obterEstado, atualizarEstado } from './state.js';

export function atualizarPainelStats() {
    const estado = obterEstado();

    // Atualiza os inputs do painel inferior de stats
    const inputNome = document.getElementById('edit-nome');
    if (inputNome) inputNome.value = estado.personagem.nome || '';

    const inputVida = document.getElementById('edit-vida');
    if (inputVida) inputVida.value = estado.personagem.vida;

    const inputMaxVida = document.getElementById('edit-maxvida');
    if (inputMaxVida) inputMaxVida.value = estado.personagem.maxVida;

    const inputPm = document.getElementById('edit-pm');
    if (inputPm) inputPm.value = estado.personagem.pm;

    const inputMaxPm = document.getElementById('edit-maxpm');
    if (inputMaxPm) inputMaxPm.value = estado.personagem.maxPm;

    const inputAtaque = document.getElementById('edit-ataque');
    if (inputAtaque) inputAtaque.value = estado.personagem.ataque;

    const inputBonusAtq = document.getElementById('edit-bonus-atq');
    if (inputBonusAtq) inputBonusAtq.value = estado.personagem.bonusAtaque;

    const inputDefesa = document.getElementById('edit-defesa');
    if (inputDefesa) inputDefesa.value = estado.personagem.defesa;

    const inputBonusDef = document.getElementById('edit-bonus-def');
    if (inputBonusDef) inputBonusDef.value = estado.personagem.bonusDefesa;

    const inputCd = document.getElementById('edit-cd');
    if (inputCd) inputCd.value = estado.personagem.cd;

    // AQUI É ONDE ATUALIZA OS CRÉDITOS NO PAINEL DE STATS
    const inputCreditos = document.getElementById('edit-creditos');
    if (inputCreditos) inputCreditos.value = estado.recursos.creditos;

    // Atualiza quantidade de itens
    const valItensQtd = document.getElementById('val-itens-qtd');
    if (valItensQtd) valItensQtd.textContent = estado.inventario.length;

    // Atualiza o texto do local atual se houver no painel
    const statLocal = document.getElementById('stat-local');
    if (statLocal) {
        statLocal.textContent = `📍 ${estado.localizacao.reino} - ${estado.localizacao.local}`;
    }
}

export function inicializarEdicaoPainel() {
    const campos = ['edit-nome', 'edit-vida', 'edit-maxvida', 'edit-pm', 'edit-maxpm', 'edit-ataque', 'edit-bonus-atq', 'edit-defesa', 'edit-bonus-def', 'edit-cd', 'edit-creditos'];

    campos.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                salvarAlteracoesPainel();
            });
            // Garante também ao pressionar Enter
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    salvarAlteracoesPainel();
                    el.blur(); // Retira o foco do input
                }
            });
        }
    });
}

function salvarAlteracoesPainel() {
    const estado = obterEstado();
    
    estado.personagem.nome = document.getElementById('edit-nome').value;
    estado.personagem.vida = Number(document.getElementById('edit-vida').value) || 0;
    estado.personagem.maxVida = Number(document.getElementById('edit-maxvida').value) || 0;
    estado.personagem.pm = Number(document.getElementById('edit-pm').value) || 0;
    estado.personagem.maxPm = Number(document.getElementById('edit-maxpm').value) || 0;
    estado.personagem.ataque = Number(document.getElementById('edit-ataque').value) || 0;
    estado.personagem.bonusAtaque = Number(document.getElementById('edit-bonus-atq').value) || 0;
    estado.personagem.defesa = Number(document.getElementById('edit-defesa').value) || 0;
    estado.personagem.bonusDefesa = Number(document.getElementById('edit-bonus-def').value) || 0;
    estado.personagem.cd = Number(document.getElementById('edit-cd').value) || 10;
    estado.recursos.creditos = Number(document.getElementById('edit-creditos').value) || 0;

    atualizarEstado(estado);
    atualizarHUD(); // Atualiza o topo imediatamente
}
export function atualizarHUD() {
    const estado = obterEstado();
    const header = document.getElementById('game-header');
    if (!estado.personagem) {
        if (header) header.classList.add('hidden');
        return;
    }

    const p = estado.personagem;
    if (header) header.classList.remove('hidden');
    
    const statusRapido = document.getElementById('status-rapido');
    if (statusRapido) {
        statusRapido.innerHTML = `
            <div style="font-weight: bold; color: #52b788;">👤 ${p.nome}</div>
            <div style="display: flex; gap: 12px; font-size: 0.85rem;">
                <span>❤️ ${p.vida}/${p.maxVida}</span>
                <span>🔮 ${p.pm !== undefined ? p.pm : 50}/${p.maxPm || 50}</span>
                <span>💎 ${estado.recursos.creditos}</span>
            </div>
        `;
    }
}

export function abrirModal(htmlConteudo) {
    const overlay = document.getElementById('modal-overlay');
    const corpo = document.getElementById('modal-corpo');
    if (corpo) corpo.innerHTML = htmlConteudo;
    if (overlay) overlay.classList.remove('hidden');
}

export function fecharModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.add('hidden');
}

export function renderizarTela(html) {
    const tela = document.getElementById('tela-principal');
    if (tela) tela.innerHTML = html;
}