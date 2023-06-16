import * as ex from 'excalibur'
import {Item} from "../Core/Item.js";
import {Resources} from "../resources.js";

export class Coin extends Item{
    constructor(x, y) {
        super(x, y, Resources.Coin);
    }

    //Only executes when a player collides.
    Action(player) {
        player.points++;
        console.log(player.points);
    }
}