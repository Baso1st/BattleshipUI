import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BattleshipHttpService {

  constructor(private http: HttpClient) { }

  createNewGame(playerName: string): Observable<number> {
    let url = `https://localhost:7137/BattleShip/NewGame/${playerName}`;
    return this.http.post<number>(url, "");
  }
}
