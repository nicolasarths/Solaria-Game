import { renderizarTela, atualizarHUD, abrirModal, fecharModal } from '../engine.js';
import { obterEstado, atualizarEstado } from '../state.js';
import { iniciarExploracao } from './exploracao.js';
import { usarPocaoVida } from './itens/pocao_vida.js';
import { usarEscudoTermico } from './itens/escudo_termico.js';

import impactoSolar from './poderes/impacto_solar.js';
import rajadaPlasma from './poderes/rajada_plasma.js';

const listaPoderes = [impactoSolar, rajadaPlasma];

let inimigoAtual = null;
let defending = false;
let logMensagens = [];

export function adicionarLogCombate(msg) {
    logMensagens.push(msg);
    if (logMensagens.length > 5) logMensagens.shift();
}

export function iniciarCombate() {
    const estado = obterEstado();
    if (estado.personagem.pm === undefined) {
        estado.personagem.pm = 50;
        estado.personagem.maxPm = 50;
    }

    inimigoAtual = { 
        nome: 'Autômato Danificado', 
        vida: 60, 
        maxVida: 60, 
        pm: 30,
        maxPm: 30,
        ataque: 16, 
        defesa: 5 
    };
    
    logMensagens = ["O combate começou! Um inimigo se aproxima."];
    turnoJogador();
}

function turnoJogador() {
    defending = false;
    renderizarTelaCombate("Seu Turno: Escolha sua ação");
}

function renderizarTelaCombate(statusTexto) {
    const estado = obterEstado();
    const p = estado.personagem;
    
    renderizarTela(`
        <h3 style="color: #e76f51; margin: 0;">Combate em Andamento</h3>
        <div style="background: #090e0b; padding: 10px; border-radius: 8px; font-size: 0.8rem; display: flex; flex-direction: column; gap: 4px;">
            <p style="margin: 0; color: #ffb703;">🤖 ${inimigoAtual.nome}: ❤️ ${inimigoAtual.vida}/${inimigoAtual.maxVida}</p>
            <p style="margin: 0; color: #52b788;">👤 ${p.nome}: ❤️ ${p.vida}/${p.maxVida} | 🔮 ${p.pm}/${p.maxPm}</p>
        </div>
        
        <div style="background: #15221a; padding: 8px; border-radius: 6px; font-size: 0.75rem; height: 60px; overflow-y: auto; font-family: monospace;">
            ${logMensagens.map(m => `> ${m}`).join('<br>')}
        </div>

        <p style="margin: 0; font-size: 0.85rem; color: #74c69d;">${statusTexto}</p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <button id="cmd-atacar" class="acao-btn">Atacar (d20)</button>
            <button id="cmd-defender" class="acao-btn">Defender</button>
            <button id="cmd-poder" class="acao-btn">Poderes</button>
            <button id="cmd-itens" class="acao-btn">Inventário</button>
        </div>
    `);

    document.getElementById('cmd-atacar').addEventListener('click', () => rolarAcaoCombate('atacar'));
    document.getElementById('cmd-defender').addEventListener('click', executarDefender);
    document.getElementById('cmd-poder').addEventListener('click', abrirMenuPoderes);
    document.getElementById('cmd-itens').addEventListener('click', abrirInventarioCombate);
}

function abrirMenuPoderes() {
    const estado = obterEstado();
    const p = estado.personagem;

    let html = `<h3 style="color: #52b788; margin: 0;">Selecione um Poder</h3><div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">`;
    
    listaPoderes.forEach(pod => {
        html += `
            <button class="acao-btn usar-poder-btn" data-id="${pod.id}" style="text-align: left;">
                <strong>${pod.nome}</strong> (Custo: ${pod.custoPm} PM)<br>
                <small>${pod.descricao}</small>
            </button>
        `;
    });
    html += `</div><button id="fechar-poderes" class="acao-btn" style="margin-top: 10px;">Voltar</button>`;

    abrirModal(html);

    document.querySelectorAll('.usar-poder-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            const podEscolhido = listaPoderes.find(pMod => pMod.id === id);

            if (p.pm < podEscolhido.custoPm) {
                alert("PM insuficiente!");
                return;
            }

            p.pm -= podEscolhido.custoPm;
            fecharModal();
            rolarAcaoCombate('poder', podEscolhido);
        });
    });

    document.getElementById('fechar-poderes').addEventListener('click', () => fecharModal());
}

function rolarAcaoCombate(tipo, poderObj = null) {
    const estado = obterEstado();
    const p = estado.personagem;

    renderizarTela(`
        <h3 style="color: #e9c46a; margin: 0; text-align: center;">Rolagem de Dado (d20)</h3>
        <p style="text-align: center; font-size: 0.9rem;">Clique para rolar o d20!</p>
        <div style="text-align: center; margin: 20px 0;">
            <span id="resultado-dado" style="font-size: 2.5rem; font-weight: bold; color: #52b788;">🎲 ?</span>
        </div>
        <button id="btn-jogar-dado" class="acao-btn" style="width: 100%;">Rolar d20</button>
    `);

    document.getElementById('btn-jogar-dado').addEventListener('click', () => {
        const d20 = Math.floor(Math.random() * 20) + 1;
        document.getElementById('resultado-dado').textContent = `🎲 ${d20}`;

        setTimeout(() => {
            if (tipo === 'atacar') {
                const totalAtaque = d20 + p.ataque;
                const dano = Math.max(2, totalAtaque - inimigoAtual.defesa);
                inimigoAtual.vida -= dano;
                adicionarLogCombate(`Rolou ${d20} + Atq (${p.ataque}). Causou ${dano} de dano.`);
            } else if (tipo === 'poder' && poderObj) {
                const totalPoder = d20 + (p.ataque * poderObj.multiplicador);
                const danoPoder = Math.floor(totalPoder);
                inimigoAtual.vida -= danoPoder;
                adicionarLogCombate(`${poderObj.nome}! Rolou ${d20}. Causou ${danoPoder} de dano.`);
            }
            atualizarEstado({ personagem: p });
            atualizarHUD();
            verificarFimDeJogo();
        }, 1000);
    });
}

function executarDefender() {
    defending = true;
    adicionarLogCombate("Postura defensiva assumida.");
    turnoInimigo();
}

function abrirInventarioCombate() {
    const estado = obterEstado();
    abrirModal(`
        <h3 style="color: #52b788; margin: 0;">Itens em Combate</h3>
        <ul>
            ${estado.inventario.length ? estado.inventario.map((item) => `
                <li>${item} <button class="usar-item-btn" data-item="${item}" style="margin-left: 10px;">Usar</button></li>
            `).join('') : '<li>Inventário vazio</li>'}
        </ul>
        <button id="fechar-modal-combate" class="acao-btn">Voltar</button>
    `);

    document.querySelectorAll('.usar-item-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const nomeItem = e.currentTarget.getAttribute('data-item');
            let acionou = false;
            if (nomeItem === "Poção de Vida") acionou = usarPocaoVida();
            if (nomeItem === "Escudo Térmico") acionou = usarEscudoTermico();

            if (acionou) {
                fecharModal();
                atualizarHUD();
                turnoInimigo();
            }
        });
    });
    document.getElementById('fechar-modal-combate').addEventListener('click', () => fecharModal());
}

function verificarFimDeJogo() {
    if (inimigoAtual.vida <= 0) {
        adicionarLogCombate("Inimigo derrotado!");
        setTimeout(() => { telaPosCombate(); }, 600);
        return;
    }
    turnoInimigo();
}

function turnoInimigo() {
    renderizarTelaCombate("Turno do Inimigo...");
    setTimeout(() => {
        const estado = obterEstado();
        let danoBase = Math.max(1, inimigoAtual.ataque - estado.personagem.defesa);
        if (defending) danoBase = Math.floor(danoBase / 2);

        estado.personagem.vida -= danoBase;
        atualizarEstado({ personagem: estado.personagem });
        atualizarHUD();

        adicionarLogCombate(`Inimigo causou ${danoBase} de dano.`);

        if (estado.personagem.vida <= 0) {
            alert("Você foi derrotado...");
            localStorage.clear();
            location.reload();
            return;
        }
        turnoJogador();
    }, 1000);
}

function telaPosCombate() {
    renderizarTela(`
        <h3 style="color: #52b788; margin: 0;">Fim do Confronto</h3>
        <p style="font-size: 0.85rem;">O que deseja fazer com o ${inimigoAtual.nome}?</p>
        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
            <button id="pos-loot" class="acao-btn">Lootear (+30 Créditos / Placa)</button>
            <button id="pos-poupe" class="acao-btn">Poupar</button>
            <button id="pos-prender" class="acao-btn">Prender</button>
            <button id="pos-matar" class="acao-btn" style="color: #e76f51;">Eliminar</button>
        </div>
    `);

    document.getElementById('pos-loot').addEventListener('click', () => {
        const estado = obterEstado();
        estado.recursos.creditos += 30;
        estado.inventario.push("Placa de Circuito");
        atualizarEstado({ recursos: estado.recursos, inventario: estado.inventario });
        atualizarHUD();
        salvarEscolhaInimigo('lootear');
        alert("Loot coletado com sucesso!");
        iniciarExploracao();
    });

    document.getElementById('pos-poupe').addEventListener('click', () => {
        salvarEscolhaInimigo('poupado');
        iniciarExploracao();
    });

    document.getElementById('pos-prender').addEventListener('click', () => {
        salvarEscolhaInimigo('preso');
        iniciarExploracao();
    });

    document.getElementById('pos-matar').addEventListener('click', () => {
        salvarEscolhaInimigo('eliminado');
        iniciarExploracao();
    });
}

function salvarEscolhaInimigo(escolha) {
    const estado = obterEstado();
    if (!estado.historicoCombates) estado.historicoCombates = [];
    
    estado.historicoCombates.push({
        inimigo: inimigoAtual.nome,
        statusFinal: escolha,
        ciclo: estado.faseAtual
    });
    
    atualizarEstado({ historicoCombates: estado.historicoCombates });
}