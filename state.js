import { carregarJogo, salvarJogo } from './storage.js';

const estadoPadrao = {
    personagem: null, // { nome, classe, vida, maxVida, ataque, defesa }
    faseAtual: 0,
    modo: 'menu', // 'menu', 'exploracao', 'combate', 'loja'
    inventario: [],
    buffs: [],
    recursos: { creditos: 50 }
};

let estadoAtual = carregarJogo() || estadoPadrao;

export function obterEstado() {
    return estadoAtual;
}

export function atualizarEstado(novosDados) {
    estadoAtual = { ...estadoAtual, ...novosDados };
    salvarJogo(estadoAtual);
}