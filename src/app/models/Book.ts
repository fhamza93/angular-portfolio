export class BookModel {
    private _titolo: string;
    private _autore: string;
    private _annoPubblicazione: number;
    private _genere: string;
    private _isbn: string;            
    private _lingua: string;         
    private _descrizione: string;     
    private _copertina: string;      
    private _numeroPagine: number;   
    private _prezzo: number;
    private _dataCreazione: Date;    
    private _dataAggiornamento: Date; 
    private _nAcquisti: number | null;

    constructor(
        titolo: string,
        autore: string,
        annoPubblicazione: number,
        genere: string,
        isbn: string,
        lingua: string,
        descrizione: string,
        copertina: string,
        numeroPagine: number,
        venditore: string,
        prezzo: number,
        dataCreazione: Date,
        dataAggiornamento: Date,
        nAcquisti: number | null
    ) {
        this._titolo = titolo;
        this._autore = autore;
        this._annoPubblicazione = annoPubblicazione;
        this._genere = genere;
        this._isbn = isbn;
        this._lingua = lingua;
        this._descrizione = descrizione;
        this._copertina = copertina;
        this._numeroPagine = numeroPagine;
        this._prezzo = prezzo;
        this._dataCreazione = dataCreazione;
        this._dataAggiornamento = dataAggiornamento;
        this._nAcquisti = nAcquisti;
    }

    get titolo(): string {
        return this._titolo;
    }

    set titolo(value: string) {
        this.titolo = value;
    }


    get autore(): string {
        return this._autore;
    }

    set autore(value: string) {
        this._autore = value;
    }

    get annoPubblicazione(): number {
        return this._annoPubblicazione;
    }

    set annoPubblicazione(value: number) {
        this._annoPubblicazione = value;
    }

    get genere(): string {
        return this._genere;
    }

    set genere(value: string) {
        this._genere = value;
    }
    
    get isbn(): string {
        return this._isbn;
    }

    set isbn(value: string) {
        this._isbn = value;
    }

    get lingua(): string {
        return this._lingua;
    }

    set lingua(value: string) {
        this._lingua = value;
    }

    get descrizione(): string {
        return this._descrizione;
    }

    set descrizione(value: string) {
        this._descrizione = value;
    }

    get copertina(): string {
        return this._copertina;
    }

    set copertina(value: string) {
        this._copertina = value;
    }

    get numeroPagine(): number {
        return this._numeroPagine;
    }

    set numeroPagine(value: number) {
        this._numeroPagine = value;
    }

    get prezzo(): number {
        return this._prezzo;
    }

    set prezzo(value: number) {
        this._prezzo = value;
    }

    get dataCreazione(): Date {
        return this._dataCreazione;
    }

    set dataCreazione(value: Date) {
        this._dataCreazione = value;
    }

    get dataAggiornamento(): Date {
        return this._dataAggiornamento;
    }

    set dataAggiornamento(value: Date) {
        this._dataAggiornamento = value;
    }

    get nAcquisti(): number | null {
        return this._nAcquisti;
    }

    set nAcquisti(value: number | null) {
        this._nAcquisti = value;
    }

    static fromJson(json: any): BookModel {
        return new BookModel(
            json.titolo,
            json.autore,
            json.annoPubblicazione,
            json.genere,
            json.isbn,
            json.lingua,
            json.descrizione,
            json.copertina,
            json.numeroPagine,
            json.venditore,
            json.prezzo,
            new Date(json.dataCreazione),
            new Date(json.dataAggiornamento),
            json.nAcquisti !== undefined ? json.nAcquisti : null
        );
    }

    toJson(): any {
        return {
            titolo: this._titolo,
            autore: this._autore,
            annoPubblicazione: this._annoPubblicazione,
            genere: this._genere,
            isbn: this._isbn,
            lingua: this._lingua,
            descrizione: this._descrizione,
            copertina: this._copertina,
            numeroPagine: this._numeroPagine,
            prezzo: this._prezzo,
            dataCreazione: this._dataCreazione.toISOString(), 
            dataAggiornamento: this._dataAggiornamento.toISOString(),
            nAcquisti: this._nAcquisti
        };
    }
}
