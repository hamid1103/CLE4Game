import * as ex from 'excalibur'
import { CollisionType, Sprite, Vector} from 'excalibur';
import {Resources, SpriteResources} from "../resources.js";
import { Player } from '../Entities/Player.js';
import {TestLevel} from '../Levels/TestLevel.js';







export class Enemy extends ex.Actor{
    // Kwal = ex.Sprite.from(Resources.Enemy1)
    // Duif = ex.Sprite.from(Resources.Enemy2)

   

    // constructor(){
    //     super({
    //         // collisionType: CollisionType.Active
            

    //     });


    // }


    onInitialize() {
        // this.on('precollision', this.handleCollision);
       const Kwal = ex.Sprite.from(Resources.Enemy1)
       const Duif = ex.Sprite.from(Resources.Enemy2)
      }


    
      handleCollision(event) {
        if (event.other instanceof Player) {
          event.other.takeDamage();
        }
      }





}