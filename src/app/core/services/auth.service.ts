import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private auth: Auth, private firestore: Firestore) {
    onAuthStateChanged(this.auth, (user) => this.userSubject.next(user));
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string, role: 'admin' | 'medium') {
  return createUserWithEmailAndPassword(this.auth, email, password).then(async cred => {
    const ref = doc(this.firestore, `users/${cred.user.uid}`);
    await setDoc(ref, {
      uid: cred.user.uid,
      email,
      role
    });
    return cred;
  });
}


 getUserRole(uid: string): Promise<'admin' | 'medium' | null> {
  const ref = doc(this.firestore, `users/${uid}`);
  return getDoc(ref).then(snap =>
    snap.exists() ? (snap.data()['role'] as 'admin' | 'medium') : null
  );
}


  logout() {
    return signOut(this.auth);
  }

  get currentUser() {
    return this.auth.currentUser;
  }
}
