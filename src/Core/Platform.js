import * as ex from 'excalibur'
import { CollisionType, Sprite, Vector} from 'excalibur';
import { Player } from '../Entities/Player.js';
import {Resources, SpriteResources} from "../resources.js";
import {TestLevel} from "../Levels/TestLevel.js";




export class Platform extends ex.Actor{
    PixelplatformSprite = ex.Sprite.from(Resources.Pixelplatform)
    constructor(x, y, type) {
        super({
           collisionType: CollisionType.Fixed,
           pos: ex.vec(x, y)
        });
        this.startpos = ex.vec(x, y)
    }

    onInitialize(engine) {
        if (this.type === 0) {
            this.graphics.use(this.PixelplatformSprite)
            this.on('collisionstart', (event) => this.hitSomething(event));
            this.scale = new Vector(0.2, 0.2);
        } else {
            this.graphics.use(this.PixelplatformSprite)
            this.on('collisionstart', (event) => this.hitSomething(event))
            this.scale = new Vector(1, 1);
        }
        
        this.collider.useBoxCollider(this.PixelplatformSprite.width,this.PixelplatformSprite.height);

    }

    


    hitSomething(event){
        if (event.other instanceof Player) {
            console.log('hit enemy')
        }
    }


    multipleplatform(){
        
    }
}


