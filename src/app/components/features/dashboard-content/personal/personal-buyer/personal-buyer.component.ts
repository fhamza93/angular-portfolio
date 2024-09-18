import { Component, OnInit } from '@angular/core';
import { BookModel } from '../../../../../models/Book';
import { PurchaseModel } from '../../../../../models/Purchase';
import { AcquisitionsFirebaseService } from '../../../../../service/firebase/acquisitions/acquisitions-firebase.service';
import { BookFirebaseService  } from '../../../../../service/firebase/books/book-firebase.service';
import { AuthService  } from '../../../../../service/auth/auth.service';


@Component({
  selector: 'app-personal-buyer',
  templateUrl: './personal-buyer.component.html',
  styleUrl: './personal-buyer.component.css'
})
export class PersonalBuyerComponent implements OnInit {
  books: BookModel[] = [];

  constructor(
    private acquisitionsFirebaseService: AcquisitionsFirebaseService,
    private bookFirebaseService: BookFirebaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPurchasedBooks();
  }

  async loadPurchasedBooks(): Promise<void> {
    console.log('Loading purchased books...');
    const userUid = this.authService.getCurrentUserUid();

    try {
        const purchases: PurchaseModel[] = await this.acquisitionsFirebaseService.getPurchasesByUser(userUid);
        
        if (purchases.length === 0) {
            console.log('Nessun acquisto trovato per questo utente.');
            return; 
        }
        
        const isbnCountMap = new Map<string, number>();

        purchases.forEach(purchase => {
            const currentCount = isbnCountMap.get(purchase.isbn) || 0;
            isbnCountMap.set(purchase.isbn, currentCount + 1);
        });

        for (const [isbn, count] of isbnCountMap.entries()) {
            this.bookFirebaseService.getBookByISBN(isbn).subscribe(book => {
                if (book) {
                    console.log('Book loaded:', book);
                    book.nAcquistiCliente = count;
                    this.books.push(book);
                } else {
                    console.log('Nessun libro trovato per l\'ISBN:', isbn);
                }
            }, error => {
                console.error('Errore nel recupero del libro:', error);
            });
        }

        console.log('Purchased Books:', this.books);
    } catch (error) {
        console.error('Errore nel recupero degli acquisti:', error);
    }
  }
}
