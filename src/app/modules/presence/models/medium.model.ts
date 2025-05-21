export interface Medium {
  id: string;
  nome: string;
  fita: 'verde' | 'amarela';
  guias: string[];
  falange: string;       
  presente?: boolean;
}
