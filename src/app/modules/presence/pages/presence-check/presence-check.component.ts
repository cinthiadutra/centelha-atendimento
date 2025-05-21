import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MediumService } from '../../service/medium.service';
import { Medium } from '../../models/medium.model';


@Component({
  selector: 'app-presence-check',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatButtonModule],
  templateUrl: './presence-check.component.html',
  styleUrls: ['./presence-check.component.scss']
})
export class PresenceCheckComponent implements OnInit {
  mediuns: Medium[] = [];

  constructor(private mediumService: MediumService, private router: Router) { }

  ngOnInit(): void {
    this.mediuns = this.mediumService.getMediuns();
  }

  togglePresenca(medium: Medium) {
    medium.presente = !medium.presente;
  }

  confirmarPresencas() {
    this.router.navigate(['/consultation']);
  }
}
