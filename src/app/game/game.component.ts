import { Component, Input, OnInit } from '@angular/core';
import { BattleshipHttpService } from '../services/battleship-http.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

    gameId = -1;
    humanBoard = null;
    computerBoard = null;

    constructor(private battleshipHttpService: BattleshipHttpService,
        private activeRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.gameId = Number(params['gameId'])
            // this.battleshipHttpService.getPlayerBoard()
        });
    }

    getColor(cell: any) {
        return "red";
    }

}
