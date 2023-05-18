import * as ex from 'excalibur'
import {Player} from "../Entities/Player.js";
export class TestLevel extends ex.Scene{
    onInitialize(_engine) {
        this.StartLevel()
    }


    StartLevel(){
        const player = new Player(ex.vec( 100, 100))
        this.add(player)
    }

}