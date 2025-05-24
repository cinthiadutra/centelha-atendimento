export interface ConfigConsulta {
  falange: Falange;
  duracao: number; // em minutos
  limitePorMedium: number;
}

export enum Falange {
  Caboclo = 'Caboclo ou Cabocla',
  PretoVelho = 'Preto Velho ou Preta Velha',
  Exu = 'Exu ou Pomba Gira',
  Baiano = 'Baiano ou Baiana',
  Malandro = 'Malandro ou Malandra',
  cigano = 'Cigano ou Cigana',
  marinheiro = 'Marinheiro',
}
