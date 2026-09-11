import { obterEstado } from './state.js';
import { atualizarHUD, abrirModal, fecharModal } from './engine.js';
import { iniciarSeletor } from './modulos/seletor.js';
import { iniciarExploracao } from './modulos/exploracao.js';

document.addEventListener('DOMContentLoaded', () => {
    atualizarHUD();

    const estado = obterEstado();
    if (!estado.personagem) {
        iniciarSeletor();
    } else {
        // Se já tiver personagem salvo, retoma de onde parou
        iniciarExploracao();
    }

    // Eventos dos botões de menu superior (Ficha / Inventário)
    document.getElementById('btn-ficha').addEventListener('click', () => {
        const est = obterEstado();
        const p = est.personagem;
        abrirModal(`
            <h3 style="color: #52b788; margin: 0;">Ficha de Personagem</h3>
            <p><strong>Nome:</strong> ${p.nome}</p>
            <p><strong>Vida:</strong> ${p.vida} / ${p.maxVida}</p>
            <p><strong>Ataque:</strong> ${p.ataque}</p>
            <p><strong>Defesa:</strong> ${p.defesa}</p>
            <p><strong>Buffs ativos:</strong> ${est.buffs.length ? est.buffs.join(', ') : 'Nenhum'}</p>
        `);
    });

    document.getElementById('btn-inventario').addEventListener('click', () => {
        const est = obterEstado();
        abrirModal(`
            <h3 style="color: #52b788; margin: 0;">Inventário</h3>
            <ul>
                ${est.inventario.length ? est.inventario.map(item => `<li>${item}</li>`).join('') : '<li>Inventário vazio</li>'}
            </ul>
        `);
    });

    document.getElementById('modal-fechar').addEventListener('click', () => {
        fecharModal();
    });
});