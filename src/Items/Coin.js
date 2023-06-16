import * as ex from 'excalibur'
import {Item} from "../Core/Item.js";
import {Resources} from "../resources.js";

export class Coin extends Item{
    constructor(x, y) {
        super(x, y, Resources.Coin);
        this.scale = ex.vec(1.7,1.7)
    }

    //Only executes when a player collides.
    Action(player) {
        player.points++;
        console.log(player.points);
    }
}