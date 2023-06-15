import * as ex from 'excalibur'
import {Player} from "../Entities/Player.js";
import {Platform} from "../Core/Platform.js";
export class TestLevel extends ex.Scene{
    onInitialize(_engine) {
        this.StartLevel()
    }


    StartLevel(){
        let player = new Player(650, 700)
        this.add(player)

        let platform = new Platform(650, 800, 0)
        this.add(platform)

    }

}