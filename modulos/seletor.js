import { atualizarEstado } from '../state.js';
import { atualizarHUD, renderizarTela } from '../engine.js';
import { iniciarExploracao } from './exploracao.js';

const personagensDisponiveis = [
    {
        id: 'engenheiro',
        nome: 'Kaelen (Engenheiro Cético)',
        vida: 120,
        maxVida: 120,
        ataque: 15,
        defesa: 10,
        descricao: 'Especialista em tecnologia pesada e reparos rápidos.'
    },
    {
        id: 'botanica',
        nome: 'Lyra (Guardiã Botânica)',
        vida: 90,
        maxVida: 90,
        ataque: 22,
        defesa: 6,
        descricao: 'Usa toxinas naturais e alta agilidade ofensiva.'
    }
];

export function iniciarSeletor() {
    let html = `<h2 style="color: #52b788; text-align: center; margin: 0;">Escolha seu Operador</h2><div style="display: flex; flex-direction: column; gap: 10px;">`;
    
    personagensDisponiveis.forEach(p => {
        html += `
            <button class="acao-btn selecionar-heroi" data-id="${p.id}" style="text-align: left; padding: 10px;">
                <strong>${p.nome}</strong><br>
                <small>❤️ ${p.maxVida} | ⚔️ ${p.ataque} | 🛡️ ${p.defesa}</small><br>
                <span style="font-size: 0.7rem; color: #8da995;">${p.descricao}</span>
            </button>
        `;
    });
    html += `</div>`;

    renderizarTela(html);

    document.querySelectorAll('.selecionar-heroi').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            const escolhido = personagensDisponiveis.find(p => p.id === id);
            
            atualizarEstado({ personagem: escolhido, faseAtual: 1, modo: 'exploracao' });
            atualizarHUD();
            iniciarExploracao();
        });
    });
}