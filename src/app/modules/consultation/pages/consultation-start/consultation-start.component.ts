import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { Medium } from '../../../presence/models/medium.model';

import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Timestamp } from 'firebase/firestore';
import { MediumService } from '../../../presence/service/medium.service';
import { ConfigService } from '../../../config/service/config.service';

@Component({
  selector: 'app-consultation-start',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './consultation-start.component.html',
  styleUrls: ['./consultation-start.component.scss'],
})
export class ConsultationStartComponent implements OnInit {
  senha = '';
  mediumSelecionado!: Medium;
  mediunsDisponiveis: Medium[] = [];

  tempoRestante = 0;
  statusCor = 'normal';
  intervalo: any;

  constructor(
    private mediumService: MediumService,
    private configService: ConfigService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.mediumService.getMediums().subscribe(mediuns => {
      this.mediunsDisponiveis = mediuns.filter(m => m.fita && m.isPresent === true);
    });
  }

  async iniciarConsulta() {
    const config = this.configService.getConfig();
    if (!config || !this.mediumSelecionado || !this.senha) return;

    this.tempoRestante = config.duracao * 60;
    this.statusCor = 'normal';

    // salvar no Firestore
    await addDoc(collection(this.firestore, 'consultas'), {
      senha: this.senha,
      mediumId: this.mediumSelecionado.id,
      mediumNome: this.mediumSelecionado.name,
      guia: this.mediumSelecionado.falange['Baiano ou Baiana'],
      inicio: Timestamp.fromDate(new Date()),
      duracaoMin: config.duracao,
    });

    this.intervalo = setInterval(() => {
      this.tempoRestante--;

      if (this.tempoRestante <= 300) this.statusCor = 'vermelho';
      else if (this.tempoRestante <= 600) this.statusCor = 'amarelo';

      if (this.tempoRestante <= 0) {
        clearInterval(this.intervalo);
      }
    }, 1000);
  }

  formatarTempo(segundos: number): string {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
}
