import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookModel } from '../../../models/Book';
import { BookFirebaseService } from '../../../service/firebase/books/book-firebase.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: BookModel | null = null; 
  isbn: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private bookFirebaseService: BookFirebaseService) {}

  ngOnInit(): void {
    this.isbn = this.route.snapshot.paramMap.get('isbn');

    if (this.isbn) {
      this.bookFirebaseService.getBookById(this.isbn).subscribe(bookDetails => {
        this.book = bookDetails;
        console.log('Dettagli del libro:', this.book);
      });
    } else {
      console.error('Nessun ISBN trovato nei parametri della rotta');
      this.router.navigate(['/books']); 
    }
  }
}
