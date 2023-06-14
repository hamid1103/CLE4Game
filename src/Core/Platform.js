import * as ex from 'excalibur'
import { CollisionType, Vector} from 'excalibur';
import { Player } from '../Entities/Player.js';
import {Resources} from "../resources.js";


export class Platform extends ex.Actor{
   

    constructor(x, y) {
        super({
           collisionType: CollisionType.Fixed,
           pos: ex.vec(x, y)
        });
        this.startpos = ex.vec(x, y)
    }
    
    Target = ex.Sprite.from(Resources.TargetIcon)

    onInitialize(engine) {
        if (this.type === 0) {
            this.graphics.use(Resources.Pixelplatform.toSprite());
            this.on('collisionstart', (event) => this.hitSomething(event));
            this.scale = new Vector(0.2, 0.2);
        } else {
            this.graphics.use(Resources.Pixelplatform.toSprite());
            this.on('collisionstart', (event) => this.hitSomething(event))
            this.scale = new Vector(1, 1);
        }
        
    }

    
    hitSomething(event){
        if (event.other instanceof Player) {
            console.log('hit enemy')
        }
    }

    onPostUpdate(){
    // Capsule Collider
    const capsule = new ex.CompositeCollider([
    ex.Shape.Circle(10, ex.vec(0, -20)),
    ex.Shape.Box(20, 40),
    ex.Shape.Circle(10, ex.vec(0, 20)),
  ])
    }

   

}
