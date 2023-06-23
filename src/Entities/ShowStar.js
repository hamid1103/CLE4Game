import * as ex from 'excalibur'
import {Actor} from "excalibur";
import {Resources} from "../resources.js";
export class ShowStar extends Actor{
    constructor(player) {
        super();
        this.graphics.use(Resources.Star.toSprite())
        this.player = player
        this.pos = player.pos
    }
    onPreUpdate(_engine, _delta) {
        this.pos = this.player.pos
    }
    killme = ()=>{
        this.kill()
    }
}