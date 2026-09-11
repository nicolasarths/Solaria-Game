let estado = {
    personagem: {
        nome: "Kaelen",
        classe: "Engenheiro Cético",
        vida: 114,
        maxVida: 120,
        pm: 10,
        maxPm: 50,
        ataque: 14,
        bonusAtaque: 2,
        defesa: 8,
        bonusDefesa: 1,
        cd: 12
    },
    recursos: { 
        creditos: 20 
    },
    inventario: ["Poção de Vida", "Placa de Circuito"],
    
    // Cada NPC tem seu próprio JSON/objeto independente
    npcs: {
        "rodrigo_ferro": {
            id: "rodrigo_ferro",
            nome: "Rodrigo",
            reino: "Solaria",
            local: "Setor Alfa",
            humor: "neutro",
            dialogoAtual: "Precisa de peças ou sobrou sucata?",
            inventarioLoja: ["Cabo de Fibra", "Bateria de Íon"]
        },
        "mestre_vatus": {
            id: "mestre_vatus",
            nome: "Mestre Vatus",
            reino: "Cidadela de Aethel",
            local: "Templo de Ferro",
            humor: "amigavel",
            dialogoAtual: "O conhecimento mecânico é a única verdade.",
            inventarioLoja: []
        }
    },

    // Cada Reino/Local gerencia seu contexto
    reinos: {
        "Solaria": {
            nome: "Solaria",
            locais: ["Setor Alfa", "Laboratório Central"],
            npcsLocais: ["rodrigo_ferro"]
        },
        "Cidadela de Aethel": {
            nome: "Cidadela de Aethel",
            locais: ["Praça dos Motores", "Templo de Ferro"],
            npcsLocais: ["mestre_vatus"]
        }
    },

    localizacao: { 
        reino: "Solaria", 
        local: "Setor Alfa", 
        estadoAtual: "exploracao" 
    }
};

export function obterEstado() {
    return JSON.parse(JSON.stringify(estado));
}

export function atualizarEstado(novosDados) {
    // Mescla o estado global preservando objetos internos como recursos e personagem
    estado = {
        ...estado,
        ...novosDados,
        personagem: { ...estado.personagem, ...(novosDados.personagem || {}) },
        recursos: { ...estado.recursos, ...(novosDados.recursos || {}) },
        localizacao: { ...estado.localizacao, ...(novosDados.localizacao || {}) }
    };
    localStorage.setItem('solaria_save', JSON.stringify(estado));
}

export function carregarEstado() {
    const salvo = localStorage.getItem('solaria_save');
    if (salvo) {
        estado = JSON.parse(salvo);
    }
    return obterEstado();
}