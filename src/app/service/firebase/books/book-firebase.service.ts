import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'; 
import { Observable, firstValueFrom } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BookModel } from '../../../models/Book';
import { PurchaseModel } from '../../../models/Purchase';
import { AcquisitionsFirebaseService } from '../../firebase/acquisitions/acquisitions-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class BookFirebaseService {
  
  constructor(private db: AngularFireDatabase, private acquisitionsFirebaseService: AcquisitionsFirebaseService) {}

  async addBook(book: BookModel): Promise<void> {
    try {
      const bookExists = await this.checkIfBookExists(book.isbn);
      if (bookExists) {
        throw new Error('Un libro con questo ISBN esiste già.');
      }

      await this.db.object(`books/${book.isbn}`).set(book.toJson());
      console.log('Libro aggiunto con successo.');
    } catch (error) {
      console.error('Errore durante l\'aggiunta del libro:', error);
      throw error;
    }
  }

  private async checkIfBookExists(isbn: string): Promise<boolean> {
    const snapshot = await this.db.object(`books/${isbn}`).valueChanges().pipe(take(1)).toPromise();
    return snapshot !== null;
  }

  getBookByISBN(isbn: string): Observable<BookModel | null> {
    return this.db.object(`books/${isbn}`).valueChanges().pipe(
      map((data: any) => {
        return data ? BookModel.fromJson(data) : null;
      })
    );
  }

  updateByISBN(isbn: string, updatedData: Partial<BookModel>): Promise<void> {
    return this.db.object(`books/${isbn}`).update(updatedData);
  }

  deleteByISBN(isbn: string): Promise<void> {
    return this.db.object(`books/${isbn}`).remove();
  }

  getAllBooks(): Observable<BookModel[]> {
    return this.db.list<BookModel>('books').valueChanges().pipe(
      map((books: any[]) => books.map(bookJson => BookModel.fromJson(bookJson)))
    );
  }

  async getMostPurchasedBooks(): Promise<BookModel[]> {
    console.log("Inizio recupero dei libri più acquistati...");

    const purchasesSnapshot = await this.db.list<PurchaseModel>('purchases').valueChanges().pipe(take(1)).toPromise();

    const isbnCount = purchasesSnapshot ? purchasesSnapshot.reduce((acc: { [key: string]: number }, purchase) => {
        acc[purchase.isbn] = (acc[purchase.isbn] || 0) + 1;
        return acc;
    }, {}) : {};

    console.log("Conteggio degli ISBN:", isbnCount);

    const sortedIsbns = Object.keys(isbnCount).sort((a, b) => isbnCount[b] - isbnCount[a]);

    console.log("ISBN ordinati in base al numero di acquisti:", sortedIsbns);

    const books: BookModel[] = [];
    
    for (const isbn of sortedIsbns) {
        console.log(`Recupero libro con ISBN: ${isbn}`);
        
        const book = await firstValueFrom(this.getBookByISBN(isbn));
        console.log("Dettagli del libro:", book);
        if (book) {
          console.log("Dettagli del libro:", book);
          console.log("Numero di acquisti:", book.nAcquisti); 
          book.nAcquisti = isbnCount[isbn];
          books.push(book);
        } else {
          console.log("Nessun libro trovato per l'ISBN:", isbn);
        }
    }

    console.log("Libri più acquistati recuperati:", books);

    return books;
  }
}
