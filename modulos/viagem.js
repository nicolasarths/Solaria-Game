import { obterEstado, atualizarEstado } from '../state.js';
import { renderizarTela, atualizarPainelStats } from '../engine.js';
import { dom_feur } from './locais/dom_feur.js';
import { dammalot } from './locais/dammalot.js';

const reinosDisponiveis = {
    "Dom Feur": dom_feur,
    "Dammalòt": dammalot
};

export function iniciarTelaViagem() {
    const estado = obterEstado();
    let htmlReinos = '';

    for (const [chaveReino, reino] of Object.entries(reinosDisponiveis)) {
        let locaisHtml = reino.locais.map(local => {
            return `
                <div style="margin: 6px 0; background: #080c0a; padding: 8px; border-radius: 4px; border: 1px solid #1f3829; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: bold; color: #52b788;">📍 ${local.nome}</span>
                    <button class="menu-btn btn-entrar-local" data-reino="${reino.nome}" data-localid="${local.id}" style="font-size: 0.75rem; padding: 2px 6px;">Entrar</button>
                </div>
            `;
        }).join('');

        htmlReinos += `
            <div style="background: #111a14; border: 1px solid #1f3829; border-radius: 6px; padding: 10px; margin-bottom: 12px;">
                <h4 style="color: #e9c46a; margin: 0 0 4px 0;">🏰 ${reino.nome}</h4>
                <p style="font-size: 0.75rem; color: #a3b18a; margin: 0 0 8px 0;">${reino.descricao}</p>
                <div>${locaisHtml}</div>
            </div>
        `;
    }

    renderizarTela(`
        <div>
            <h3 style="color: #e9c46a; margin-top: 0;">Mapa de Viagem</h3>
            <p style="font-size: 0.85rem;">Local atual: <strong>${estado.localizacao.reino}</strong></p>
            <div style="max-height: 280px; overflow-y: auto; padding-right: 4px;">
                ${htmlReinos}
            </div>
        </div>
    `);

    // Evento para entrar no local selecionado
    document.querySelectorAll('.btn-entrar-local').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const nomeReino = e.target.getAttribute('data-reino');
            const localId = e.target.getAttribute('data-localid');
            const reinoObj = reinosDisponiveis[nomeReino];
            const localObj = reinoObj.locais.find(l => l.id === localId);

            // Atualiza estado global
            let estAtual = obterEstado();
            estAtual.localizacao.reino = nomeReino;
            estAtual.localizacao.local = localObj.nome;
            atualizarEstado(estAtual);
            atualizarPainelStats();

            // Abre a tela interna do local
            renderizarPainelLocal(reinoObj, localObj);
        });
    });
}

function renderizarPainelLocal(reino, local) {
    let acoesHtml = (local.acoes || []).map(acao => `
        <button class="menu-btn btn-acao-local" data-acaoid="${acao.id}" style="margin: 4px 0; width: 100%; text-align: left;">🔹 ${acao.nome}</button>
    `).join('') || '<p style="font-size: 0.8rem; color: #888;">Nada para fazer aqui no momento.</p>';

    let npcsHtml = (local.npcsPresentes || []).map(npc => `
        <span style="background: #1f3829; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; margin-right: 4px;">👤 ${npc}</span>
    `).join('') || 'Nenhum NPC por perto.';

    renderizarTela(`
        <div>
            <h3 style="color: #e9c46a; margin-top: 0;">${local.nome}</h3>
            <p style="font-size: 0.8rem; color: #a3b18a;">Reino: ${reino.nome}</p>
            <div style="margin: 10px 0; font-size: 0.85rem;">
                <strong>Pessoas presentes:</strong> <div>${npcsHtml}</div>
            </div>
            <div style="margin: 15px 0;">
                <h4 style="color: #52b788; font-size: 0.9rem; margin-bottom: 6px;">Ações Disponíveis:</h4>
                ${acoesHtml}
            </div>
            <button id="btn-voltar-mapa" class="menu-btn" style="margin-top: 10px; background: #333;">Voltar ao Mapa</button>
        </div>
    `);

    document.getElementById('btn-voltar-mapa').addEventListener('click', () => {
        iniciarTelaViagem();
    });

    // Lógica para executar as ações do local
    document.querySelectorAll('.btn-acao-local').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const acaoId = e.target.getAttribute('data-acaoid');
            const acao = local.acoes.find(a => a.id === acaoId);
            let est = obterEstado();

            if (acao.tipo === 'item') {
                if (est.recursos.creditos >= acao.custo) {
                    est.recursos.creditos -= acao.custo;
                    est.inventario.push(acao.item);
                    atualizarEstado(est);
                    atualizarPainelStats();
                    alert(`Você adquiriu: ${acao.item}!`);
                } else {
                    alert('Créditos insuficientes!');
                }
            } else if (acao.tipo === 'cura') {
                est.personagem.vida = Math.min(est.personagem.maxVida, est.personagem.vida + acao.valor);
                atualizarEstado(est);
                atualizarPainelStats();
                alert('Você descansou e recuperou vida.');
            } else if (acao.tipo === 'pm') {
                est.personagem.pm = Math.min(est.personagem.maxPm, est.personagem.pm + acao.valor);
                atualizarEstado(est);
                atualizarPainelStats();
                alert('Sua mente clareou com a observação.');
            } else {
                alert(acao.desc || 'Ação concluída.');
            }
            renderizarPainelLocal(reino, local); // Atualiza painel
        });
    });
}