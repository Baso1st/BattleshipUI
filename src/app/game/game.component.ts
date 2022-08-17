import { Component, Input, OnInit } from '@angular/core';
import { BattleshipHttpService } from '../services/battleship-http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Cell } from '../models/Cell';
import { firstValueFrom, forkJoin } from 'rxjs';
import { CellState } from '../models/enums';


@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

    gameId = -1;
    playerName = ''
    playerBoard = new Array<Cell>();
    computerName = 'Computer'
    computerBoard = new Array<Cell>();
    fireReport = 'No Report'

    constructor(private battleService: BattleshipHttpService,
        private activeRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.gameId = Number(params['gameId']);
            this.playerName = params['playerName'];
            let observables = [this.battleService.getPlayerBoard(this.gameId, this.playerName),
            this.battleService.getPlayerBoard(this.gameId, this.computerName)];
            forkJoin(observables).subscribe(response => {
                this.playerBoard = response[0];
                this.computerBoard = response[1];
            });
        });
    }

    getPlayerColor(cell: Cell) {
        switch (cell.state) {
            case CellState.Empty:
                return "lightblue";
            case CellState.HasShip:
                return "green";
            case CellState.Miss:
                return "white";
            case CellState.Hit:
                return "red";
            default:
                console.log(cell.state)
                throw new Error("Unknown CellState");
        }
    }

    getComputerColor(cell: Cell) {
        switch (cell.state) {
            case CellState.HasShip:
            case CellState.Empty:
                return "lightblue";
            case CellState.Miss:
                return "white";
            case CellState.Hit:
                return "red";
            default:
                throw new Error("Unknown CellState");
        }
    }

    async onPlayerCellClick(cell: Cell) {
        this.fireReport = await firstValueFrom(this.battleService.fire(this.gameId, this.playerName, this.computerName, cell.coords));
        this.computerBoard = await firstValueFrom(this.battleService.getPlayerBoard(this.gameId, this.computerName));
        let winner = await firstValueFrom(this.battleService.getWinner(this.gameId));
        if (winner !== "") {
            this.fireReport = `Congratulation ${this.playerName} You have won`;
            //Show a message with Ok button then redirect to main page
            return;
        }
        //wait a bit
        this.fireReport = await firstValueFrom(this.battleService.computerFire(this.gameId));
        this.playerBoard = await firstValueFrom(this.battleService.getPlayerBoard(this.gameId, this.playerName));
        if (winner !== "") {
            this.fireReport = `${this.playerName} You have lost! Good luck next time`;
            //Show a message with Ok button then redirect to main page
            return;
        }
    }

}
