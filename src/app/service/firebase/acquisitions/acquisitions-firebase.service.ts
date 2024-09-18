import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BookModel } from '../../../models/Book';
import { PurchaseModel } from '../../../models/Purchase';

@Injectable({
  providedIn: 'root'
})
export class AcquisitionsFirebaseService {

  constructor(private db: AngularFireDatabase) {}

  async addPurchase(purchase: PurchaseModel): Promise<void> {
    try {
      const newPurchaseRef = this.db.list('purchases').push(purchase.toJson());
      console.log('Acquisto avvenuto con successo, ID acquisto:', newPurchaseRef.key);
    } catch (error) {
      console.error('Errore durante l\'acquisto:', error);
      throw error;
    } 
  }

  async getBookPurchaseCount(isbn: string): Promise<number> {
    console.log(`Recupero acquisti per ISBN: ${isbn}`);

    const purchases = await this.db.list<PurchaseModel>('purchases', ref => 
      ref.orderByChild('isbn').equalTo(isbn)).valueChanges().pipe(take(1)).toPromise();

    const count = purchases ? purchases.length : 0;
    
    console.log(`Numero di acquisti per ISBN ${isbn}: ${count}`);
    
    return count;
  }
  
  async getPurchasesByUser(userUid: string): Promise<PurchaseModel[]> {
    const purchasesSnapshot = await this.db.list('purchases', ref =>
      ref.orderByChild('acquirente').equalTo(userUid)
    ).valueChanges().pipe(take(1)).toPromise();
    
    if (!purchasesSnapshot) {
      return [];
    }
  
    return purchasesSnapshot.map(p => PurchaseModel.fromJson(p));
  }  
}
