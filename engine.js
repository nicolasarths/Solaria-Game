import { estado } from './state.js';

export function adicionarLog(mensagem) {
    const logDiv = document.getElementById('log-historico');
    const p = document.createElement('p');
    p.style.margin = '0';
    p.textContent = `> ${mensagem}`;
    logDiv.appendChild(p);
    logDiv.scrollTop = logDiv.scrollHeight;
}

export function atualizarInterface() {
    document.getElementById('ciclo-texto').textContent = `Ciclo ${estado.ciclo}`;
    document.getElementById('res-biomassa').textContent = estado.recursos.biomassa;
    document.getElementById('res-energia').textContent = estado.recursos.energia;
    document.getElementById('res-comunidade').textContent = estado.recursos.comunidade;
}

export function avancarCiclo() {
    estado.ciclo++;
    estado.recursos.biomassa += Math.floor(estado.recursos.comunidade * 1.5);
    estado.recursos.energia += 5;
    adicionarLog(`Ciclo ${estado.ciclo} iniciado. Colônia produziu recursos.`);
    atualizarInterface();
}