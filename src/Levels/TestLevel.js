import * as ex from 'excalibur'
import {Player} from "../Entities/Player.js";
import {Platform} from "../Core/Platform.js";
import {Enemy} from "../Core/Enemy.js";
import {Background} from "../Core/Area.js";


export class TestLevel extends ex.Scene{
    onInitialize(_engine) {
        this.StartLevel()
    }


    StartLevel(){
        let background = new Background()
        this.add(background)

        let player = new Player(650, 700)
        this.add(player)

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

        const numRows = 3;
        const numCols = 3;

        
        
        for (let row = 0; row < numRows; row++) {
          const curRow = [];
        let random = Math.floor(Math.random() * prefabs.length);
          platforms.push(prefabs[random]);
          const emptyRow = Array(numCols).fill(0);
          platforms.push(emptyRow);
        
        }
        console.log(platforms)

        // 1440 breedte
        for(let i = 0; i < platforms.length; i++){
            let j = 855;
            let posy = j - (i*45)
            let curRow = platforms[i]
            for(let k= 0; k < curRow.length; i++){
                let b = 1440
                let posx = (b / (k*curRow.length))
                if(curRow[k] != 0){
                    try{
                    let newplatform = new Platform(posx, posy, 0)
                    this.add(newplatform)
                    }catch(er){
                        console.log(er)
                    }
                }
            }
               
            
        }
        
    }

}