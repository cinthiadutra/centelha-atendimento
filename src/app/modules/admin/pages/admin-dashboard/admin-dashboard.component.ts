import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
  import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { httpsCallable } from '@angular/fire/functions';
import { Functions } from '@angular/fire/functions';
import { doc, setDoc } from '@angular/fire/firestore';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  consultas: any[] = [];
  filtradas: any[] = [];
  mediums: string[] = [];
  mediumSelecionado = '';
  mediaSelecionada = 0;

  constructor(private firestore: Firestore, private functions: Functions, private authService: AuthService,
    private router: Router,) { }

  async ngOnInit() {
    const snapshot = await getDocs(collection(this.firestore, 'consultas'));
    this.consultas = snapshot.docs.map(doc => doc.data());

    this.mediums = Array.from(new Set(this.consultas.map(c => c.mediumNome)));
  }

  filtrar() {
    this.filtradas = this.consultas.filter(c => c.mediumNome === this.mediumSelecionado && c.nota !== undefined);
    this.calcularMedia();
  }

  calcularMedia() {
    if (this.filtradas.length === 0) {
      this.mediaSelecionada = 0;
      return;
    }
    const soma = this.filtradas.reduce((acc, c) => acc + c.nota, 0);
    this.mediaSelecionada = soma / this.filtradas.length;
  }


gerarPDF() {
  if (this.filtradas.length === 0) return;

  const doc = new jsPDF();

  doc.text(`Relatório de Avaliação - Médium: ${this.mediumSelecionado}`, 14, 15);

  autoTable(doc, {
    head: [['Data', 'Guia', 'Senha', 'Nota']],
    body: this.filtradas.map(c => [
      new Date(c.inicio.toDate?.() ?? c.inicio).toLocaleDateString(),
      c.guia,
      c.senha,
      c.nota + ' ⭐',
    ]),
    startY: 25,
  });

  doc.text(`Média: ${this.mediaSelecionada.toFixed(2)} ⭐`, 14, (doc as any).lastAutoTable.finalY + 10);


  doc.save(`avaliacoes-${this.mediumSelecionado}.pdf`);
}
async enviarPush(token: string) {
  const push = httpsCallable(this.functions, 'enviarPushNota');
  const result = await push({
    token,
    medium: this.mediumSelecionado,
    media: this.mediaSelecionada
  });

  if ((result as any).data.success) {
    alert('Push enviado com sucesso!');
  } else {
    alert('Falha ao enviar push.');
  }
}
async gerarResumoGeral() {
  // Agrupar por médium
  const agrupado: Record<string, number[]> = {};

  for (const consulta of this.consultas) {
    if (!consulta.mediumNome || consulta.nota === undefined) continue;

    if (!agrupado[consulta.mediumNome]) {
      agrupado[consulta.mediumNome] = [];
    }

    agrupado[consulta.mediumNome].push(consulta.nota);
  }

  // Gerar array de objetos com média
  const medias = Object.entries(agrupado).map(([medium, notas]) => ({
    medium,
    media: +(notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2),
    totalAvaliacoes: notas.length,
  }));

  // Salvar no Firestore
  const ref = doc(this.firestore, 'admin', 'relatorio_hoje');
  await setDoc(ref, {
    geradoEm: new Date(),
    medias,
  });

  alert('Relatório geral gerado com sucesso!');
}
logout() {
  this.authService.logout().then(() => this.router.navigate(['/login']));
}

}
