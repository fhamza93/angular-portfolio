import { Component, OnInit } from '@angular/core';
import { BookFirebaseService } from '../../../../service/firebase/books/book-firebase.service';
import { AcquisitionsFirebaseService } from '../../../../service/firebase/acquisitions/acquisitions-firebase.service';
import { BookModel } from '../../../../models/Book';

@Component({
  selector: 'app-bestseller',
  templateUrl: './bestseller.component.html',
  styleUrl: './bestseller.component.css'
})
export class BestsellerComponent implements OnInit {
  bestsellingBooks: BookModel[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(private bookFirebaseService: BookFirebaseService, private acquisitionsFirebaseService: AcquisitionsFirebaseService) {}

  ngOnInit(): void {
    this.loadBestsellingBooks();
  }

  async loadBestsellingBooks(): Promise<void> {
    this.bestsellingBooks = []; 
    this.loading = true;

    try {
        const bestSellers = await this.bookFirebaseService.getMostPurchasedBooks();
        for (const book of bestSellers) {
            if (book) {
                if (book) {
                    this.bestsellingBooks.push(book);
                }
            }
        }
        this.loading = false; 
    } catch (error) {
        console.error("Errore nel caricamento dei bestseller:", error);
        this.loading = false;
    }
  }


  loadBookDetails(isbn: string): void {
    this.bookFirebaseService.getBookByISBN(isbn).subscribe({
      next: (book) => {
        if (book) {
          console.log("Dettagli del libro:", book);
          console.log("Numero di acquisti:", book.nAcquisti);
        } else {
          console.log("Nessun libro trovato per l'ISBN:", isbn);
        }
      },
      error: (error) => {
        console.error("Errore durante il recupero del libro:", error);
      }
    });
  }
}
