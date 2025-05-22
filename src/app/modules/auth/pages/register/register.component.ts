import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email = '';
  password = '';
  role: 'admin' | 'medium' = 'medium'; // default
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  registrar() {
    this.authService
      .register(this.email, this.password, this.role)
      .then(() => {
        this.router.navigate([this.role === 'admin' ? '/admin' : '/medium-area']);
      })
      .catch(() => {
        this.error = 'Erro ao registrar usuário.';
      });
  }
  voltar() {
    this.router.navigate(['/login']);
  }
}
