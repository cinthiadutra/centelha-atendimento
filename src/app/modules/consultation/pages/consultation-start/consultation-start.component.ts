import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { Medium } from '../../../presence/models/medium.model';
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
    MatButtonModule
  ],
  templateUrl: './consultation-start.component.html',
  styleUrls: ['./consultation-start.component.scss']
})
export class ConsultationStartComponent implements OnInit {
  senha: string = '';
  mediumSelecionado!: Medium;
  mediunsDisponiveis: Medium[] = [];

  tempoRestante: number = 0; // em segundos
  intervalo: any;
  statusCor: string = 'normal'; // 'normal', 'amarelo', 'vermelho'

  constructor(
    private mediumService: MediumService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    const config = this.configService.getConfig();
    if (!config) return;

    this.mediunsDisponiveis = this.mediumService
      .getPresentes()
      .filter(m => m.guias.length > 0);
  }

  iniciarConsulta() {
    const config = this.configService.getConfig();
    if (!this.mediumSelecionado || !this.senha || !config) return;

    this.tempoRestante = config.duracao * 60;
    this.statusCor = 'normal';

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
