import * as ex from 'excalibur'
import {Resources} from "../resources.js";
export class CameraFollow extends ex.Actor{
    player;
    constructor(player) {
        super({
            pos: ex.vec(player.pos.x, player.pos.y + 50)
        });
        this.player = player
    }

    onInitialize(_engine) {
        this.graphics.use(Resources.Star.toSprite())
    }

    onPreUpdate(_engine, _delta) {
        if(!this.player.vel.y > 0){
            this.pos.y = this.player.pos.y
        }
    }

}