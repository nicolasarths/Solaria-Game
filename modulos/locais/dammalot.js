export const dammalot = {
    nome: "Dammalòt",
    descricao: "Domínio imponente marcado por grandiosidade e mistério.",
    locais: [
        { 
            id: "fortaleza_real", 
            nome: "Fortaleza Real", 
            npcsPresentes: [],
            acoes: [
                { id: "patrulhar", nome: "Investigar Portões", tipo: "evento", desc: "Você encontra apenas guardas atentos." }
            ]
        },
        { 
            id: "carola_oculis", 
            nome: "Carola Oculis", 
            npcsPresentes: [],
            acoes: [
                { id: "observar_astros", nome: "Observar os Astros (+5 PM)", tipo: "pm", valor: 5 }
            ]
        }
    ]
};