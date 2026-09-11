import { registrarAcao, adicionarLog, atualizarInterface } from '../engine.js';
import { estado } from '../state.js';

registrarAcao({
    titulo: "Acumular Sol",
    custo: "+10 ⚡",
    primario: false,
    executar: () => {
        estado.recursos.energia += 10;
        adicionarLog("Painéis solares ajustados. +10 ⚡ acumulados.");
        atualizarInterface();
    }
});