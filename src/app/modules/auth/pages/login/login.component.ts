import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  role = 'medium'; // Default role

  constructor(private authService: AuthService, private router: Router) {}

  login() {
  this.authService.login(this.email, this.password)
    .then(async () => {
      const user = this.authService.currentUser;
      if (!user) throw new Error();

      const role = await this.authService.getUserRole(user.uid);
      if (role === 'admin') {
        this.router.navigate(['/admin']);
      } else if (role === 'medium') {
        this.router.navigate(['/medium-area']);
      } else {
        this.error = 'Usuário sem permissão.';
      }
    })
    .catch(() => this.error = 'Email ou senha inválidos.');
}


 registrar() {
  this.router.navigate(['/register']);
}


}
