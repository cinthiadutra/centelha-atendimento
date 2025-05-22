import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { Medium } from '../../../presence/models/medium.model';
import { Observable } from 'rxjs';
import { MediumService } from '../../../presence/service/medium.service';

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
  fita: 'verde' | 'amarela' = 'verde';
  guia = '';
  falange = '';

  lista$!: Observable<Medium[]>; // lista reativa do Firestore

  constructor(private mediumService: MediumService) {}

  ngOnInit(): void {
    this.lista$ = this.mediumService.getMediums();
  }

  async adicionar() {
    if (!this.nome || !this.guia || !this.falange) return;

    const medium: Medium = {
      id: '', // será gerado pelo Firestore
      nome: this.nome,
      fita: this.fita,
      guias: [this.guia],
      falange: this.falange,
      presente: false,
    };

    await this.mediumService.saveMedium(medium);

    // limpar campos
    this.nome = '';
    this.fita = 'verde';
    this.guia = '';
    this.falange = '';
  }
}
