import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
    storeInfo = {
      name: 'Libreria di Verona',
      address: 'Piazza delle Erbe, 4, 37121 Verona, Italia',
      phone: '+39 045 1234567',
      email: 'info@libreriaverona.com',
      website: 'www.libreriaverona.com'
    };
  
    openingHours = [
      { day: 'Lunedì - Venerdì', hours: '9:00 - 19:00' },
      { day: 'Sabato', hours: '9:00 - 18:00' },
      { day: 'Domenica', hours: 'Chiuso' }
    ];
}
