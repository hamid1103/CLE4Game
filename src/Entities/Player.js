import * as ex from 'excalibur'
import {Resources} from "../resources.js";
import {Shape, Sprite} from "excalibur";
export class Player extends ex.Actor{
    onGround;
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

    Target = Sprite.from(Resources.TargetIcon)

    onInitialize(_engine) {
        this.graphics.add('Sprite', this.Target)
        this.on('exitviewport', ()=>{
            this.pos = this.startpos;
        })
        this.on('collisionstart', (e)=>this.onFirstCollision)
        this.on('postcollision', e=>this.postCollision())
    }

    onFirstCollision(e){

    }

    postCollision(e){
        if(e.other.side === ex.Side.Top){
            this.onGround = true
        }
    }

    onPreUpdate(_engine, _delta) {
        this.graphics.use('Sprite')

        if(_engine.input.keyboard.isHeld(ex.Input.Keys.Right)){
            this.vel.x = 200
        }

        if(_engine.input.keyboard.isHeld(ex.Input.Keys.Left)){
            this.vel.x = -200
        }

        if(_engine.input.keyboard.isHeld(ex.Input.Keys.Left) && this.onGround) {
            this.vel.y = -400;
            this.onGround = false;
        }

        if(this.vel.y > 0 || this.vel.y < 0){
            this.onGround = false
        }

    }

}