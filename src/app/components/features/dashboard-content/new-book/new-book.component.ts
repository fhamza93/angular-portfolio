import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { autoriFamosi } from '../../../../constants/FamousAuthors'; 
import { generiFamosi } from '../../../../constants/BookGenre';
import { BookFirebaseService } from '../../../../service/firebase/books/book-firebase.service';
import { AuthService } from '../../../../service/auth/auth.service';
import { Router } from '@angular/router'; 
import { BookModel } from '../../../../models/Book';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  newBookForm: FormGroup;
  autoriFamosi: string[] = autoriFamosi;
  autoriFiltrati: string[] = [];
  generiFamosi: string[] = generiFamosi;
  generiFiltrati: string[] = [];
  formSubmitted = false;

  constructor(
      private authService: AuthService, 
      private fb: FormBuilder, 
      private bookFirebaseService: BookFirebaseService, 
      private router: Router
  ) {
    this.newBookForm = this.fb.group({
      titolo: ['', Validators.required],
      autore: ['', Validators.required],
      annoPubblicazione: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      genere: ['', Validators.required],
      isbn: ['', [Validators.required, Validators.pattern(/^(978|979)[ -]?[0-9]{10}$/)]],
      lingua: ['', Validators.required],
      descrizione: ['', [Validators.required, Validators.maxLength(1000)]],
      copertina: ['', Validators.pattern(/^https?:\/\/.+/)],
      numeroPagine: ['', [Validators.required, Validators.min(1)]],
      prezzo: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.autoriFiltrati = this.autoriFamosi.slice(0, 5);
    this.generiFiltrati = this.generiFamosi.slice(0, 5);
  }

  filtraAutori(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    
    this.autoriFiltrati = this.autoriFamosi
      .filter(autore => autore.toLowerCase().includes(input))
      .slice(0, 5);
  }

  filtraGeneri(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    
    this.generiFiltrati = this.generiFamosi
      .filter(genere => genere.toLowerCase().includes(input))
      .slice(0, 5); 
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.newBookForm.valid) {
      const newBookData = this.newBookForm.value;

      const book = new BookModel(
        newBookData.titolo,
        newBookData.autore,
        newBookData.annoPubblicazione,
        newBookData.genere,
        newBookData.isbn,
        newBookData.lingua,
        newBookData.descrizione,
        newBookData.copertina,
        newBookData.numeroPagine,
        this.authService.getCurrentUserUid(),
        newBookData.prezzo,
        new Date(),
        new Date()
      );

      console.log('Nuovo libro:', book);

      this.bookFirebaseService.addBook(book).then(() => {
        console.log('Libro aggiunto con successo');
        this.router.navigate(['/libro', book.isbn]);        
      }).catch(error => {
        console.error('Errore durante l\'aggiunta del libro:', error);
      });
    } else {
      console.error('Il modulo non è valido', this.newBookForm);
    }
  }
}
