import { registrarAcao, adicionarLog, atualizarInterface } from '../engine.js';
import { estado } from '../state.js';

registrarAcao({
    titulo: "Pesquisar",
    custo: "-10 ⚡ | +15 🌱",
    primario: false,
    executar: () => {
        if (estado.recursos.energia >= 10) {
            estado.recursos.energia -= 10;
            estado.recursos.biomassa += 15;
            adicionarLog("Pesquisa concluída: Novos métodos naturais integrados.");
            atualizarInterface();
        } else {
            adicionarLog("Erro: Energia solar insuficiente para pesquisar.");
        }
    }
});