import * as ex from 'excalibur'
import {Item} from "../Core/Item.js";
import {Resources} from "../resources.js";

export class Coin extends Item{
    constructor(x, y, Engine) {
        super(x, y, Resources.Star, Engine);
    }

    //Only executes when a player collides.
    Action(player) {

    }
}