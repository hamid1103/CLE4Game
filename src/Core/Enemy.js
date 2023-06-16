import * as ex from 'excalibur'
import { CollisionType, Sprite, Vector} from 'excalibur';
import {Resources, SpriteResources} from "../resources.js";
import { Player } from '../Entities/Player.js';
import {TestLevel} from '../Levels/TestLevel.js';




export class Enemy extends ex.Actor{
    constructor(){
        super({
            collisionType: CollisionType.Active,
            width: Resources.Enemy1.width, 
            height: Resources.Enemy1.height
            

        });
    }


    onInitialize(engine) {
        this.graphics.use(Resources.Enemy1.toSprite())
        this.scale = new Vector(10, 10);
        this.pos = new Vector(600,650);
    }

    onPostCollision(event) {
        if (event.other instanceof Player) {
            console.log('Player raakt de enemy');
        }
    }

    // handleCollision(event) {
    //     if (event.other instanceof Player) {
    //         event.other.RemoveHeart();
    //     }
    // }
}