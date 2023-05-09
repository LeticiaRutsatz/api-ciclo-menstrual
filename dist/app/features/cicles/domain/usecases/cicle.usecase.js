"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CicleUseCase = void 0;
const repositories_1 = require("../../infra/repositories");
class CicleUseCase {
    async execute(cicleDTO) {
        const moment = require('moment');
        const { startDate, endDate, flow, userId, symptoms } = cicleDTO;
        const cicleRepository = new repositories_1.CicleRepository();
        const duracaoCiclo = 28;
        const duracaoFaseLutea = 14;
        const calc = new Date(endDate).getTime() - new Date(startDate).getTime();
        const cicleDays = Math.round(calc / (24 * 60 * 60 * 1000));
        const diaOvulacao = new Date(new Date(startDate).getTime() + (duracaoCiclo - duracaoFaseLutea) * 24 * 60 * 60 * 1000);
        const inicioFertilidade = new Date(diaOvulacao.getTime() - 5 * 24 * 60 * 60 * 1000);
        const fimFertilidade = new Date(diaOvulacao.getTime() + 4 * 24 * 60 * 60 * 1000);
        const requestCicle = {
            startDate: startDate,
            endDate: endDate,
            flow,
            symptoms: symptoms ? symptoms : undefined,
            duration: `${cicleDays} dias`,
            fertileDays: `Inicia em ${moment(inicioFertilidade).format('YYYY/MM/DD')} e termina em ${moment(fimFertilidade).format('YYYY/MM/DD')}`,
            ovulationDay: diaOvulacao.toISOString().substring(0, 10),
            userId,
        };
        const newCicle = await cicleRepository.saveNewCicle(requestCicle);
        console.log('cicle repository', requestCicle);
        return newCicle;
    }
}
exports.CicleUseCase = CicleUseCase;
