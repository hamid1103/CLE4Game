import * as ex from 'excalibur'
import {Resources} from "../resources.js";
export class CameraFollow extends ex.Actor{
    player;
    lastpos;
    constructor(player) {
        super({
            pos: ex.vec(720, player.pos.y - 150)
        });
        this.player = player
    }

    onInitialize(_engine) {
        //this.graphics.use(Resources.Star.toSprite())
        this.lastpos = this.pos.y
    }

    onPreUpdate(_engine, _delta) {
        console.log(this.player.pos.y + ' ' + this.lastpos)
        if(this.player.vel.y < 0){
            if(this.player.pos.y < this.lastpos){
                this.pos.y -= this.pos.y - this.player.pos.y
                this.lastpos = this.pos.y
            }
        }
    }

}