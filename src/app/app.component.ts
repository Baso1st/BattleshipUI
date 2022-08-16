import { Component } from '@angular/core';
import { BattleshipHttpService } from './services/battleship-http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    gameId = -1
    playerName = ''

    constructor(private battleshipHttpService: BattleshipHttpService) {
        
    }

    onStartclick() {
        // console.log("Hello");
        this.battleshipHttpService.createNewGame(this.playerName).subscribe((gameId) => {
            this.gameId = gameId
        });
    }
}

