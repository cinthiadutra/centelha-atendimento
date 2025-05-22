import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc
} from '@angular/fire/firestore';
import { MediumService } from '../../../presence/service/medium.service';


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
  senha = '';
  avaliacao = 0;
  error = '';
  emoticons = [
    { nota: 1, emoji: '😡', label: 'Muito Ruim' },
    { nota: 2, emoji: '🙁', label: 'Ruim' },
    { nota: 3, emoji: '😐', label: 'Regular' },
    { nota: 4, emoji: '🙂', label: 'Bom' },
    { nota: 5, emoji: '🤩', label: 'Excelente' },
  ];

  constructor(private firestore: Firestore, private mediumService: MediumService) {}

  async enviarAvaliacao() {
    if (!this.senha || this.avaliacao === 0) {
      this.error = 'Preencha todos os campos.';
      return;
    }

    // Buscar consulta pela senha
    const q = query(collection(this.firestore, 'consultas'), where('senha', '==', this.senha));
    const result = await getDocs(q);

    if (result.empty) {
      this.error = 'Consulta não encontrada.';
      return;
    }

    const consultaDoc = result.docs[result.docs.length - 1]; // última consulta com essa senha
    const consultaData = consultaDoc.data() as any;

    // Atualizar com nota
    await updateDoc(consultaDoc.ref, {
      nota: this.avaliacao,
    });

    // Marcar médium como disponível (presente: false)
    if (consultaData.mediumId) {
      await this.mediumService.updatePresenca(consultaData.mediumId, false);
    }

    alert('Avaliação enviada com sucesso!');
    this.senha = '';
    this.avaliacao = 0;
    this.error = '';
  }
}
