import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Cell } from '../models/Cell';
import { CellState } from '../models/enums';

@Injectable({
    providedIn: 'root'
})
export class BattleshipHttpService {


    apiUrl = "https://localhost:7137/BattleShip"

    constructor(private http: HttpClient) { }

    createNewGame(playerName: string): Observable<number> {
        let url = `${this.apiUrl}/NewGame/${playerName}`;
        return this.http.post<number>(url, "");
    }

    getPlayerBoard(gameId: number, playerName: string): Observable<Array<Cell>> {
        let url = `${this.apiUrl}/PlayerBoard/${gameId}/${playerName}`;
        return this.http.get<Array<Cell>>(url).pipe(map(data => {
            let arr = new Array<any>();
            for (let key in data) {
                let cell: Cell = {
                    coords: key,
                    state: data[key].state as CellState
                }
                arr.push(cell)
            }
            return arr
        }));
    }

    fire(gameId: number, playerName: string, computerName: string, coords: string): Observable<string> {
        let url = `${this.apiUrl}/Fire/${gameId}/${playerName}/${computerName}/${coords}`;
        return this.http.put(url, {}, {responseType: 'text'});
    }

    computerFire(gameId: number): Observable<string> {
        let url = `${this.apiUrl}/ComputerFire/${gameId}`;
        return this.http.put(url, {}, {responseType: 'text'});    
    }

    getWinner(gameId: number): Observable<string> {
        let url = `${this.apiUrl}/GetWinner/${gameId}`;
        return this.http.get(url, {responseType: 'text'});
    }
}
