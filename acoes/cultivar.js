import { registrarAcao, adicionarLog, atualizarInterface } from '../engine.js';
import { estado } from '../state.js';

registrarAcao({
    titulo: "Expandir",
    custo: "-20 🌱 | +2 👥",
    primario: false,
    executar: () => {
        if (estado.recursos.biomassa >= 20) {
            estado.recursos.biomassa -= 20;
            estado.recursos.comunidade += 2;
            adicionarLog("Área verde expandida. Novos membros integrados.");
            atualizarInterface();
        } else {
            adicionarLog("Erro: Biomassa insuficiente para expansão.");
        }
    }
});