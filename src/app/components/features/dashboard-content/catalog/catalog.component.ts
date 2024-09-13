import { Component } from '@angular/core';
import { BookFirebaseService } from '../../../../service/firebase/books/book-firebase.service';
import { BookModel } from '../../../../models/Book';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  booksCatalog: BookModel[] = [];
  filteredBooks: BookModel[] = [];
  searchTerm: string = '';
  selectedGenere: string = '';
  selectedAutore: string = '';
  selectedLingua: string = '';
  isbnTerm: string = '';
  minPrezzo: number = 0;
  maxPrezzo: number = Infinity;

  generiDisponibili: string[] = [];
  autoriDisponibili: string[] = [];
  lingueDisponibili: string[] = [];

  constructor(private bookFirebaseService: BookFirebaseService) {}

  ngOnInit(): void {
    this.bookFirebaseService.getAllBooks().subscribe(books => {
      this.booksCatalog = books;
      this.filteredBooks = books;
      this.generiDisponibili = [...new Set(books.map(book => book.genere))];
      this.autoriDisponibili = [...new Set(books.map(book => book.autore))];
      this.lingueDisponibili = [...new Set(books.map(book => book.lingua))];
    });
  }

  filterBooks() {
    this.filteredBooks = this.booksCatalog.filter(book => {
      const matchesTitle = book.titolo.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesGenere = this.selectedGenere ? book.genere === this.selectedGenere : true;
      const matchesAutore = this.selectedAutore ? book.autore === this.selectedAutore : true;
      const matchesLingua = this.selectedLingua ? book.lingua === this.selectedLingua : true;
      const matchesIsbn = book.isbn.includes(this.isbnTerm);
      const matchesPrezzo = book.prezzo >= this.minPrezzo && book.prezzo <= this.maxPrezzo;

      return matchesTitle && matchesGenere && matchesAutore && matchesLingua && matchesIsbn && matchesPrezzo;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedGenere = '';
    this.selectedAutore = '';
    this.selectedLingua = '';
    this.isbnTerm = '';
    this.minPrezzo = 0;
    this.maxPrezzo = Infinity;
    this.filteredBooks = this.booksCatalog;
  }
}
