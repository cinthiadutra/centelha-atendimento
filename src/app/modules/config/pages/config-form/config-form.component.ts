import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { ConfigService } from '../../service/config.service';
import { ConfigConsulta, Falange } from '../../models/config.model';

@Component({
  selector: 'app-config-form',
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
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss'],
})
export class ConfigFormComponent {
  falanges = Object.values(Falange);
  falange!: Falange;
  duracao!: number;
  limite!: number;

  constructor(private configService: ConfigService, private router: Router) { }

  onSubmit() {
    const config: ConfigConsulta = {
      falange: this.falange,
      duracao: this.duracao,
      limitePorMedium: this.limite,
    };
    this.configService.setConfig(config);
    this.router.navigate(['/presence']);
  }
}
