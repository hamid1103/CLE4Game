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