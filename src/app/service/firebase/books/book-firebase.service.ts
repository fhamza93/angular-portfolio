import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BookModel } from '../../../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookFirebaseService {
  
  constructor(private db: AngularFireDatabase) {}

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

  getByISBN(isbn: string): Observable<BookModel | null> {
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

  getBookById(isbn: string): Observable<BookModel | null> {
    return this.db.object(`books/${isbn}`).valueChanges().pipe(
      map((data: any) => {
        return data ? BookModel.fromJson(data) : null;
      })
    );
  }
}
