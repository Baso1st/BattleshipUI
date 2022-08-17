import { Component, OnInit } from '@angular/core';
import { BattleshipHttpService } from '../services/battleship-http.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

    gameId = -1
    playerName = ''

    constructor(private battleshipHttpService: BattleshipHttpService,
        private router: Router) {
    }

    onStartclick() {
        this.battleshipHttpService.createNewGame(this.playerName).subscribe((gameId) => {
            this.gameId = gameId
            this.router.navigate(['game'], {
                queryParams: { gameId: gameId},
            });
        });
    }

    ngOnInit(): void {
    }

}
