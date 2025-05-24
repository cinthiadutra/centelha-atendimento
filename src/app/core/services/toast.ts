import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  show(title: string, message: string): void {
    this.snackBar.open(`${title} - ${message}`, 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
