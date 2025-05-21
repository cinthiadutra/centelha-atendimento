export interface ConfigConsulta {
  falange: Falange;
  duracao: number; // em minutos
  limitePorMedium: number;
}

export enum Falange {
  Caboclo = 'Caboclo',
  PretoVelho = 'Preto Velho',
  Exu = 'Exu',
  Baiano = 'Baiano',
  Criança = 'Criança',
}
