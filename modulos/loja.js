import { renderizarTela, atualizarHUD } from '../engine.js';
import { obterEstado, atualizarEstado } from '../state.js';
import { iniciarExploracao } from './exploracao.js';

export function iniciarLoja() {
    renderizarTela(`
        <h3 style="color: #e9c46a; margin: 0;">Mercador de Solaria</h3>
        <p style="font-size: 0.85rem;">"Leve suprimentos frescos, viajante."</p>
        <button id="comprar-poco" class="acao-btn">Comprar Poção de Vida (Custo: 20 💎)</button>
        <button id="sair-loja" class="acao-btn" style="margin-top: 10px;">Voltar à Exploração</button>
    `);

    document.getElementById('comprar-poco').addEventListener('click', () => {
        const estado = obterEstado();
        if (estado.recursos.creditos >= 20) {
            estado.recursos.creditos -= 20;
            estado.inventario.push("Poção de Vida");
            atualizarEstado({ recursos: estado.recursos, inventario: estado.inventario });
            atualizarHUD(); // Atualiza a HUD na hora
            alert("Item adquirido!");
        } else {
            alert("Créditos insuficientes.");
        }
    });

    document.getElementById('sair-loja').addEventListener('click', () => iniciarExploracao());
}