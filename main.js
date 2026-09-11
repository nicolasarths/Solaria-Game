import { estado } from './state.js';
import { atualizarInterface, adicionarLog, avancarCiclo } from './engine.js';

document.addEventListener('DOMContentLoaded', () => {
    atualizarInterface();
    adicionarLog("Bem-vindo a Solaria. Estabeleça seu futuro sustentável.");

    document.getElementById('btn-proximo').addEventListener('click', () => {
        avancarCiclo();
    });

    document.getElementById('btn-explorar').addEventListener('click', () => {
        if (estado.recursos.energia >= 10) {
            estado.recursos.energia -= 10;
            estado.recursos.biomassa += 15;
            adicionarLog("Pesquisa concluída: Novos métodos de integração natural descobertos.");
            atualizarInterface();
        } else {
            adicionarLog("Energia solar insuficiente para pesquisar.");
        }
    });

    document.getElementById('btn-cultivar').addEventListener('click', () => {
        if (estado.recursos.biomassa >= 20) {
            estado.recursos.biomassa -= 20;
            estado.recursos.comunidade += 2;
            adicionarLog("Área verde expandida. Novos membros se juntaram à comunidade.");
            atualizarInterface();
        } else {
            adicionarLog("Biomassa insuficiente para expansão.");
        }
    });
});