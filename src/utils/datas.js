export function calcularDias(dataInicio, dataFim) {
  const inicio = new Date(`${dataInicio}T00:00:00`);
  const fim = new Date(`${dataFim}T00:00:00`);
  const difDias = Math.round((fim - inicio) / (1000 * 60 * 60 * 24));
  return difDias + 1;
}

export function calcularTotal(precoDia, totalDias) {
  return precoDia * totalDias;
}

export function validarData(dataInicio, dataFim) {
  const erros = {};
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  if (!dataInicio) {
    erros.inicio = 'A data de início é obrigatória.';
  } else if (new Date(`${dataInicio}T00:00:00`) < hoje) {
    erros.inicio = 'A data de início não pode ser no passado.';
  }

  if (!dataFim) {
    erros.fim = 'A data de fim é obrigatória.';
  } else if (new Date(`${dataFim}T00:00:00`) < hoje) {
    erros.fim = 'A data de fim não pode ser no passado.';
  }

  if (
    !erros.inicio &&
    !erros.fim &&
    new Date(`${dataFim}T00:00:00`) < new Date(`${dataInicio}T00:00:00`)
  ) {
    erros.fim = 'A data de fim tem de ser igual ou posterior à data de início.';
  }

  return erros;
}