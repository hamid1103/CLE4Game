import * as ex from 'excalibur'
import {Player} from "../Entities/Player.js";
import {Platform} from "../Core/Platform.js";
import {Enemy} from "../Core/Enemy.js";
import {Background} from "../Core/Area.js";
import {Coin} from "../Items/Coin.js";


export class TestLevel extends ex.Scene{
    onInitialize(_engine) {
        this.StartLevel()
    }


    StartLevel(){
        let background = new Background()
        this.add(background)

        let player = new Player(650, 700)
        this.add(player)

        let TestCoin = new Coin(750, 750)
        this.add(TestCoin)
        let TestCoin2 = new Coin(750, 850)
        this.add(TestCoin2)

        let platform = new Platform(650, 800, 0)
        this.add(platform)

        let Kwal = new Enemy(900, 700)
        this.add(Kwal)
        
       



        const platforms = [];
        const prefabs =   
        [[1,0,1,1,0,1,0,0,1,0],
        [0,1,0,0,1,0,1,1,0,1],
        [1,0,0,1,1,0,0,1,1,0],
        [0,0,1,0,1,1,0,1,0,1],
        [1,1,0,1,1,0,1,1,0,0],
        [1,0,0,0,1,1,0,1,0,1]]

        const numRows = 10;
        const numCols = 10;

        
        
        for (let row = 0; row < numRows; row++) {
          const curRow = [];
        let random = Math.floor(Math.random() * prefabs.length);
          platforms.push(prefabs[random]);
          const emptyRow = Array(numCols).fill(0);
          platforms.push(emptyRow);
          console.log(random);
        }


        for(let i = 0; i < platforms.length; i++){
            let j = 900;
            let pos = j - (i*45)

        }
        
    }

}