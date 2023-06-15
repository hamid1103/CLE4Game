import * as ex from 'excalibur'
import { CollisionType, Sprite, Vector} from 'excalibur';
import {Resources, SpriteResources} from "../resources.js";
import { Player } from '../Entities/Player.js';
import {TestLevel} from '../Levels/TestLevel.js';







// export class Enemy extends ex.Actor{
 

   

//     constructor(){
//         super({
//             collisionType: CollisionType.Active
            

//         });


//     }


//     onInitialize() {
//         this.on('precollision', this.handleCollision);
//        const Kwal = ex.Sprite.from(Resources.Enemy1)
//        Kwal.scale.setTo(2, 2);


//        const Duif = ex.Sprite.from(Resources.Enemy2)
//        Duif.scale.setTo(1.5, 1.5);



//       }


    
//     // handleCollision(event) {
//     //     if (event.other instanceof Player) {
//     //         event.other.RemoveHeart();
//     //     }
//     // }

// }

export class Enemy extends ex.Actor{
 

   

    constructor(){
        super({
            // collisionType: CollisionType.Active,
            width: Resources.Enemy1.width, 
            height: Resources.Enemy1.height


        });


    }


    onInitialize() {
        this.graphics.use(Resources.Enemy1.toSprite())
        this.scale = new Vector(10, 10);
        this.pos = new Vector(500,500);



      }


    
    // handleCollision(event) {
    //     if (event.other instanceof Player) {
    //         event.other.RemoveHeart();
    //     }
    // }

}