import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule],
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit {
  historico: Atendimento[] = [];
  mediaGeral: number = 0;

  displayedColumns = ['data', 'medium', 'guia', 'avaliacao'];

  ngOnInit(): void {
    // Simulação de histórico (futuramente virá do Firestore)
    this.historico = [
      {
        data: new Date('2024-05-01'),
        medium: 'João da Mata',
        guia: 'Caboclo Sete Flechas',
        avaliacao: 5,
      },
      {
        data: new Date('2024-05-02'),
        medium: 'Maria das Almas',
        guia: 'Preto Velho Benedito',
        avaliacao: 4,
      },
      {
        data: new Date('2024-05-03'),
        medium: 'Carlos Ogum',
        guia: 'Ogum Beira-Mar',
        avaliacao: 3,
      },
    ];

    this.calcularMedia();
  }

  calcularMedia() {
    const total = this.historico.reduce((acc, item) => acc + item.avaliacao, 0);
    this.mediaGeral = total / this.historico.length;
  }
}

interface Atendimento {
  data: Date;
  medium: string;
  guia: string;
  avaliacao: number;
}
