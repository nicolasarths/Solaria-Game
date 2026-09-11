import { registrarAcao, avancarCiclo } from '../engine.js';

registrarAcao({
    titulo: "Avançar Ciclo",
    custo: "Próximo Turno",
    primario: true,
    executar: () => {
        avancarCiclo();
    }
});