import { obterEstado, atualizarEstado } from '../../state.js';
import { adicionarLogCombate } from '../combate.js';

export function usarPocaoVida() {
    const estado = obterEstado();
    const index = estado.inventario.indexOf("Poção de Vida");
    
    if (index === -1) {
        adicionarLogCombate("Você não tem Poções de Vida no inventário!");
        return false;
    }

    // Remove do inventário
    estado.inventario.splice(index, 1);
    
    // Modifica o cache (recupera vida)
    estado.personagem.vida = Math.min(estado.personagem.maxVida, estado.personagem.vida + 40);
    atualizarEstado({ personagem: estado.personagem, inventario: estado.inventario });

    adicionarLogCombate("Você usou uma Poção de Vida e recuperou 40 HP.");
    return true;
}