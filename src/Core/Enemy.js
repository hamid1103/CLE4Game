import * as ex from 'excalibur'
import { CollisionType, Sprite, Vector} from 'excalibur';
import {Resources, SpriteResources} from "../resources.js";
import { Player } from '../Entities/Player.js';







export class Enemy extends ex.Actor{
    Kwal = ex.Sprite.from(Resources.Enemy1)
    Duif = ex.Sprite.from(Resources.Enemy2)
    

    constructor(){
        super({
            // collisionType: CollisionType.Active
            

        });


    }


    // onInitialize() {
    //     // this.on('precollision', this.handleCollision);
    //   }
    
    //   handleCollision(event) {
    //     if (event.other instanceof Player) {
    //       event.other.takeDamage();
    //     }
    //   }





}