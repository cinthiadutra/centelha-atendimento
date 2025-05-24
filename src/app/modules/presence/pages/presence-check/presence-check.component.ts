import { Component, inject, OnInit, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { Fita, MediumService } from '../../models/medium.model';
import { ToastService } from '../../../../core/services/toast';

@Component({
  selector: 'app-presence-check',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatButtonModule,
  ],
  templateUrl: './presence-check.component.html',
  styleUrls: ['./presence-check.component.scss'],
})
export class PresenceCheckComponent implements OnInit {
  private mediumService = inject(MediumService);
  private toast = inject(ToastService);

  mediums = this.mediumService.mediums; // Signal<Medium[]>

  greenRibbonMediums = computed(() => this.mediums().filter(m => m.fita === Fita.Verde));
  yellowRibbonMediums = computed(() => this.mediums().filter(m => m.fita === Fita.Amarela));

  ngOnInit(): void {
    this.mediumService.loadMediums();
  }

  togglePresence(id: string): void {
    this.mediumService.togglePresence(id);
    const medium = this.mediums().find(m => m.id === id);
    if (medium) {
      this.toast.show(
        medium.isPresent ? 'Médium marcado como Ausente' : 'Médium marcado como Presente',
        `${medium.name} foi marcado como ${medium.isPresent ? 'ausente' : 'presente'}.`
      );
    }
  }
}
