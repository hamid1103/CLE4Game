import * as ex from 'excalibur'
import {InvItem, Item} from "../Core/Item.js";
import {Resources} from "../resources.js";
import {Player} from "../Entities/Player.js";

export class Coin extends ex.Actor{
    Seen = false
    constructor(x, y, Engine) {
        super({
            pos: ex.vec(x, y),
            collisionType: ex.CollisionType.Passive,
            collisionGroup: Engine.ItemGroup
        })
        this.graphics.use(Resources.Coin.toSprite())
        this.collider.useBoxCollider(Resources.Coin.width, Resources.Coin.height)
        this.scale = ex.vec(1.7,1.7)
        this.Engine = Engine
    }

    onInitialize(_engine) {
        this.on('enterviewport', ()=> {
            this.Seen = true
        })
        this.on('exitviewport', ()=> {
            if(this.Seen === true){
                this.kill()
            }
        })
        this.on('collisionstart', e => {
            if (e.other instanceof Player) {
                this.Action(e.other);
                this.kill()
            }
        })
    }

    //Only executes when a player collides.
    Action(player) {
        player.points++;
        this.kill()
    }
}