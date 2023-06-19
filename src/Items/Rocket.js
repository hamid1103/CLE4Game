import {Item} from "../Core/Item.js";
import {Resources} from "../resources.js";
// import { ShowRocket } from "../Entities/ShowRocket.js";

export class Rocket extends Item{
    constructor(x, y, engine) {
        super(x, y, Resources.Rocket, engine);
    }

    //Only executes when a player collides.
    Action(player) {
        player.setFlyRocket(true)
        setTimeout(()=>{
            player.setFlyRocket(false)
        }, 1500)
    }
}