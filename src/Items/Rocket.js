import * as ex from 'excalibur'
import {Item} from "../Core/Item.js";
import {Resources} from "../resources.js";

export class Rocket extends Item{
    constructor(x, y) {
        super(x, y, Resources.Rocket);
    }

    //Only executes when a player collides.
    Action(player) {

    }
}