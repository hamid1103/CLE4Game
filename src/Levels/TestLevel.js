import * as ex from 'excalibur'
import {Player} from "../Entities/Player.js";
import {Platform} from "../Core/Platform.js";
import {Enemy} from "../Core/Enemy.js";
import {ScrollingBackground} from "../Core/Area.js";


export class TestLevel extends ex.Scene{
    onInitialize(_engine) {
        this.StartLevel()
    }


    StartLevel(){
        let player = new Player(650, 700)
        this.add(player)

        let platform = new Platform(650, 800, 0)
        this.add(platform)

        let Kwal = new Enemy(900, 700)
        this.add(Kwal)
        
        let background = new ScrollingBackground()
        this.add(background)



        const platforms = [];

        const numRows = 10;
        const numCols = 10;
        
        for (let row = 0; row < numRows; row++) {
          const curRow = [];
          for (let col = 0; col < numCols; col++) {
            curRow.push(Math.floor(Math.random() * 2));
           
          }
          platforms.push(curRow);
          const emptyRow = Array(numCols).fill(0);
          platforms.push(emptyRow);
          console.log(curRow.join(' ') + ' ' + emptyRow.join(' '));
        }
        
    
     for (let row of platforms) {
          for (let curplat of row) {
            let newplatform = new Platform(curplat.x, curplat.y, curplat.type);
            this.add(newplatform);
          }
        }

    

    }

}