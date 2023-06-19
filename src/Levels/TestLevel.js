import * as ex from 'excalibur'
import {Player, PlayerName} from "../Entities/Player.js";
import {Platform} from "../Core/Platform.js";
import {Enemy} from "../Core/Enemy.js";
import {Background} from "../Core/Area.js";

import {Coin} from "../Items/Coin.js";
import {Jetpack} from "../Items/Jetpack.js";
import {Rocket} from "../Items/Rocket.js";
import {Nuclear} from "../Items/Nuclear.js";
import {Star} from "../Items/Star.js";



export class TestLevel extends ex.Scene {
    CamSet = false;
    PCam1;
    PCam2;
    curCam;
    onInitialize(_engine) {
        this.StartLevel()
    }


    StartLevel() {
        let background = new Background()
        this.add(background)

        this.player = new Player(650, 700, PlayerName.Player1, this.engine)
        this.add(this.player)
        this.PCam1 = this.player.camFollowObj
        this.curCam = this.PCam1

        this.player2 = new Player(650, 700, PlayerName.Player2, this.engine)
        this.add(this.player2)
        this.PCam2 = this.player2.camFollowObj



        let TestCoin2 = new Coin(750, 850, this.engine)
        this.add(TestCoin2)

        let platform = new Platform(650, 800, 0, this.engine)
        this.add(platform)



        this.platforms = [];
        const prefabs =
            [ 
                [1, 0, 1, 1, 0, 1, 0, 0, 1, 0],
                [0, 1, 0, 0, 1, 0, 1, 1, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 1, 1, 0],
                [0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
                [1, 1, 0, 1, 1, 0, 1, 1, 0, 0],
                [1, 0, 0, 0, 1, 1, 0, 1, 0, 1],
                [0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
                [0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
                [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                [0, 0, 1, 1, 0, 0, 0, 1, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
                [0, 0, 0, 0, 1, 0, 1, 1, 0, 0],
                [0, 1, 0, 0, 0, 0, 1, 1, 0, 0],
                [1, 1, 0, 0, 1, 0, 0, 0, 1, 0],
                [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 1, 0, 0, 1, 1, 1, 0, 0],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                [1, 1, 0, 0, 0, 0, 1, 1, 1, 1],            
                [0, 0, 0, 1, 0, 1, 1, 1, 0, 0],                
                [0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
                [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
                [0, 0, 1, 0, 1, 1, 0, 0, 0, 0],
                [1, 0, 1, 0, 0, 0, 0, 1, 1, 0],
                [0, 1, 1, 0, 1, 1, 0, 0, 1, 0],
                [1, 1, 0, 0, 0, 1, 1, 0, 1, 0],
                [0, 0, 1, 1, 0, 1, 0, 1, 1, 0],
                [1, 0, 0, 1, 1, 0, 1, 0, 0, 1],
                [1, 0, 0, 1, 0, 1, 1, 0, 0, 1],
                [0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
                [1, 0, 0, 0, 1, 0, 1, 0, 1, 1],
                [0, 0, 1, 1, 0, 1, 1, 0, 0, 1],
                [1, 1, 0, 1, 0, 0, 0, 1, 1, 0],
                [0, 1, 0, 0, 1, 1, 0, 0, 1, 1],
                [1, 0, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 0, 1, 1, 0, 1, 0],
                [1, 0, 1, 0, 1, 1, 0, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 1, 0, 0, 1],
                [1, 0, 1, 0, 0, 1, 1, 0, 1, 0],
                [0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
                [1, 1, 0, 0, 0, 1, 0, 1, 1, 0],
                [0, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 0, 1, 1, 0, 1, 1, 0, 1, 0],
                [1, 0, 0, 0, 1, 1, 0, 1, 1, 0],
                [1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
            ]

        const numRows = 100;
        const numCols = 10;


        for (let row = 0; row < numRows; row++) {
            let random = Math.floor(Math.random() * prefabs.length);
            this.platforms.push(prefabs[random]);
            const emptyRow = Array(numCols).fill(0);
            this.platforms.push(emptyRow);
        }

        // 1440 breedte
        for (let i = 0; i < this.platforms.length; i++) {
            let j = 855;
            let posy = j - (i * 45)
            let curRow = this.platforms[i]
            for(let k= 0; k < curRow.length; k++){
                let b = 1440
                let posx = (b/curRow.length) + 150*k
                if(curRow[k] == 1){
                    let newplatform = new Platform(posx, posy, 0, this.engine)
                    this.add(newplatform)
                }else if(curRow[k] == 0){
                    if(Math.floor(Math.random() * 12) === 3) {
                        let newItem
                        let Rand = Math.floor(Math.random() * 100)
                        if (Rand < 20) {newItem = new Rocket(posx, posy, this.engine)} else
                        if (Rand >= 20 && Rand < 30) {newItem = new Jetpack(posx, posy, this.engine)} else
                        if (Rand >= 30 && Rand < 75) {newItem = new Star(posx, posy, this.engine)} else
                        if (Rand >= 75 && Rand < 100) {newItem = new Nuclear(posx, posy, this.engine)}
                        this.add(newItem)
                    }
                }
            }
        }
        this.CTAI = this.platforms.length

    }

    onPreUpdate(_engine, _delta) {
        if(!this.CamSet){
            this.camera.clearAllStrategies()
            this.camera.strategy.elasticToActor(this.curCam, 0.9, 0.9)
            this.CamSet = true
        }

        if(this.PCam1.pos.y < this.PCam2.pos.y){
            if(this.curCam !== this.PCam1){
                this.curCam = this.PCam1
                this.CamSet = false
            }
        }else {
            if(this.curCam !== this.PCam2){
                this.curCam = this.PCam2
                this.CamSet = false
            }
        }

    }

}