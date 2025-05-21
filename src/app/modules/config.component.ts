import { Component } from '@angular/core';

@Component({
  selector: 'app-config',
  imports: [],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent {
  guias: any[] = [
  { name: 'Exu e PG', value: '1' },
  { name: 'Malandros e Malandras', value: '2' },
  { name: 'Caboclos e Caboclas', value: '3' },
  { name: 'Pretos-velhos e Pretas-velhas', value: '4' },
  { name: 'Ciganos e Ciganas', value: '5' },
  { name: 'Marinheiros', value: '6' },
  { name: 'Baianos e Baianas', value: '7' },];   
}
