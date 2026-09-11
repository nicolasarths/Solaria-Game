import { obterEstado, atualizarEstado } from '../../state.js';
import { adicionarLogCombate } from '../combate.js';

export function usarEscudoTermico() {
    const estado = obterEstado();
    const index = estado.inventario.indexOf("Escudo Térmico");
    
    if (index === -1) {
        adicionarLogCombate("Você não tem Escudo Térmico!");
        return false;
    }

    estado.inventario.splice(index, 1);
    
    // Adiciona um buff temporário de defesa no cache
    estado.buffs.push("Escudo Térmico (+10 Defesa)");
    estado.personagem.defesa += 10;
    
    atualizarEstado({ personagem: estado.personagem, inventario: estado.inventario, buffs: estado.buffs });

    adicionarLogCombate("Escudo Térmico ativado! +10 de Defesa temporária.");
    return true;
}