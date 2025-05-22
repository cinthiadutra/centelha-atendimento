import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { Observable, of, switchMap } from 'rxjs';
import { doc, getDoc } from '@angular/fire/firestore';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  role$: Observable<'admin' | 'medium' | null>;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.role$ = this.authService.user$.pipe(
      switchMap(user => {
        if (!user) return of(null);
        return this.authService.getUserRole(user.uid);
      })
    );
  }

  logout() {
    this.authService.logout().then(() => this.router.navigate(['/login']));
  }
}
