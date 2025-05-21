import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigConsulta } from '../models/config.model';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private configSubject = new BehaviorSubject<ConfigConsulta | null>(null);
  config$ = this.configSubject.asObservable();

  setConfig(config: ConfigConsulta) {
    this.configSubject.next(config);
  }

  getConfig(): ConfigConsulta | null {
    return this.configSubject.value;
  }
}
