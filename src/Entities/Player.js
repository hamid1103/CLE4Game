import * as ex from 'excalibur'
import {Resources} from "../resources.js";
export class Player extends ex.Actor{
    startpos;
    /**
     *
     * @param position ex.vec(x, y)
     */
    constructor(position) {
        super({
            name: 'player',
            pos: position,
            collisionType: ex.CollisionType.Active,
            collider: ex.Shape.Box(18, 27, ex.Vector.Half, ex.vec(0, 0))
        });
        this.startpos = position
    }
    Target = ex.Sprite.from(Resources.TargetIcon)

    onInitialize(_engine) {
        this.graphics.add('Sprite', this.Target)
        this.on('exitviewport', ()=>{
            this.pos = this.startpos;
        })
    }
    onPreUpdate(_engine, _delta) {
        this.graphics.use('Sprite')
        this.acc = ex.vec(0, 10)
    }

}