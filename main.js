import { obterEstado, carregarEstado } from './state.js';
import { atualizarHUD, abrirModal, fecharModal, atualizarPainelStats, inicializarEdicaoPainel } from './engine.js';
import { iniciarSeletor } from './modulos/seletor.js';
import { iniciarExploracao } from './modulos/exploracao.js';

import { iniciarTelaViagem } from './modulos/viagem.js';

// Dentro do seu addEventListener('DOMContentLoaded', () => { ... })
document.getElementById('btn-viajar').addEventListener('click', () => {
    iniciarTelaViagem();
});

document.addEventListener('DOMContentLoaded', () => {
    // Carrega o estado salvo no cache primeiro
    carregarEstado();
    
    // Atualiza HUD e Painel de Stats inferior em tempo real
    atualizarHUD();
    atualizarPainelStats();
    inicializarEdicaoPainel();

    const estado = obterEstado();
    if (!estado.personagem || !estado.personagem.nome) {
        iniciarSeletor();
    } else {
        iniciarExploracao();
    }

    // Botão Ficha (agora apenas garante o foco ou abre uma visão estendida se quiser, mas os stats já estão editáveis embaixo)
    document.getElementById('btn-ficha').addEventListener('click', () => {
        const est = obterEstado();
        const p = est.personagem || {};
        abrirModal(`
            <h3 style="color: #52b788; margin: 0;">Resumo da Ficha</h3>
            <p><strong>Nome:</strong> ${p.nome || 'Sem nome'}</p>
            <p><strong>Classe:</strong> ${p.classe || 'N/A'}</p>
            <p><strong>CD (Dificuldade):</strong> ${p.cd || 10}</p>
            <p><strong>Buffs ativos:</strong> ${est.buffs && est.buffs.length ? est.buffs.join(', ') : 'Nenhum'}</p>
        `);
    });

    document.getElementById('btn-inventario').addEventListener('click', () => {
        const est = obterEstado();
        abrirModal(`
            <h3 style="color: #52b788; margin: 0;">Inventário</h3>
            <ul>
                ${est.inventario && est.inventario.length ? est.inventario.map(item => `<li>${item}</li>`).join('') : '<li>Inventário vazio</li>'}
            </ul>
        `);
    });

    document.getElementById('modal-fechar').addEventListener('click', () => {
        fecharModal();
    });
});