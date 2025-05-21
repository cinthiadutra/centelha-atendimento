import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Medium } from '../models/medium.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MediumService {
  constructor(private firestore: Firestore) {}

  saveMedium(m: Medium): Promise<any> {
    const ref = collection(this.firestore, 'mediuns');
    return addDoc(ref, m);
  }

  getMediums(): Observable<Medium[]> {
    const ref = collection(this.firestore, 'mediuns');
    return collectionData(ref, { idField: 'id' }) as Observable<Medium[]>;
  }
}
