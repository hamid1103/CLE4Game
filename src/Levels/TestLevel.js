import * as ex from 'excalibur'
import {Player} from "../Entities/Player.js";
export class TestLevel extends ex.Scene{
    onInitialize(_engine) {
        this.StartLevel()
    }

    Player = new Player(ex.vec( 100, 100))
    StartLevel(){
        this.add(Player)
    }

}