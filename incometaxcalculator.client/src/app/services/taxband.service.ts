import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap } from "rxjs";
import { TaxBand } from "../models/taxband.model";


@Injectable()

export class TaxBandService {
  private apiUrl = 'https://localhost:56149/api/TaxBand';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET Tax Bands from the server */
  getTaxBands(): Observable<TaxBand[]> {
    return this.http.get<TaxBand[]>(this.apiUrl)
      .pipe(
        tap(_ => console.log('fetched taxband')),
        catchError(error => {
          console.error(error);
          throw error;
        })
      );
  }
}

