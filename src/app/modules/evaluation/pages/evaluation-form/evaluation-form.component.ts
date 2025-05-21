import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-evaluation-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.scss'],
})
export class EvaluationFormComponent {
  senha: string = '';
  avaliacao: number = 0;

  emoticons = [
    { nota: 1, emoji: '😡', label: 'Muito Ruim' },
    { nota: 2, emoji: '🙁', label: 'Ruim' },
    { nota: 3, emoji: '😐', label: 'Regular' },
    { nota: 4, emoji: '🙂', label: 'Bom' },
    { nota: 5, emoji: '🤩', label: 'Excelente' },
  ];

  enviarAvaliacao() {
    if (!this.senha || this.avaliacao === 0) return;

    // Aqui pode salvar no Firestore ou serviço backend futuramente
    console.log('Avaliação enviada:', {
      senha: this.senha,
      nota: this.avaliacao,
    });

    alert('Obrigado por sua avaliação!');
    this.senha = '';
    this.avaliacao = 0;
  }
}
