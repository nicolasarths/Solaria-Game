import { estado } from './state.js';
import { atualizarInterface, adicionarLog, avancarCiclo } from './engine.js';

document.addEventListener('DOMContentLoaded', () => {
    atualizarInterface();
    adicionarLog("Sistemas online. Bem-vindo a Solaria.");

    document.getElementById('btn-proximo').addEventListener('click', () => {
        avancarCiclo();
    });

    document.getElementById('btn-captar').addEventListener('click', () => {
        estado.recursos.energia += 10;
        adicionarLog("Painéis solares ajustados. +10 ⚡ acumulados.");
        atualizarInterface();
    });

    document.getElementById('btn-explorar').addEventListener('click', () => {
        if (estado.recursos.energia >= 10) {
            estado.recursos.energia -= 10;
            estado.recursos.biomassa += 15;
            adicionarLog("Pesquisa concluída: Novos métodos naturais integrados.");
            atualizarInterface();
        } else {
            adicionarLog("Erro: Energia solar insuficiente para pesquisar.");
        }
    });

    document.getElementById('btn-cultivar').addEventListener('click', () => {
        if (estado.recursos.biomassa >= 20) {
            estado.recursos.biomassa -= 20;
            estado.recursos.comunidade += 2;
            adicionarLog("Área verde expandida. Novos membros integrados.");
            atualizarInterface();
        } else {
            adicionarLog("Erro: Biomassa insuficiente para expansão.");
        }
    });
});