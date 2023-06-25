import * as ex from 'excalibur'
import { CollisionType, Sprite, Vector} from 'excalibur';
import {Resources, SpriteResources} from "../resources.js";
import { Player } from '../Entities/Player.js';
import {TestLevel} from '../Levels/TestLevel.js';




export class Enemy extends ex.Actor{
    constructor(x, y, Engine){
        super({
            collisionType: CollisionType.Passive,
            width: Resources.Enemy1.width, 
            height: Resources.Enemy1.height,
            pos: ex.vec(x, y),
            collisionGroup: Engine.Enemygroup
        });
        console.log(Engine.Enemygroup)
        this.body.group = Engine.Enemygroup
        this.body.useGravity = false
    }


    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
        this.graphics.use(Resources.Enemy1.toSprite())
        this.w = Resources.Enemy1.width;
        this.h = Resources.Enemy1.height;
        this.scale = new Vector(6, 6);
        this.pos = new Vector(500,650);

        this.vel = new Vector(150 , 0);

        // this.path = [ex.vec(this.pos.x, this.pos.y), ex.vec(this.pos.x, this.pos.y - 250), ex.vec(this.pos.x + 250, this.pos.y)]

        // let pathActions = new ex.ActionContext(this);
        // for (let i = this.path.length - 2; i >= 0; i--) {
        //     pathActions.moveTo(this.path[i].x, this.path[i].y, 300);
        // }

    }

    onPostUpdate(engine) {
        if (this.pos.x < 0 || this.pos.x + this.w > engine.drawWidth) {
          this.vel.x = -this.vel.x;
        }
        if (this.pos.y < 0 || this.pos.y + this.h > engine.drawHeight) {
          this.vel.y = -this.vel.y;
        }
      }

    
    hitSomething(event){
        if (event.other instanceof Player) {
            console.log('hit player')
            this.kill()
            event.other.RemoveHeart()
        }
    }

    // handleCollision(event) {
    //     if (event.other instanceof Player) {
    //         event.other.RemoveHeart();
    //     }
    // }
}