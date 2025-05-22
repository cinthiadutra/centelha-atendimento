import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Medium } from '../models/medium.model';
import { Observable } from 'rxjs';
import { doc, updateDoc } from '@angular/fire/firestore';


@Injectable({ providedIn: 'root' })
export class MediumService {
  constructor(private firestore: Firestore) { }

  saveMedium(m: Medium): Promise<any> {
    const ref = collection(this.firestore, 'mediuns');
    return addDoc(ref, m);
  }

  getMediums(): Observable<Medium[]> {
    const ref = collection(this.firestore, 'mediuns');
    return collectionData(ref, { idField: 'id' }) as Observable<Medium[]>;
  }


  updatePresenca(id: string, presente: boolean): Promise<void> {
    const ref = doc(this.firestore, `mediuns/${id}`);
    return updateDoc(ref, { presente });
  }
}
