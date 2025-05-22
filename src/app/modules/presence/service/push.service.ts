import { Injectable } from '@angular/core';
import { Messaging, getToken } from '@angular/fire/messaging';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PushService {
  constructor(private messaging: Messaging, private firestore: Firestore) {}

  async registrarToken(mediumId: string) {
    try {
      const token = await getToken(this.messaging, {
        vapidKey: environment.firebase.vapidKey,
      });

      if (token) {
        const ref = doc(this.firestore, `mediuns/${mediumId}`);
        await setDoc(ref, { token }, { merge: true });
        console.log('Token FCM salvo:', token);
      }
    } catch (error) {
      console.error('Erro ao obter ou salvar token FCM:', error);
    }
  }
}
