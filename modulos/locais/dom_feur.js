export const dom_feur = {
    nome: "Dom Feur",
    descricao: "Terras de horizontes amplos e antigas fortificações.",
    locais: [
        { 
            id: "estabulo", 
            nome: "Estábulo", 
            npcsPresentes: ["zelador_joao"],
            acoes: [
                { id: "comprar_ferradura", nome: "Comprar Ferradura (-10 Créditos)", custo: 10, tipo: "item", item: "Ferradura de Aço" },
                { id: "conversar_zelador", nome: "Conversar com o Zelador", tipo: "dialogo", npc: "zelador_joao" }
            ]
        },
        { 
            id: "asilo", 
            nome: "Asilo", 
            npcsPresentes: [],
            acoes: [
                { id: "descansar", nome: "Descansar na varanda (Recupera Vida)", tipo: "cura", valor: 20 }
            ]
        }
    ]
};