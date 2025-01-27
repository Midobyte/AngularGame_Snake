import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';
import { doc , setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  // Add a new document to a collection
  async addDocument(collectionName: string, data: any) {
    const docRef = await doc(collection(this.firestore, collectionName), data.userCode)

    await setDoc(docRef, data);
    return docRef.id;
  }

  // Get all documents from a collection
  async getDocuments(collectionName: string) {
    const querySnapshot = await getDocs(collection(this.firestore, collectionName));
    return querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  }
}