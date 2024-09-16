export class PurchaseModel {
    private _isbn: string;
    private _acquirente: string;
    private _dataAcquisto: Date;

    constructor(
        isbn: string,
        acquirente: string,
        dataAcquisto: Date,
    ) {
        this._isbn = isbn;
        this._acquirente = acquirente;
        this._dataAcquisto = dataAcquisto;
    }
    
    public get isbn(): string {
        return this._isbn;
    }

    public set isbn(value: string) {
        this._isbn = value;
    }

    public get acquirente(): string {
        return this._acquirente;
    }

    public set acquirente(value: string) {
        this._acquirente = value;
    }

    public get dataAcquisto(): Date {
        return this._dataAcquisto;
    }

    public set dataAcquisto(value: Date) {
        this._dataAcquisto = value;
    }

    static fromJson(json: any): PurchaseModel {
        return new PurchaseModel(
            json.isbn,
            json.acquirente,
            new Date(json.dataAcquisto),
        );
    }

    toJson(): any {
        return {
            isbn: this._isbn,
            acquirente: this._acquirente,
            dataAcquisto: this._dataAcquisto.toISOString(),
        };
    }
}
