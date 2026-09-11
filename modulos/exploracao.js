import { renderizarTela } from '../engine.js';
import { iniciarCombate } from './combate.js';
import { iniciarLoja } from './loja.js';

export function iniciarExploracao() {
    renderizarTela(`
        <h3 style="color: #74c69d; margin: 0;">Fase 1: Setor Alfa</h3>
        <p style="font-size: 0.85rem; line-height: 1.4;">Você adentra os corredores abandonados do complexo solar. O ar cheira a ozônio e terra molhada.</p>
        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
            <button id="ir-combate" class="acao-btn">Investigar Ruído Suspeito (Combate)</button>
            <button id="ir-loja" class="acao-btn">Encontrar Comerciante Itinerante (Loja)</button>
        </div>
    `);

    document.getElementById('ir-combate').addEventListener('click', () => iniciarCombate());
    document.getElementById('ir-loja').addEventListener('click', () => iniciarLoja());
}