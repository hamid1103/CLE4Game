import * as ex from 'excalibur'
import {Player} from "../Entities/Player.js";
export class TestLevel extends ex.Scene{
    onInitialize(_engine) {
        this.StartLevel()
    }


    StartLevel(){
        let player = new Player()
        this.add(player)
    }

}