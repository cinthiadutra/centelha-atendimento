import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

import { Medium } from '../../../presence/models/medium.model';
import { MediumService } from '../../service/medium.service';

@Component({
  selector: 'app-presence-check',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './presence-check.component.html',
  styleUrls: ['./presence-check.component.scss']
})
export class PresenceCheckComponent implements OnInit {
  mediuns$!: Observable<Medium[]>;
  mediunsSelecionados: Set<string> = new Set();

  constructor(
    private mediumService: MediumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mediuns$ = this.mediumService.getMediums();
  }

  togglePresenca(medium: Medium) {
    if (this.mediunsSelecionados.has(medium.id)) {
      this.mediunsSelecionados.delete(medium.id);
    } else {
      this.mediunsSelecionados.add(medium.id);
    }
  }

  confirmarPresencas(mediuns: Medium[]) {
    mediuns.forEach(m => {
      const presente = this.mediunsSelecionados.has(m.id);
      this.mediumService.updatePresenca(m.id, presente);
    });

    this.router.navigate(['/consultation']);
  }

  isSelecionado(id: string): boolean {
    return this.mediunsSelecionados.has(id);
  }
}
