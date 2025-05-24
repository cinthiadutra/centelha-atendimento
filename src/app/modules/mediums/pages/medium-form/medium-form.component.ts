import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';

import { MediumService } from '../../../presence/service/medium.service';
import { Fita, Medium, Nucleo } from '../../../presence/models/medium.model';
import { Falange } from '../../../config/models/config.model';

@Component({
  selector: 'app-medium-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
  ],
  templateUrl: './medium-form.component.html',
  styleUrls: ['./medium-form.component.scss'],
})
export class MediumFormComponent implements OnInit {
  nome = '';
  fita: Fita = Fita.Verde;
  nucleo: Nucleo = Nucleo.ccu;
  falangeGuiaMap: Record<Falange, string> = {
    [Falange.Caboclo]: '',
    [Falange.PretoVelho]: '',
    [Falange.Exu]: '',
    [Falange.Baiano]: '',
    [Falange.Malandro]: '',
    [Falange.cigano]: '',
    [Falange.marinheiro]: '',
  };

  lista$!: Observable<Medium[]>;

  falanges = Object.values(Falange);
  fitas = Object.values(Fita);
  nucleos = Object.values(Nucleo);

  constructor(private mediumService: MediumService) {}

  ngOnInit(): void {
    this.lista$ = this.mediumService.getMediums();
  }

  isFormValid(): boolean {
    const allFalangesFilled = Object.values(this.falangeGuiaMap).every(val => val.trim() !== '');
    const allFalangesPresent = Object.keys(this.falangeGuiaMap).length === Object.values(Falange).length;
    return this.nome.trim() !== '' && this.nucleo !== undefined && allFalangesFilled && allFalangesPresent;
  }

  getFitaLabel(f: Fita): string {
    return Fita[f as keyof typeof Fita];
  }

  getNucleoLabel(n: Nucleo): string {
    return Nucleo[n as unknown as keyof typeof Nucleo];
  }

  async adicionar() {
    if (!this.isFormValid()) return;

    const medium: Medium = {
      id: '',
      name: this.nome,
      fita: this.fita,
      falange: this.falangeGuiaMap,
      isPresent: false,
      nucleo: this.nucleo,
    };

    await this.mediumService.saveMedium(medium);

    this.nome = '';
    this.fita = Fita.Verde;
    this.nucleo = Nucleo.ccu;
    Object.keys(this.falangeGuiaMap).forEach(key => this.falangeGuiaMap[key as Falange] = '');
  }
}