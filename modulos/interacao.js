import { obterEstado, atualizarEstado } from '../state.js';
import { renderizarTela, atualizarPainelStats } from '../engine.js';

export function iniciarInteracaoNPC(idNpc) {
    const estado = obterEstado();
    const npc = estado.npcs[idNpc];

    if (!npc) return;

    renderizarTela(`
        <div style="text-align: center;">
            <h3 style="color: #e9c46a;">${npc.nome}</h3>
            <p>Você está conversando com ${npc.nome} no local: <strong>${estado.localizacao.local}</strong>.</p>
            <p>Humor atual: <em>${npc.humor}</em></p>
            <button id="btn-subornar" class="menu-btn" style="margin: 5px;">Dar 5 Créditos</button>
            <button id="btn-voltar" class="menu-btn" style="margin: 5px;">Voltar à Exploração</button>
        </div>
    `);

    document.getElementById('btn-subornar').addEventListener('click', () => {
        let estAtual = obterEstado();
        if (estAtual.recursos.creditos >= 5) {
            estAtual.recursos.creditos -= 5;
            estAtual.npcs[idNpc].humor = "amigavel";
            atualizarEstado(estAtual);
            atualizarPainelStats();
            alert(`${npc.nome} sorriu e aceitou os créditos!`);
            iniciarInteracaoNPC(idNpc); // Atualiza a tela
        } else {
            alert("Créditos insuficientes!");
        }
    });

    document.getElementById('btn-voltar').addEventListener('click', () => {
        // Retorna para a lógica de exploração padrão
        const { iniciarExploracao } = require('./exploracao.js'); // ou importe direto no topo
        // ou chame sua função de rota padrão
    });
}