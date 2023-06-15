import * as ex from 'excalibur'
import {Player, PlayerName} from "../Entities/Player.js";
import {Platform} from "../Core/Platform.js";
import {Enemy} from "../Core/Enemy.js";
import {ScrollingBackground} from "../Core/Area.js";


export class TestLevel extends ex.Scene{
    player1;
    player2;

    onInitialize(_engine) {
        this.StartLevel()
    }


    StartLevel(){
        this.player1 = new Player(650, 700, PlayerName.Player1)
        this.add(this.player1)

        this.player2 = new Player(850, 700, PlayerName.Player2)
        this.add(this.player2)

        let platform = new Platform(650, 800, 0)
        this.add(platform)

        let platform2 = new Platform(850, 800, 0)
        this.add(platform2)

        let Kwal = new Enemy(900, 700)
        this.add(Kwal)
        
        let background = new ScrollingBackground()
        this.add(background)



        const platforms = [];

        while (platforms.length < 100) {
        const position = {
        x: Math.floor(Math.random() * 500), 
        y: Math.floor(Math.random() * 500), 
        type: Math.floor(Math.random() * 2), 
        };
        platforms.push(position);
        }

    
        for(let platform in platforms)
        {
            let curplat = platforms[platform]
            let newplatform = new Platform(curplat.x, curplat.y, curplat.type)
            this.add(newplatform)
        }

        

    }

}