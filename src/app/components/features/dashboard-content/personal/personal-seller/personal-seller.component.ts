import { Component, OnInit } from '@angular/core';
import { BookModel } from '../../../../../models/Book';
import { BookFirebaseService } from '../../../../../service/firebase/books/book-firebase.service';

@Component({
  selector: 'app-personal-seller',
  templateUrl: './personal-seller.component.html',
  styleUrl: './personal-seller.component.css'
})
export class PersonalSellerComponent implements OnInit {
  books: BookModel[] = [];

  constructor(private bookFirebaseService: BookFirebaseService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookFirebaseService.getAllBooks().subscribe((data: BookModel[]) => {
      this.books = data;
    });
  }

  editBook(book: BookModel): void {
    console.log('Modifica il libro:', book);
  }

  deleteBook(book: BookModel): void {
    if (confirm(`Sei sicuro di voler eliminare il libro: ${book.titolo}?`)) {
      this.bookFirebaseService.deleteByISBN(book.isbn).then(() => {
        this.loadBooks(); 
      });
    }
  }
}