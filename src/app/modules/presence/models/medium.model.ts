import { Injectable, signal } from '@angular/core';
import { Falange } from '../../config/models/config.model';

export interface Medium {
  id: string;
  name: string;
  nucleo: Nucleo;
  fita: Fita;
  isPresent: boolean;
  falange: Record<Falange, String>; 
}
export enum Fita {
  Verde = 'Verde',
  Amarela = 'Amarela',
  Azul = 'Azul',
  Dirigente = 'Dirigente'
}
export enum Nucleo {
  ccu = 'CCU',
  cpo = 'CPO',
  
}


@Injectable({ providedIn: 'root' })
export class MediumService {
  private _mediums = signal<Medium[]>([]);
  public mediums = this._mediums.asReadonly();

  loadMediums(): void {
    // Simulação de carga inicial
    this._mediums.set([
      {
        id: '1',
        name: 'João da Luz',
        nucleo: Nucleo.ccu,
        fita: Fita.Verde,
        isPresent: false,
        falange:{
          [Falange.Caboclo]: 'Cabocla Jurema',
          [Falange.PretoVelho]: 'Pai Joaquim',
          [Falange.Exu]: 'Exu Caveira',
          [Falange.Baiano]: 'Baiana da Praia',
          [Falange.Malandro]: 'Malandro do Rio',
          [Falange.cigano]: 'Cigano do Oriente',
          [Falange.marinheiro]: 'Marinheiro do Mar',
        },
      },
      {
        id: '2',
        name: 'Cinthia Dutra',
        nucleo: Nucleo.ccu,
        fita: Fita.Verde,
        isPresent: false,
        falange:{
          [Falange.Caboclo]: 'Cabocla Jurema',
          [Falange.PretoVelho]: 'Pai Antonio',
          [Falange.Exu]: 'Pg Sete Catacumbas',
          [Falange.Baiano]: 'Baiana Maria do Morro',
          [Falange.Malandro]: 'Malandrinha da Calunga',
          [Falange.cigano]: 'Cigana da Estrada',
          [Falange.marinheiro]: 'Marinheiro Zé da Proa',
        },
      },
    ]);
  }

  togglePresence(id: string): void {
    this._mediums.update(mediums =>
      mediums.map(m => m.id === id ? { ...m, isPresent: !m.isPresent } : m)
    );
  }
}
