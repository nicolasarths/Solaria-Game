import { atualizarInterface, adicionarLog, obterAcoes } from './engine.js';

// Importa automaticamente todos os arquivos de ação da pasta
import './acoes/captar.js';
import './acoes/explorar.js';
import './acoes/cultivar.js';
import './acoes/proximo.js';

document.addEventListener('DOMContentLoaded', () => {
    atualizarInterface();
    adicionarLog("Sistemas online. Bem-vindo a Solaria.");

    const painelAcoes = document.getElementById('painel-acoes');
    painelAcoes.innerHTML = '';

    // Lê todas as ações registradas e cria os botões dinamicamente
    obterAcoes().forEach(acao => {
        const btn = document.createElement('button');
        btn.className = `acao-btn ${acao.primario ? 'primario' : ''}`;
        
        btn.innerHTML = `
            <span class="titulo-acao">${acao.titulo}</span>
            <small class="custo-acao">${acao.custo}</small>
        `;

        btn.addEventListener('click', acao.executar);
        painelAcoes.appendChild(btn);
    });
});